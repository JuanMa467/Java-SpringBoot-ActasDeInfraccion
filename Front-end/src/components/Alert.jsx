export default function Alert({ alert, onDismiss }) {
  if (!alert) return null;
  return (
    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
      {alert.message}
      <button type="button" className="btn-close" onClick={onDismiss} aria-label="Cerrar" />
    </div>
  );
}
