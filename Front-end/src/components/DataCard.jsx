export default function DataCard({ searchPlaceholder, onSearch, children }) {
  return (
    <div className="card border-0 shadow-sm rounded-3">
      <div className="card-body p-0">
        {onSearch && (
          <div className="p-3 border-bottom">
            <input
              type="text"
              className="form-control form-control-sm w-auto"
              placeholder={searchPlaceholder || 'Buscar...'}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        )}
        <div className="table-responsive">{children}</div>
      </div>
    </div>
  );
}
