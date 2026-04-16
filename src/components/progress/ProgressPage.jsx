import { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useGoals } from '../../hooks/useGoals';
import { useWeightLog } from '../../hooks/useWeightLog';
import MacroBreakdown from '../dashboard/MacroBreakdown';
import WeeklyCalorieChart from '../dashboard/WeeklyCalorieChart';
import WeeklySummaryCard from './WeeklySummaryCard';
import WeightChart from './WeightChart';
import { useDiary } from '../../hooks/useDiary';
import { toISODate } from '../../lib/dateUtils';
import { getAllDiary } from '../../lib/storage';
import { calcAdaptiveTDEE } from '../../lib/calculations';

export default function ProgressPage() {
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
  const adaptiveTDEE = calcAdaptiveTDEE(log, getAllDiary(), goals.tdee);

  return (
    <div className="pt-4 space-y-4">
      <h1 className="text-xl font-bold text-[#FFD700]">Progress</h1>

      <WeeklySummaryCard calorieGoal={goals.calorieGoal} />
      <WeeklyCalorieChart calorieGoal={goals.calorieGoal} />
      <MacroBreakdown totals={dailyTotals} targets={goals.macroTargets} fiberTarget={goals.fiberTarget} />

      <WeightChart log={log} goalWeightKg={profile?.goalWeightKg ?? null} />

      <div className="bg-[#141414] rounded-2xl shadow-sm p-4">
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
            className="flex-1 bg-[#1A1A1A] border border-[#3D2E00] rounded-xl px-3 py-2 text-[#FFD700] placeholder:text-[#665500] focus:outline-none focus:ring-2 focus:ring-[#00AAFF]"
          />
          <button type="submit" className="bg-[#00AAFF] hover:bg-[#0088DD] text-white px-4 py-2 rounded-xl font-medium transition-colors">
            Log
          </button>
        </form>
      </div>

      <div className="bg-[#141414] rounded-2xl shadow-sm p-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-[#997700]">BMR</span>
          <span className="text-[#FFD700]">{goals.bmr} kcal</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#997700]">TDEE (profile)</span>
          <span className="text-[#FFD700]">{goals.tdee} kcal</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#997700]">Daily Goal</span>
          <span className="text-[#00AAFF] font-semibold">{goals.calorieGoal} kcal</span>
        </div>
      </div>

      <div className="bg-[#141414] rounded-2xl shadow-sm p-4 text-sm space-y-2">
        <h2 className="text-sm font-medium text-[#997700] mb-1">Adaptive TDEE Estimate</h2>
        {adaptiveTDEE ? (
          <>
            <div className="flex justify-between">
              <span className="text-[#997700]">Implied TDEE</span>
              <span className="font-semibold text-[#00AAFF]">{adaptiveTDEE} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#997700]">Profile TDEE</span>
              <span className="text-[#FFD700]">{goals.tdee} kcal</span>
            </div>
            <p className="text-xs text-[#665500] pt-1">
              Estimated from your weight trend and logged calories over the past 30 days.
            </p>
          </>
        ) : (
          <p className="text-xs text-[#665500]">
            Log your weight for at least 2 entries spanning 7+ days to see your adaptive TDEE estimate.
          </p>
        )}
      </div>
    </div>
  );
}
