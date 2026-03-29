import { useProfile } from '../../hooks/useProfile';
import { useGoals } from '../../hooks/useGoals';
import { useDiary } from '../../hooks/useDiary';
import { useWeightLog } from '../../hooks/useWeightLog';
import { toISODate } from '../../lib/dateUtils';
import CalorieRing from './CalorieRing';
import MacroBreakdown from './MacroBreakdown';
import WeeklyCalorieChart from './WeeklyCalorieChart';
import { useState } from 'react';

export default function DashboardPage() {
  const { profile } = useProfile();
  const goals = useGoals(profile);
  const { dailyTotals } = useDiary(toISODate());
  const { log, addWeight } = useWeightLog();
  const [weightInput, setWeightInput] = useState('');

  if (!goals) return null;

  function handleLogWeight(e) {
    e.preventDefault();
    if (weightInput) {
      addWeight(Number(weightInput));
      setWeightInput('');
    }
  }

  const latestWeight = log[0];

  return (
    <div className="pt-4 space-y-4">
      <h1 className="text-xl font-bold text-white">Dashboard</h1>

      <CalorieRing consumed={dailyTotals.calories} goal={goals.calorieGoal} />
      <MacroBreakdown totals={dailyTotals} targets={goals.macroTargets} />
      <WeeklyCalorieChart calorieGoal={goals.calorieGoal} />

      <div className="bg-gray-900 rounded-2xl p-4">
        <h2 className="text-sm font-medium text-gray-400 mb-3">Log Weight</h2>
        {latestWeight && (
          <p className="text-xs text-gray-500 mb-2">
            Last logged: {latestWeight.weightKg} kg on {latestWeight.date}
          </p>
        )}
        <form onSubmit={handleLogWeight} className="flex gap-2">
          <input
            type="number" step="0.1" min="30" max="300"
            value={weightInput}
            onChange={e => setWeightInput(e.target.value)}
            placeholder="kg"
            className="flex-1 bg-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Log
          </button>
        </form>
      </div>

      <div className="bg-gray-900 rounded-2xl p-4 text-xs text-gray-500 space-y-1">
        <p>BMR: <span className="text-gray-300">{goals.bmr} kcal</span></p>
        <p>TDEE: <span className="text-gray-300">{goals.tdee} kcal</span></p>
        <p>Daily Goal: <span className="text-emerald-400 font-medium">{goals.calorieGoal} kcal</span></p>
      </div>
    </div>
  );
}
