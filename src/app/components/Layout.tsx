import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <Outlet />
    </div>
  );
}
