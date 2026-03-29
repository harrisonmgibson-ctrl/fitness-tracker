import { useNavigate } from 'react-router-dom';

export default function MorePage() {
  const navigate = useNavigate();

  return (
    <div className="pt-4 space-y-4">
      <h1 className="text-xl font-bold text-gray-900">More</h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <button
          onClick={() => navigate('/profile')}
          className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
          <div className="flex items-center gap-3">
            <span className="text-xl">👤</span>
            <span className="text-sm font-medium text-gray-800">Profile</span>
          </div>
          <span className="text-gray-300 text-lg">›</span>
        </button>
        <button
          onClick={() => navigate('/setup')}
          className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚙️</span>
            <span className="text-sm font-medium text-gray-800">Edit Profile & Goals</span>
          </div>
          <span className="text-gray-300 text-lg">›</span>
        </button>
      </div>
    </div>
  );
}
