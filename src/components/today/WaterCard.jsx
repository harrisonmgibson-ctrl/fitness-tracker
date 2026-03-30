import { useState } from 'react';
import { useWater } from '../../hooks/useWater';

export default function WaterCard({ date }) {
  const { count, goal, increment, decrement, setGoal } = useWater(date);
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState('');

  function handleGoalSave(e) {
    e.preventDefault();
    if (goalInput) setGoal(goalInput);
    setEditingGoal(false);
    setGoalInput('');
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">💧</span>
          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-gray-800">Water</p>
              <button
                onClick={() => { setEditingGoal(true); setGoalInput(String(goal)); }}
                className="text-gray-300 hover:text-gray-500 transition-colors text-xs leading-none">
                ✎
              </button>
            </div>
            {editingGoal ? (
              <form onSubmit={handleGoalSave} className="flex items-center gap-1 mt-0.5">
                <input
                  type="number"
                  value={goalInput}
                  onChange={e => setGoalInput(e.target.value)}
                  min="1" max="30"
                  className="w-12 text-xs border border-gray-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#0066EE]"
                  autoFocus
                />
                <button type="submit" className="text-xs text-[#0066EE] font-medium">Save</button>
              </form>
            ) : (
              <p className="text-xs text-gray-400">{count} / {goal} glasses</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={decrement}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-medium transition-colors">
            −
          </button>
          <button
            onClick={increment}
            className="w-8 h-8 rounded-full bg-[#0066EE] hover:bg-[#0052BE] flex items-center justify-center text-white font-medium transition-colors">
            +
          </button>
        </div>
      </div>
      <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full bg-blue-400 transition-all"
          style={{ width: `${Math.min((count / goal) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
