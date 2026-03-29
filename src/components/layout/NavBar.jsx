import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const base = 'flex flex-col items-center gap-0.5 text-xs font-medium py-2 px-3 transition-colors';
  const active = 'text-[#0066EE]';
  const inactive = 'text-gray-400';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around z-10">
      <NavLink to="/" end className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        <span className="text-xl">🏠</span>
        Today
      </NavLink>
      <NavLink to="/diary" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        <span className="text-xl">📖</span>
        Diary
      </NavLink>
      {/* Spacer for FAB */}
      <div className="w-14" />
      <NavLink to="/progress" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        <span className="text-xl">📈</span>
        Progress
      </NavLink>
      <NavLink to="/more" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        <span className="text-xl">⋯</span>
        More
      </NavLink>
    </nav>
  );
}
