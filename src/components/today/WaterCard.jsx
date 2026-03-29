import { useState } from 'react';

export default function WaterCard() {
  const [glasses, setGlasses] = useState(0);
  const goal = 8;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">💧</span>
          <div>
            <p className="text-sm font-semibold text-gray-800">Water</p>
            <p className="text-xs text-gray-400">{glasses} / {goal} glasses</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setGlasses(g => Math.max(0, g - 1))}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-medium transition-colors">
            −
          </button>
          <button
            onClick={() => setGlasses(g => Math.min(20, g + 1))}
            className="w-8 h-8 rounded-full bg-[#0066EE] hover:bg-[#0052BE] flex items-center justify-center text-white font-medium transition-colors">
            +
          </button>
        </div>
      </div>
      <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full bg-blue-400 transition-all"
          style={{ width: `${Math.min((glasses / goal) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
