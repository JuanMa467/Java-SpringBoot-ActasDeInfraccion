export default function Modal({ show, onClose, title, size = '', children, footer }) {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop-custom" onClick={onClose} aria-hidden="true" />
      <div className="modal show d-block" tabIndex={-1} style={{ zIndex: 1050 }}>
        <div className={`modal-dialog${size ? ` ${size}` : ''}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">{title}</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar" />
            </div>
            <div className="modal-body">{children}</div>
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
    </>
  );
}
