import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <main className="pb-20 max-w-lg mx-auto px-4">
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
}
