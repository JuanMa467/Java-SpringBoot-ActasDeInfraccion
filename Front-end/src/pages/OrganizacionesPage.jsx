import { useCallback, useEffect, useState } from 'react';
import { apiDelete, apiGet, apiPost, apiPut } from '../api/client';
import Alert from '../components/Alert';
import DataCard from '../components/DataCard';
import Modal from '../components/Modal';
import PageHeader from '../components/PageHeader';
import RowActions from '../components/RowActions';
import { useAlert } from '../hooks/useAlert';

export default function OrganizacionesPage() {
  const { alert, showAlert, dismissAlert } = useAlert();
  const [datos, setDatos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiGet('/Organizaciones');
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
  }, [cargar]);

  const buscar = (q) => {
    const lower = q.toLowerCase();
    setFiltrados(
      datos.filter(
        (i) =>
          (i.nombre || '').toLowerCase().includes(lower) ||
          (i.localidad || '').toLowerCase().includes(lower),
      ),
    );
  };

  const editar = (i) => {
    setEditId(i.id);
    setNombre(i.nombre || '');
    setLocalidad(i.localidad || '');
    setShowModal(true);
  };

  const guardar = async () => {
    try {
      const res = editId
        ? await apiPut(`/Organizaciones/${editId}`, { nombre, localidad })
        : await apiPost('/Organizaciones', { nombre, localidad });
      if (res.ok) {
        setShowModal(false);
        showAlert('Guardado correctamente.');
        cargar();
      } else {
        showAlert('Error al guardar.', 'danger');
      }
    } catch {
      showAlert('Error de conexión.', 'danger');
    }
  };

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar?')) return;
    try {
      await apiDelete(`/Organizaciones/${id}`);
      showAlert('Eliminado.');
      cargar();
    } catch {
      showAlert('Error.', 'danger');
    }
  };

  return (
    <>
      <PageHeader
        title="Organizaciones Estatales"
        action={
          <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-lg me-1" />
            Nuevo/a
          </button>
        }
      />
      <Alert alert={alert} onDismiss={dismissAlert} />

      <DataCard searchPlaceholder="Buscar..." onSearch={buscar}>
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th className="ps-3">ID</th>
              <th>Nombre</th>
              <th>Localidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-muted">
                  Cargando...
                </td>
              </tr>
            ) : !filtrados.length ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-muted">
                  No hay datos
                </td>
              </tr>
            ) : (
              filtrados.map((i) => (
                <tr key={i.id}>
                  <td className="ps-3 text-muted small">#{i.id}</td>
                  <td>
                    <strong>{i.nombre || '-'}</strong>
                  </td>
                  <td>{i.localidad || '-'}</td>
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
        title="Organizaciones Estatales"
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
          <div className="col-md-8">
            <label className="form-label fw-semibold">Nombre</label>
            <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">Localidad</label>
            <input type="text" className="form-control" value={localidad} onChange={(e) => setLocalidad(e.target.value)} />
          </div>
        </div>
      </Modal>
    </>
  );
}
