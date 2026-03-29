import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import FABModal from './FABModal';

export default function AppShell() {
  const [fabOpen, setFabOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-gray-900">
      <main className="pb-24 max-w-lg mx-auto px-4">
        <Outlet />
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setFabOpen(true)}
        className="fixed bottom-[60px] left-1/2 -translate-x-1/2 z-20 w-14 h-14 rounded-full bg-[#0066EE] shadow-lg flex items-center justify-center text-white text-2xl leading-none hover:bg-[#0052BE] transition-colors">
        +
      </button>

      <NavBar />

      {fabOpen && <FABModal onClose={() => setFabOpen(false)} />}
    </div>
  );
}
