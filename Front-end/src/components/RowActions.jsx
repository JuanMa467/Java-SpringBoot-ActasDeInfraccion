export default function RowActions({ onEdit, onDelete, onView }) {
  return (
    <td>
      {onView && (
        <button type="button" className="btn btn-sm btn-outline-primary me-1" onClick={onView}>
          <i className="bi bi-eye" />
        </button>
      )}
      {onEdit && (
        <button type="button" className="btn btn-sm btn-outline-warning me-1" onClick={onEdit}>
          <i className="bi bi-pencil" />
        </button>
      )}
      {onDelete && (
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={onDelete}>
          <i className="bi bi-trash" />
        </button>
      )}
    </td>
  );
}
