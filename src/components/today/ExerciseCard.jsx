import { useState } from 'react';
import { useExercise } from '../../hooks/useExercise';
import exercises from '../../data/exerciseDatabase';

export default function ExerciseCard({ date }) {
  const { entries, addExercise, removeExercise, totalBurned } = useExercise(date);

  // Free-form state
  const [name, setName] = useState('');
  const [cals, setCals] = useState('');

  // Quick-pick state
  const [quickPick, setQuickPick] = useState(null);
  const [duration, setDuration] = useState('30');

  const kcalPreview = quickPick
    ? Math.round(quickPick.kcalPer30Min * (Number(duration) || 0) / 30)
    : null;

  function handleAdd(e) {
    e.preventDefault();
    if (quickPick) {
      if (!duration || Number(duration) <= 0) return;
      addExercise({ name: `${quickPick.name} (${duration} min)`, caloriesBurned: kcalPreview });
      setQuickPick(null);
      setDuration('30');
    } else {
      if (!name.trim() || !cals) return;
      addExercise({ name: name.trim(), caloriesBurned: Number(cals) });
      setName('');
      setCals('');
    }
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

      {/* Quick-pick chip row */}
      <div
        className="flex gap-2 overflow-x-auto pb-2 mb-3"
        style={{ scrollbarWidth: 'none' }}>
        {exercises.map(ex => (
          <button
            key={ex.id}
            onClick={() => setQuickPick(quickPick?.id === ex.id ? null : ex)}
            className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              quickPick?.id === ex.id
                ? 'bg-[#0066EE] border-[#0066EE] text-white'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-[#0066EE]/50'
            }`}>
            <span>{ex.emoji}</span>
            <span>{ex.name}</span>
          </button>
        ))}
      </div>

      {/* Add form */}
      <form onSubmit={handleAdd} className="flex gap-2">
        {quickPick ? (
          <>
            <div className="flex-1 bg-gray-50 border border-[#0066EE]/30 rounded-xl px-3 py-2 text-sm text-gray-700 flex items-center justify-between">
              <span>{quickPick.emoji} {quickPick.name}</span>
              <button type="button" onClick={() => setQuickPick(null)} className="text-gray-400 hover:text-gray-600 text-xs ml-2">✕</button>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="min"
                min="1"
                className="w-16 bg-gray-50 border border-gray-200 rounded-xl px-2 py-2 text-sm text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
              />
              <span className="text-xs text-gray-400">min</span>
            </div>
            <button
              type="submit"
              className="bg-[#0066EE] hover:bg-[#0052BE] text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
              +{kcalPreview} kcal
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </form>
    </div>
  );
}
