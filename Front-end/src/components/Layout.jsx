import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 content-area">
        <Outlet />
      </div>
    </div>
  );
}
