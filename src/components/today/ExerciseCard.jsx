import { useState } from 'react';
import { useExercise } from '../../hooks/useExercise';

export default function ExerciseCard({ date }) {
  const { entries, addExercise, removeExercise, totalBurned } = useExercise(date);
  const [name, setName] = useState('');
  const [cals, setCals] = useState('');

  function handleAdd(e) {
    e.preventDefault();
    if (!name.trim() || !cals) return;
    addExercise({ name: name.trim(), caloriesBurned: Number(cals) });
    setName('');
    setCals('');
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏃</span>
          <p className="text-sm font-semibold text-gray-800">Exercise</p>
        </div>
        {totalBurned > 0 && (
          <span className="text-sm font-semibold text-green-600">+{totalBurned} kcal</span>
        )}
      </div>

      {entries.length > 0 && (
        <div className="space-y-1 mb-3">
          {entries.map(e => (
            <div key={e.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{e.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-medium">+{e.caloriesBurned} kcal</span>
                <button
                  onClick={() => removeExercise(e.id)}
                  className="text-gray-300 hover:text-red-400 text-xs leading-none transition-colors">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Activity name"
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
        />
        <input
          type="number"
          value={cals}
          onChange={e => setCals(e.target.value)}
          placeholder="kcal"
          min="1"
          className="w-20 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
        />
        <button
          type="submit"
          className="bg-[#0066EE] hover:bg-[#0052BE] text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors">
          Add
        </button>
      </form>
    </div>
  );
}
