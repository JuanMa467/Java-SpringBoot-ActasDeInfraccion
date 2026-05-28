import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../api/client';

const statsConfig = [
  { path: '/Actas', label: 'Total Actas', icon: 'bi-file-text', color: 'primary' },
  { path: '/Infracciones', label: 'Infracciones', icon: 'bi-exclamation-triangle', color: 'danger' },
];

export default function HomePage() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    statsConfig.forEach(async ({ path, label }) => {
      try {
        const data = await apiGet(path);
        setStats((prev) => ({ ...prev, [label]: Array.isArray(data) ? data.length : '?' }));
      } catch {
        setStats((prev) => ({ ...prev, [label]: '-' }));
      }
    });
  }, []);

  return (
    <>
      <div className="mb-4">
        <h2 className="fw-bold text-dark">Panel Principal</h2>
        <p className="text-muted">Sistema de Gestión de Actas de Constatación</p>
      </div>

      <div className="row g-3 mb-4">
        {statsConfig.map(({ label, icon, color }) => (
          <div key={label} className="col-md-6">
            <div className="card card-stat shadow-sm">
              <div className="card-body d-flex align-items-center gap-3">
                <div className={`rounded-3 bg-${color} bg-opacity-10 p-3`}>
                  <i className={`bi ${icon} fs-4 text-${color}`} />
                </div>
                <div>
                  <div className="text-muted small">{label}</div>
                  <div className="fw-bold fs-4">{stats[label] ?? '-'}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">Acciones Rápidas</h5>
          <div className="d-flex flex-wrap gap-2">
            <Link to="/actas" className="btn btn-primary">
              <i className="bi bi-file-text me-1" />
              Ver Actas
            </Link>
            <Link to="/actas" className="btn btn-success">
              <i className="bi bi-plus-lg me-1" />
              Nueva Acta
            </Link>
            <Link to="/infracciones" className="btn btn-outline-secondary">
              <i className="bi bi-exclamation-triangle me-1" />
              Ver Infracciones
            </Link>
          </div>
          <p className="text-muted small mt-3 mb-0">
            Conductores, rutas, vehículos, licencias, autoridades y tipos de infracción se cargan solo al
            crear un acta.
          </p>
        </div>
      </div>
    </>
  );
}
