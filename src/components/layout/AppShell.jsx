import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import FABModal from './FABModal';

export default function AppShell() {
  const [fabOpen, setFabOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFD700]">
      <main className="pb-24 max-w-lg mx-auto px-4 pt-safe">
        <Outlet />
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setFabOpen(true)}
        className="fixed bottom-[60px] left-1/2 -translate-x-1/2 z-20 w-14 h-14 rounded-full bg-[#00AAFF] shadow-lg flex items-center justify-center text-white text-2xl leading-none hover:bg-[#0088DD] transition-colors">
        +
      </button>

      <NavBar />

      {fabOpen && <FABModal onClose={() => setFabOpen(false)} />}
    </div>
  );
}
