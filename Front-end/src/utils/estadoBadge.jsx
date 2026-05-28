export function EstadoBadge({ estado }) {
  if (!estado) {
    return <span className="badge bg-secondary">Sin estado</span>;
  }
  const nombre = estado.nombreEstadoActa || '';
  const lower = nombre.toLowerCase();
  const color = lower.includes('activ')
    ? 'success'
    : lower.includes('cerr')
      ? 'secondary'
      : lower.includes('pend')
        ? 'warning'
        : lower.includes('anul')
          ? 'danger'
          : 'primary';
  return <span className={`badge bg-${color} badge-estado`}>{nombre}</span>;
}
