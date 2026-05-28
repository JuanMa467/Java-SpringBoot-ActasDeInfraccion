import { NavLink } from 'react-router-dom';

const mainNav = [
  { to: '/', icon: 'bi-house', label: 'Inicio', end: true },
  { to: '/actas', icon: 'bi-file-text', label: 'Actas' },
  { to: '/infracciones', icon: 'bi-exclamation-triangle', label: 'Infracciones' },
];

function NavItem({ to, icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
    >
      <i className={`bi ${icon} me-2`} />
      {label}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <div className="sidebar d-flex flex-column p-3" style={{ width: 240, minWidth: 240 }}>
      <div className="brand p-2 mb-3">
        <i className="bi bi-file-earmark-text me-2" />
        Sistema de Actas
      </div>
      <nav className="nav flex-column gap-1">
        {mainNav.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>
    </div>
  );
}
