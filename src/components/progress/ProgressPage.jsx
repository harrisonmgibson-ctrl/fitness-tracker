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
      <h1 className="text-xl font-bold text-gray-900">Progress</h1>

      <WeeklySummaryCard calorieGoal={goals.calorieGoal} />
      <WeeklyCalorieChart calorieGoal={goals.calorieGoal} />
      <MacroBreakdown totals={dailyTotals} targets={goals.macroTargets} fiberTarget={goals.fiberTarget} />

      <WeightChart log={log} goalWeightKg={profile?.goalWeightKg ?? null} />

      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h2 className="text-sm font-medium text-gray-500 mb-3">Log Weight</h2>
        {latestWeight && (
          <p className="text-xs text-gray-400 mb-2">
            Last logged: {latestWeight.weightKg} kg on {latestWeight.date}
          </p>
        )}
        <form onSubmit={handleLogWeight} className="flex gap-2">
          <input
            type="number" step="0.1" min="30" max="300"
            value={weightInput}
            onChange={e => setWeightInput(e.target.value)}
            placeholder="kg"
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
          />
          <button type="submit" className="bg-[#0066EE] hover:bg-[#0052BE] text-white px-4 py-2 rounded-xl font-medium transition-colors">
            Log
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">BMR</span>
          <span className="text-gray-800">{goals.bmr} kcal</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">TDEE (profile)</span>
          <span className="text-gray-800">{goals.tdee} kcal</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Daily Goal</span>
          <span className="text-[#0066EE] font-semibold">{goals.calorieGoal} kcal</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 text-sm space-y-2">
        <h2 className="text-sm font-medium text-gray-500 mb-1">Adaptive TDEE Estimate</h2>
        {adaptiveTDEE ? (
          <>
            <div className="flex justify-between">
              <span className="text-gray-500">Implied TDEE</span>
              <span className="font-semibold text-[#0066EE]">{adaptiveTDEE} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Profile TDEE</span>
              <span className="text-gray-800">{goals.tdee} kcal</span>
            </div>
            <p className="text-xs text-gray-400 pt-1">
              Estimated from your weight trend and logged calories over the past 30 days.
            </p>
          </>
        ) : (
          <p className="text-xs text-gray-400">
            Log your weight for at least 2 entries spanning 7+ days to see your adaptive TDEE estimate.
          </p>
        )}
      </div>
    </div>
  );
}
