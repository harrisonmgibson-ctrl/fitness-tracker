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
      <h1 className="text-xl font-bold text-[#FFD700]">Dashboard</h1>

      <CalorieRing consumed={dailyTotals.calories} goal={goals.calorieGoal} />
      <MacroBreakdown totals={dailyTotals} targets={goals.macroTargets} />
      <WeeklyCalorieChart calorieGoal={goals.calorieGoal} />

      <div className="bg-[#141414] rounded-2xl p-4">
        <h2 className="text-sm font-medium text-[#997700] mb-3">Log Weight</h2>
        {latestWeight && (
          <p className="text-xs text-[#665500] mb-2">
            Last logged: {latestWeight.weightKg} kg on {latestWeight.date}
          </p>
        )}
        <form onSubmit={handleLogWeight} className="flex gap-2">
          <input
            type="number" step="0.1" min="30" max="300"
            value={weightInput}
            onChange={e => setWeightInput(e.target.value)}
            placeholder="kg"
            className="flex-1 bg-[#1A1A1A] border border-[#3D2E00] rounded-lg px-3 py-2 text-[#FFD700] placeholder:text-[#665500] focus:outline-none focus:ring-2 focus:ring-[#00AAFF]"
          />
          <button type="submit" className="bg-[#00FF66] hover:bg-[#00DD55] text-black px-4 py-2 rounded-lg font-medium transition-colors">
            Log
          </button>
        </form>
      </div>

      <div className="bg-[#141414] rounded-2xl p-4 text-xs text-[#665500] space-y-1">
        <p>BMR: <span className="text-[#CCA800]">{goals.bmr} kcal</span></p>
        <p>TDEE: <span className="text-[#CCA800]">{goals.tdee} kcal</span></p>
        <p>Daily Goal: <span className="text-[#00FF66] font-medium">{goals.calorieGoal} kcal</span></p>
      </div>
    </div>
  );
}
