import { useState } from 'react';
import { toISODate } from '../../lib/dateUtils';
import { useDiary } from '../../hooks/useDiary';
import { useProfile } from '../../hooks/useProfile';
import { useGoals } from '../../hooks/useGoals';
import TopHeader from '../layout/TopHeader';
import MealSection from './MealSection';

const MEALS = ['breakfast', 'lunch', 'dinner', 'snack'];

function getYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export default function DiaryPage() {
  const [date, setDate] = useState(toISODate());
  const { entries, addEntry, removeEntry, updateEntryQuantity, copyFromDate, dailyTotals } = useDiary(date);
  const { profile } = useProfile();
  const goals = useGoals(profile);

  const today = toISODate();
  const isToday = date === today;
  const remaining = goals ? goals.calorieGoal - dailyTotals.calories : null;
  const over = remaining !== null && remaining < 0;

  return (
    <div className="pb-4">
      <TopHeader date={date} onDateChange={setDate} />

      {/* Slim calorie strip */}
      {goals && (
        <div className="bg-[#141414] rounded-2xl shadow-sm px-4 py-3 mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#665500]">Calories</p>
            <p className="text-sm font-semibold text-[#FFD700]">
              {dailyTotals.calories} <span className="text-[#665500] font-normal">/ {goals.calorieGoal} kcal</span>
            </p>
          </div>
          <p className={`text-sm font-semibold ${over ? 'text-[#FF2233]' : 'text-[#00AAFF]'}`}>
            {over ? `${Math.abs(remaining)} over` : `${remaining} left`}
          </p>
        </div>
      )}

      {/* Copy Yesterday button — only on today when diary is empty */}
      {isToday && entries.length === 0 && (
        <button
          onClick={() => copyFromDate(getYesterday())}
          className="w-full mb-3 flex items-center justify-center gap-2 bg-[#141414] rounded-2xl shadow-sm px-4 py-3 text-sm text-[#00AAFF] font-medium hover:bg-[#1A1A1A] transition-colors border border-dashed border-[#00AAFF]/30">
          📋 Copy Yesterday's Meals
        </button>
      )}

      {MEALS.map(meal => (
        <MealSection
          key={meal}
          mealType={meal}
          entries={entries}
          onAdd={addEntry}
          onRemove={removeEntry}
          onEdit={updateEntryQuantity}
        />
      ))}
    </div>
  );
}
