import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiDelete, apiGet, apiPost } from '../api/client';
import Alert from '../components/Alert';
import DataCard from '../components/DataCard';
import Modal from '../components/Modal';
import PageHeader from '../components/PageHeader';
import RowActions from '../components/RowActions';
import { ESTADOS_ACTA, estadoActaFromNombre } from '../constants/estadosActa';
import { TIPOS_RUTA, tipoRutaFromNombre } from '../constants/tiposRuta';
import { useAlert } from '../hooks/useAlert';
import { EstadoBadge } from '../utils/estadoBadge';

const emptyForm = {
  idActa: '',
  fechaDeLabrado: '',
  fechaVtoPagoVolun: '',
  lugarDeConstatacion: '',
  observaciones: '',
  organizacion: { nombre: '', localidad: '' },
  conductor: { nombre: '', apellido: '', dni: '', genero: '', domicilio: '' },
  estadoActa: '',
  vehiculo: { dominio: '', color: '', anioPatentamiento: '', marcaAuto: '', modeloAuto: '' },
  ruta: { nombreRuta: '', kmRuta: '', tipoRuta: '' },
  licencia: { fechaDeVto: '', puntosInicialesLicencia: '' },
  autoridad: { nombre: '', apellido: '', dni: '', idPlaca: '', idLegajo: '', genero: '' },
};

function SectionTitle({ icon, children }) {
  return (
    <h6 className="fw-bold text-secondary border-bottom pb-2 mb-3">
      <i className={`bi ${icon} me-2`} />
      {children}
    </h6>
  );
}

