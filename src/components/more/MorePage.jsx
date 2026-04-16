import { useNavigate } from 'react-router-dom';

export default function MorePage() {
  const navigate = useNavigate();

  return (
    <div className="pt-4 space-y-4">
      <h1 className="text-xl font-bold text-[#FFD700]">More</h1>

      <div className="bg-[#141414] rounded-2xl shadow-sm overflow-hidden">
        <button
          onClick={() => navigate('/profile')}
          className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#1A1A1A] transition-colors border-b border-[#2A2000]">
          <div className="flex items-center gap-3">
            <span className="text-xl">👤</span>
            <span className="text-sm font-medium text-[#FFD700]">Profile</span>
          </div>
          <span className="text-[#665500] text-lg">›</span>
        </button>
        <button
          onClick={() => navigate('/setup')}
          className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#1A1A1A] transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚙️</span>
            <span className="text-sm font-medium text-[#FFD700]">Edit Profile & Goals</span>
          </div>
          <span className="text-[#665500] text-lg">›</span>
        </button>
      </div>
    </div>
  );
}
