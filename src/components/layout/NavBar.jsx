import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const base = 'flex flex-col items-center gap-1 text-xs font-medium py-2 px-4 transition-colors';
  const active = 'text-emerald-500';
  const inactive = 'text-gray-400';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around z-10">
      <NavLink to="/diary" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        <span className="text-xl">📋</span>
        Diary
      </NavLink>
      <NavLink to="/dashboard" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        <span className="text-xl">📊</span>
        Dashboard
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        <span className="text-xl">👤</span>
        Profile
      </NavLink>
    </nav>
  );
}