export default function ActasPage() {
  const location = useLocation();
  const { alert, showAlert, dismissAlert } = useAlert();
  const [datos, setDatos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [detalle, setDetalle] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [errors, setErrors] = useState({});

  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiGet('/Actas');
      setDatos(data);
      setFiltrados(data);
    } catch {
      showAlert('Error al conectar con la API. Verificar que el backend esté en el puerto 9000.', 'danger');
    } finally {
      setLoading(false);
    }
  }, [showAlert]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  useEffect(() => {
    if (location.pathname === '/actas/nueva') setShowForm(true);
  }, [location.pathname]);

  useEffect(() => {
    if (!showForm) {
      setErrors({});
    }
  }, [showForm]);

  const buscar = (q) => {
    const lower = q.toLowerCase();
    setFiltrados(
      datos.filter(
        (a) =>
          (a.lugarDeConstatacion || '').toLowerCase().includes(lower) ||
          String(a.idActa).includes(q),
      ),
    );
  };

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const setNested = (section, field) => (e) => {
    setForm((f) => ({
      ...f,
      [section]: { ...f[section], [field]: e.target.value },
    }));
    const errorKey = section + field.charAt(0).toUpperCase() + field.slice(1);
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[errorKey];
      return copy;
    });
  };

  const crearEntidad = async (path, body) => {
    const res = await apiPost(path, body);
    if (!res.ok) throw new Error(`Error al crear ${path}`);
    return res.json();
  };

  const guardar = async () => {
    const newErrors = {};

    if (!form.idActa || isNaN(form.idActa)) {
      newErrors.idActa = 'Ingresá un N° de Acta válido.';
    }
    if (!form.fechaDeLabrado) {
      newErrors.fechaDeLabrado = 'Seleccioná la fecha de labrado.';
    }
    if (!form.lugarDeConstatacion.trim()) {
      newErrors.lugarDeConstatacion = 'Completá el lugar de constatación.';
    }
    if (!form.estadoActa) {
      newErrors.estadoActa = 'Seleccioná el estado del acta.';
    }
    if (!form.conductor.nombre.trim()) {
      newErrors.conductorNombre = 'Completá el nombre del conductor.';
    }
    if (!form.conductor.apellido.trim()) {
      newErrors.conductorApellido = 'Completá el apellido del conductor.';
    }
    if (!form.conductor.dni || isNaN(form.conductor.dni) || parseInt(form.conductor.dni, 10) <= 0) {
      newErrors.conductorDni = 'Ingresá un DNI válido para el conductor.';
    }
    if (!form.conductor.genero) {
      newErrors.conductorGenero = 'Seleccioná el género del conductor.';
    }
    if (!form.vehiculo.dominio.trim()) {
      newErrors.vehiculoDominio = 'Completá el dominio del vehículo.';
    }
    if (form.vehiculo.anioPatentamiento && (parseInt(form.vehiculo.anioPatentamiento, 10) < 1900 || parseInt(form.vehiculo.anioPatentamiento, 10) > new Date().getFullYear() + 1)) {
      newErrors.vehiculoAnioPatentamiento = 'El año de patentamiento no es válido.';
    }
    if (form.ruta.kmRuta && isNaN(form.ruta.kmRuta)) {
      newErrors.rutaKmRuta = 'El kilómetro de la ruta debe ser un número.';
    }
    if (form.licencia.puntosInicialesLicencia && (isNaN(form.licencia.puntosInicialesLicencia) || parseInt(form.licencia.puntosInicialesLicencia, 10) < 0)) {
      newErrors.licenciaPuntosInicialesLicencia = 'Los puntos de licencia deben ser un número positivo.';
    }
    if (!form.autoridad.nombre.trim()) {
      newErrors.autoridadNombre = 'Completá el nombre de la autoridad.';
    }
    if (!form.autoridad.apellido.trim()) {
      newErrors.autoridadApellido = 'Completá el apellido de la autoridad.';
    }
    if (!form.autoridad.dni || isNaN(form.autoridad.dni) || parseInt(form.autoridad.dni, 10) <= 0) {
      newErrors.autoridadDni = 'Ingresá un DNI válido para la autoridad.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setGuardando(true);
    try {
      let marca = null;
      if (form.vehiculo.marcaAuto.trim()) {
        let modelo = null;
        if (form.vehiculo.modeloAuto.trim()) {
          modelo = await crearEntidad('/Modelos', { modeloAuto: form.vehiculo.modeloAuto.trim() });
        }
        marca = await crearEntidad('/Marcas', {
          marcaAuto: form.vehiculo.marcaAuto.trim(),
          modelo: modelo ? { id: modelo.id } : null,
        });
      }

      const vehiculo = await crearEntidad('/Vehiculos', {
        dominio: form.vehiculo.dominio,
        color: form.vehiculo.color,
        anioPatentamiento: parseInt(form.vehiculo.anioPatentamiento, 10) || 0,
        marca: marca ? { id: marca.id } : null,
      });

      const ruta = await crearEntidad('/Rutas', {
        nombreRuta: form.ruta.nombreRuta,
        kmRuta: form.ruta.kmRuta,
        tipoRuta: tipoRutaFromNombre(form.ruta.tipoRuta),
      });

      const conductor = await crearEntidad('/Conductores', {
        nombre: form.conductor.nombre,
        apellido: form.conductor.apellido,
        dni: parseInt(form.conductor.dni, 10) || 0,
        genero: form.conductor.genero,
        domicilio: form.conductor.domicilio,
      });

      const licencia = await crearEntidad('/Licencias', {
        fechaDeVto: form.licencia.fechaDeVto || null,
        puntosInicialesLicencia: parseInt(form.licencia.puntosInicialesLicencia, 10) || 0,
        conductor: { id: conductor.id },
      });

      const autoridad = await crearEntidad('/Autoridades', {
        nombre: form.autoridad.nombre,
        apellido: form.autoridad.apellido,
        dni: parseInt(form.autoridad.dni, 10) || 0,
        idPlaca: parseInt(form.autoridad.idPlaca, 10) || 0,
        idLegajo: parseInt(form.autoridad.idLegajo, 10) || 0,
        genero: form.autoridad.genero,
      });

      let organizacion = null;
      if (form.organizacion.nombre.trim()) {
        organizacion = await crearEntidad('/Organizaciones', {
          nombre: form.organizacion.nombre.trim(),
          localidad: form.organizacion.localidad.trim(),
        });
      }

      const body = {
        idActa: parseInt(form.idActa, 10) || 0,
        fechaDeLabrado: form.fechaDeLabrado || null,
        fechaVtoPagoVolun: form.fechaVtoPagoVolun || null,
        lugarDeConstatacion: form.lugarDeConstatacion,
        observaciones: form.observaciones,
        conductor: { id: conductor.id },
        vehiculo: { id: vehiculo.id },
        ruta: { id: ruta.id },
        licencia: { id: licencia.id },
        autoridad: { id: autoridad.id },
        organizacion: organizacion ? { id: organizacion.id } : null,
        estado: estadoActaFromNombre(form.estadoActa),
      };

      const res = await apiPost('/Actas', body);
      if (res.ok) {
        setShowForm(false);
        setForm(emptyForm);
        showAlert('Acta creada correctamente.');
        cargar();
      } else {
        showAlert('Error al guardar el acta.', 'danger');
      }
    } catch (err) {
      console.error('Error al crear acta:', err);
      showAlert(`No se pudo completar el alta: ${err.message || 'Revisá los datos e intentá de nuevo.'}`, 'danger');
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar esta acta?')) return;
    try {
      await apiDelete(`/Actas/${id}`);
      showAlert('Acta eliminada correctamente.');
      cargar();
    } catch {
      showAlert('Error al eliminar.', 'danger');
    }
  };

  const cerrarForm = () => {
    setShowForm(false);
    setForm(emptyForm);
  };

  return (
    <>
      <PageHeader
        title="Actas de Constatación"
        subtitle="Gestión de actas registradas"
        action={
          <button type="button" className="btn btn-primary" onClick={() => setShowForm(true)}>
            <i className="bi bi-plus-lg me-1" />
            Nueva Acta
          </button>
        }
      />
      <Alert alert={alert} onDismiss={dismissAlert} />

      <DataCard searchPlaceholder="Buscar por lugar o ID acta..." onSearch={buscar}>
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th className="ps-3">ID</th>
              <th>N° Acta</th>
              <th>Fecha Labrado</th>
              <th>Lugar</th>
              <th>Conductor</th>
              <th>Vehículo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-muted">
                  Cargando...
                </td>
              </tr>
            ) : !filtrados.length ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-muted">
                  No hay actas registradas
                </td>
              </tr>
            ) : (
              filtrados.map((a) => (
                <tr key={a.id}>
                  <td className="ps-3 text-muted small">#{a.id}</td>
                  <td>
                    <strong>{a.idActa || '-'}</strong>
                  </td>
                  <td>{a.fechaDeLabrado || '-'}</td>
                  <td>{a.lugarDeConstatacion || '-'}</td>
                  <td>{a.conductor ? `${a.conductor.nombre} ${a.conductor.apellido}` : '-'}</td>
                  <td>{a.vehiculo ? a.vehiculo.dominio : '-'}</td>
                  <td>
                    <EstadoBadge estado={a.estado} />
                  </td>
                  <RowActions onView={() => setDetalle(a)} onDelete={() => eliminar(a.id)} />
                </tr>
              ))
            )}
          </tbody>
        </table>
      </DataCard>

      <Modal
        show={showForm}
        onClose={cerrarForm}
        title={
          <>
            <i className="bi bi-file-plus me-2" />
            Nueva Acta de Constatación
          </>
        }
        size="modal-lg"
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={cerrarForm} disabled={guardando}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={guardar} disabled={guardando}>
              <i className="bi bi-save me-1" />
              {guardando ? 'Guardando...' : 'Guardar Acta'}
            </button>
          </>
        }
      >
        <div className="row g-3">
          <div className="col-12">
            <SectionTitle icon="bi-file-text">Datos del acta</SectionTitle>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">N° Acta <span className="text-danger">*</span></label>
            <input type="number" min="1" className={`form-control ${errors.idActa ? 'is-invalid' : ''}`} value={form.idActa} onChange={set('idActa')} required />
            {errors.idActa && <div className="invalid-feedback">{errors.idActa}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Fecha de Labrado <span className="text-danger">*</span></label>
            <input type="date" className={`form-control ${errors.fechaDeLabrado ? 'is-invalid' : ''}`} value={form.fechaDeLabrado} onChange={set('fechaDeLabrado')} required />
            {errors.fechaDeLabrado && <div className="invalid-feedback">{errors.fechaDeLabrado}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Fecha Vto. Pago Voluntario</label>
            <input type="date" className="form-control" value={form.fechaVtoPagoVolun} onChange={set('fechaVtoPagoVolun')} />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Lugar de Constatación <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.lugarDeConstatacion ? 'is-invalid' : ''}`} value={form.lugarDeConstatacion} onChange={set('lugarDeConstatacion')} required />
            {errors.lugarDeConstatacion && <div className="invalid-feedback">{errors.lugarDeConstatacion}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Estado del Acta <span className="text-danger">*</span></label>
            <select className={`form-select ${errors.estadoActa ? 'is-invalid' : ''}`} value={form.estadoActa} onChange={set('estadoActa')}>
              <option value="">-- Seleccionar estado --</option>
              {ESTADOS_ACTA.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>
            {errors.estadoActa && <div className="invalid-feedback">{errors.estadoActa}</div>}
          </div>

          <div className="col-12 mt-2">
            <SectionTitle icon="bi-building">Organización Estatal (se registra con el acta)</SectionTitle>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Nombre de la Organización</label>
            <input type="text" className="form-control" value={form.organizacion.nombre} onChange={setNested('organizacion', 'nombre')} placeholder="Ej: Dirección de Tránsito" />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Localidad de la Organización</label>
            <input type="text" className="form-control" value={form.organizacion.localidad} onChange={setNested('organizacion', 'localidad')} placeholder="Ej: Mendoza" />
          </div>

          <div className="col-12 mt-2">
            <SectionTitle icon="bi-person">Conductor (se registra con el acta)</SectionTitle>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Nombre <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.conductorNombre ? 'is-invalid' : ''}`} value={form.conductor.nombre} onChange={setNested('conductor', 'nombre')} required />
            {errors.conductorNombre && <div className="invalid-feedback">{errors.conductorNombre}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Apellido <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.conductorApellido ? 'is-invalid' : ''}`} value={form.conductor.apellido} onChange={setNested('conductor', 'apellido')} required />
            {errors.conductorApellido && <div className="invalid-feedback">{errors.conductorApellido}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">DNI <span className="text-danger">*</span></label>
            <input type="number" min="1" className={`form-control ${errors.conductorDni ? 'is-invalid' : ''}`} value={form.conductor.dni} onChange={setNested('conductor', 'dni')} required />
            {errors.conductorDni && <div className="invalid-feedback">{errors.conductorDni}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Género <span className="text-danger">*</span></label>
            <select className={`form-select ${errors.conductorGenero ? 'is-invalid' : ''}`} value={form.conductor.genero} onChange={setNested('conductor', 'genero')}>
              <option value="">--</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="X">No binario</option>
            </select>
            {errors.conductorGenero && <div className="invalid-feedback">{errors.conductorGenero}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Domicilio</label>
            <input type="text" className="form-control" value={form.conductor.domicilio} onChange={setNested('conductor', 'domicilio')} />
          </div>

          <div className="col-12 mt-2">
            <SectionTitle icon="bi-car-front">Vehículo (se registra con el acta)</SectionTitle>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Dominio <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.vehiculoDominio ? 'is-invalid' : ''}`} value={form.vehiculo.dominio} onChange={setNested('vehiculo', 'dominio')} placeholder="Ej: AB123CD" required />
            {errors.vehiculoDominio && <div className="invalid-feedback">{errors.vehiculoDominio}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Color</label>
            <input type="text" className="form-control" value={form.vehiculo.color} onChange={setNested('vehiculo', 'color')} />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Año patentamiento</label>
            <input type="number" min="1900" max={new Date().getFullYear() + 1} className={`form-control ${errors.vehiculoAnioPatentamiento ? 'is-invalid' : ''}`} value={form.vehiculo.anioPatentamiento} onChange={setNested('vehiculo', 'anioPatentamiento')} />
            {errors.vehiculoAnioPatentamiento && <div className="invalid-feedback">{errors.vehiculoAnioPatentamiento}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Marca</label>
            <input type="text" className="form-control" value={form.vehiculo.marcaAuto} onChange={setNested('vehiculo', 'marcaAuto')} placeholder="Ej: Toyota" />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Modelo</label>
            <input type="text" className="form-control" value={form.vehiculo.modeloAuto} onChange={setNested('vehiculo', 'modeloAuto')} placeholder="Ej: Corolla" />
          </div>

          <div className="col-12 mt-2">
            <SectionTitle icon="bi-signpost">Ruta (se registra con el acta)</SectionTitle>
          </div>
          <div className="col-md-5">
            <label className="form-label fw-semibold">Nombre de ruta</label>
            <input type="text" className="form-control" value={form.ruta.nombreRuta} onChange={setNested('ruta', 'nombreRuta')} placeholder="Ej: Ruta Nacional 40" />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">KM</label>
            <input type="number" min="0" step="0.1" className={`form-control ${errors.rutaKmRuta ? 'is-invalid' : ''}`} value={form.ruta.kmRuta} onChange={setNested('ruta', 'kmRuta')} placeholder="Ej: 152" />
            {errors.rutaKmRuta && <div className="invalid-feedback">{errors.rutaKmRuta}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Tipo de ruta</label>
            <select className="form-select" value={form.ruta.tipoRuta} onChange={setNested('ruta', 'tipoRuta')}>
              <option value="">-- Tipo --</option>
              {TIPOS_RUTA.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 mt-2">
            <SectionTitle icon="bi-card-text">Licencia del conductor (se registra con el acta)</SectionTitle>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Fecha de vencimiento</label>
            <input type="date" className="form-control" value={form.licencia.fechaDeVto} onChange={setNested('licencia', 'fechaDeVto')} />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Puntos iniciales</label>
            <input type="number" min="0" max="100" className={`form-control ${errors.licenciaPuntosInicialesLicencia ? 'is-invalid' : ''}`} value={form.licencia.puntosInicialesLicencia} onChange={setNested('licencia', 'puntosInicialesLicencia')} />
            {errors.licenciaPuntosInicialesLicencia && <div className="invalid-feedback">{errors.licenciaPuntosInicialesLicencia}</div>}
          </div>

          <div className="col-12 mt-2">
            <SectionTitle icon="bi-shield">Autoridad de constatación (se registra con el acta)</SectionTitle>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Nombre <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.autoridadNombre ? 'is-invalid' : ''}`} value={form.autoridad.nombre} onChange={setNested('autoridad', 'nombre')} required />
            {errors.autoridadNombre && <div className="invalid-feedback">{errors.autoridadNombre}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Apellido <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.autoridadApellido ? 'is-invalid' : ''}`} value={form.autoridad.apellido} onChange={setNested('autoridad', 'apellido')} required />
            {errors.autoridadApellido && <div className="invalid-feedback">{errors.autoridadApellido}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">DNI <span className="text-danger">*</span></label>
            <input type="number" min="1" className={`form-control ${errors.autoridadDni ? 'is-invalid' : ''}`} value={form.autoridad.dni} onChange={setNested('autoridad', 'dni')} required />
            {errors.autoridadDni && <div className="invalid-feedback">{errors.autoridadDni}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">N° Placa</label>
            <input type="number" className="form-control" value={form.autoridad.idPlaca} onChange={setNested('autoridad', 'idPlaca')} />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">N° Legajo</label>
            <input type="number" className="form-control" value={form.autoridad.idLegajo} onChange={setNested('autoridad', 'idLegajo')} />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Género</label>
            <select className="form-select" value={form.autoridad.genero} onChange={setNested('autoridad', 'genero')}>
              <option value="">--</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="X">No binario</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Observaciones</label>
            <textarea className="form-control" rows={3} value={form.observaciones} onChange={set('observaciones')} />
          </div>
        </div>
      </Modal>

      <Modal show={!!detalle} onClose={() => setDetalle(null)} title="Detalle del Acta" size="modal-lg">
        {detalle && (
          <div className="row g-3">
            <div className="col-md-6">
              <strong>N° Acta:</strong> {detalle.idActa || '-'}
            </div>
            <div className="col-md-6">
              <strong>Estado:</strong> <EstadoBadge estado={detalle.estado} />
            </div>
            <div className="col-md-6">
              <strong>Fecha Labrado:</strong> {detalle.fechaDeLabrado || '-'}
            </div>
            <div className="col-md-6">
              <strong>Fecha Vto. Pago:</strong> {detalle.fechaVtoPagoVolun || '-'}
            </div>
            <div className="col-12">
              <strong>Lugar:</strong> {detalle.lugarDeConstatacion || '-'}
            </div>
            <hr />
            <div className="col-md-6">
              <strong>Conductor:</strong>{' '}
              {detalle.conductor
                ? `${detalle.conductor.nombre} ${detalle.conductor.apellido} (DNI: ${detalle.conductor.dni})`
                : '-'}
            </div>
            <div className="col-md-6">
              <strong>Domicilio:</strong> {detalle.conductor?.domicilio || '-'}
            </div>
            <hr />
            <div className="col-md-4">
              <strong>Vehículo:</strong>{' '}
              {detalle.vehiculo ? detalle.vehiculo.dominio : '-'}
            </div>
            <div className="col-md-4">
              <strong>Color:</strong> {detalle.vehiculo?.color || '-'}
            </div>
            <div className="col-md-4">
              <strong>Marca / Modelo:</strong>{' '}
              {detalle.vehiculo?.marca
                ? `${detalle.vehiculo.marca.marcaAuto || ''}${detalle.vehiculo.marca.modelo ? ` ${detalle.vehiculo.marca.modelo.modeloAuto}` : ''}`
                : '-'}
            </div>
            <hr />
            <div className="col-md-4">
              <strong>Ruta:</strong> {detalle.ruta?.nombreRuta || '-'}
            </div>
            <div className="col-md-4">
              <strong>KM:</strong> {detalle.ruta?.kmRuta || '-'}
            </div>
            <div className="col-md-4">
              <strong>Tipo Ruta:</strong> {detalle.ruta?.tipoRuta?.nombreTipoDeRuta || '-'}
            </div>
            <hr />
            <div className="col-md-6">
              <strong>Licencia vto.:</strong> {detalle.licencia?.fechaDeVto || '-'}
            </div>
            <div className="col-md-6">
              <strong>Puntos licencia:</strong> {detalle.licencia?.puntosInicialesLicencia ?? '-'}
            </div>
            <hr />
            <div className="col-md-6">
              <strong>Organización:</strong> {detalle.organizacion ? `${detalle.organizacion.nombre} (${detalle.organizacion.localidad || '-'})` : '-'}
            </div>
            <div className="col-md-6">
              <strong>Autoridad:</strong>{' '}
              {detalle.autoridad
                ? `${detalle.autoridad.nombre} ${detalle.autoridad.apellido} (DNI: ${detalle.autoridad.dni})`
                : '-'}
            </div>
            <div className="col-12">
              <strong>Observaciones:</strong> {detalle.observaciones || '-'}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
