import { useCallback, useEffect, useState } from 'react';
import { apiDelete, apiGet, apiPost, apiPut } from '../api/client';
import Alert from '../components/Alert';
import DataCard from '../components/DataCard';
import Modal from '../components/Modal';
import PageHeader from '../components/PageHeader';
import RowActions from '../components/RowActions';
import { useAlert } from '../hooks/useAlert';

const empty = { descripInfraccion: '', importeInfraccion: '', actaId: '', tipoDeInfraccionId: '' };

export default function InfraccionesPage() {
  const { alert, showAlert, dismissAlert } = useAlert();
  const [datos, setDatos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [actas, setActas] = useState([]);
  const [tiposInfraccion, setTiposInfraccion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiGet('/Infracciones');
      setDatos(data);
      setFiltrados(data);
    } catch {
      showAlert('Error al conectar con la API.', 'danger');
    } finally {
      setLoading(false);
    }
  }, [showAlert]);

  useEffect(() => {
    cargar();
    apiGet('/Actas')
      .then((list) =>
        setActas(
          list.map((a) => ({
            id: a.id,
            idActa: a.idActa,
            label: `Acta #${a.idActa}${a.lugarDeConstatacion ? ` - ${a.lugarDeConstatacion}` : ''}`,
          })),
        ),
      )
      .catch(() => setActas([]));

    apiGet('/TiposDeInfraccion')
      .then((list) => setTiposInfraccion(list))
      .catch(() => setTiposInfraccion([]));
  }, [cargar]);

  const buscar = (q) => {
    const lower = q.toLowerCase().trim();
    if (!lower) {
      setFiltrados(datos);
      return;
    }
    setFiltrados(
      datos.filter((i) => {
        const idMatches = String(i.id) === lower || lower === `#${i.id}`;
        const descMatches = (i.descripInfraccion || '').toLowerCase().includes(lower);
        
        const tipoMatches = i.infraccionNomenclada && i.infraccionNomenclada.length > 0
          ? (i.infraccionNomenclada[0].descrInfrac || '').toLowerCase().includes(lower)
          : false;
          
        const actaMatches = i.acta
          ? String(i.acta.idActa || i.acta.id).startsWith(lower)
          : false;

        return idMatches || descMatches || tipoMatches || actaMatches;
      })
    );
  };

  const abrirNuevo = () => {
    setEditId(null);
    setForm(empty);
    setShowModal(true);
  };

  const editar = (i) => {
    setEditId(i.id);
    setForm({
      descripInfraccion: i.descripInfraccion || '',
      importeInfraccion: i.importeInfraccion || 0,
      actaId: i.acta ? String(i.acta.id) : '',
      tipoDeInfraccionId: i.infraccionNomenclada && i.infraccionNomenclada.length > 0
        ? String(i.infraccionNomenclada[0].id)
        : '',
    });
    setShowModal(true);
  };

  const handleTipoInfraccionChange = (e) => {
    const selectedId = e.target.value;
    const selectedTipo = tiposInfraccion.find((t) => String(t.id) === selectedId);
    setForm((f) => ({
      ...f,
      tipoDeInfraccionId: selectedId,
      importeInfraccion: selectedTipo ? selectedTipo.importeAsignadoInfrac : f.importeInfraccion,
      descripInfraccion: selectedTipo ? selectedTipo.descrInfrac : f.descripInfraccion,
    }));
  };

  const guardar = async () => {
    const body = {
      descripInfraccion: form.descripInfraccion,
      importeInfraccion: parseFloat(form.importeInfraccion) || 0,
      acta: form.actaId ? { id: parseInt(form.actaId, 10) } : null,
      infraccionNomenclada: form.tipoDeInfraccionId ? [{ id: parseInt(form.tipoDeInfraccionId, 10) }] : [],
    };
    try {
      const res = editId
        ? await apiPut(`/Infracciones/${editId}`, body)
        : await apiPost('/Infracciones', body);
      if (res.ok) {
        setShowModal(false);
        showAlert(`Infracción ${editId ? 'actualizada' : 'creada'} correctamente.`);
        cargar();
      } else {
        showAlert('Error al guardar.', 'danger');
      }
    } catch {
      showAlert('No se pudo conectar con la API.', 'danger');
    }
  };

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar esta infracción?')) return;
    try {
      await apiDelete(`/Infracciones/${id}`);
      showAlert('Infracción eliminada.');
      cargar();
    } catch {
      showAlert('Error.', 'danger');
    }
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <>
      <PageHeader
        title="Infracciones"
        subtitle="Gestión de infracciones"
        action={
          <button type="button" className="btn btn-primary" onClick={abrirNuevo}>
            <i className="bi bi-plus-lg me-1" />
            Nueva Infracción
          </button>
        }
      />
      <Alert alert={alert} onDismiss={dismissAlert} />

      <DataCard searchPlaceholder="Buscar..." onSearch={buscar}>
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th className="ps-3">ID</th>
              <th>Descripción</th>
              <th>Tipo de Infracción</th>
              <th>Importe</th>
              <th>Acta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-muted">
                  Cargando...
                </td>
              </tr>
            ) : !filtrados.length ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-muted">
                  No hay infracciones
                </td>
              </tr>
            ) : (
              filtrados.map((i) => (
                <tr key={i.id}>
                  <td className="ps-3 text-muted small">#{i.id}</td>
                  <td>{i.descripInfraccion || '-'}</td>
                  <td>
                    {i.infraccionNomenclada && i.infraccionNomenclada.length > 0 ? (
                      <span className="badge bg-secondary">
                        {i.infraccionNomenclada[0].descrInfrac}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>${(i.importeInfraccion || 0).toFixed(2)}</td>
                   <td>
                    {i.acta ? (
                      (() => {
                        const encontrada = actas.find((a) => a.id === i.acta.id);
                        return `Acta #${encontrada ? encontrada.idActa : (i.acta.idActa || i.acta.id)}`;
                      })()
                    ) : (
                      '-'
                    )}
                  </td>
                  <RowActions onEdit={() => editar(i)} onDelete={() => eliminar(i.id)} />
                </tr>
              ))
            )}
          </tbody>
        </table>
      </DataCard>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={
          <>
            <i className={`bi ${editId ? 'bi-pencil' : 'bi-exclamation-triangle'} me-2`} />
            {editId ? 'Editar Infracción' : 'Nueva Infracción'}
          </>
        }
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={guardar}>
              <i className="bi bi-save me-1" />
              Guardar
            </button>
          </>
        }
      >
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label fw-semibold">Tipo de Infracción (opcional - autocompleta campos)</label>
            <select className="form-select" value={form.tipoDeInfraccionId} onChange={handleTipoInfraccionChange}>
              <option value="">-- Seleccionar tipo --</option>
              {tiposInfraccion.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.descrInfrac} ({t.tipoGravedad} - ${t.importeAsignadoInfrac})
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label className="form-label fw-semibold">Descripción</label>
            <textarea className="form-control" rows={2} value={form.descripInfraccion} onChange={set('descripInfraccion')} />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Importe ($)</label>
            <input type="number" step="0.01" className="form-control" value={form.importeInfraccion} onChange={set('importeInfraccion')} />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Acta asociada</label>
            <select className="form-select" value={form.actaId} onChange={set('actaId')}>
              <option value="">-- Sin acta --</option>
              {actas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
}
