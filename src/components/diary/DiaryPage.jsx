import { useState } from 'react';
import { toISODate } from '../../lib/dateUtils';
import { useDiary } from '../../hooks/useDiary';
import { useProfile } from '../../hooks/useProfile';
import { useGoals } from '../../hooks/useGoals';
import TopHeader from '../layout/TopHeader';
import MealSection from './MealSection';

const MEALS = ['breakfast', 'lunch', 'dinner', 'snack'];

export default function DiaryPage() {
  const [date, setDate] = useState(toISODate());
  const { entries, addEntry, removeEntry, dailyTotals } = useDiary(date);
  const { profile } = useProfile();
  const goals = useGoals(profile);

  const remaining = goals ? goals.calorieGoal - dailyTotals.calories : null;
  const over = remaining !== null && remaining < 0;

  return (
    <div className="pb-4">
      <TopHeader date={date} onDateChange={setDate} />

      {/* Slim calorie strip */}
      {goals && (
        <div className="bg-white rounded-2xl shadow-sm px-4 py-3 mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Calories</p>
            <p className="text-sm font-semibold text-gray-900">
              {dailyTotals.calories} <span className="text-gray-400 font-normal">/ {goals.calorieGoal} kcal</span>
            </p>
          </div>
          <p className={`text-sm font-semibold ${over ? 'text-red-500' : 'text-[#0066EE]'}`}>
            {over ? `${Math.abs(remaining)} over` : `${remaining} left`}
          </p>
        </div>
      )}

      {MEALS.map(meal => (
        <MealSection
          key={meal}
          mealType={meal}
          entries={entries}
          onAdd={addEntry}
          onRemove={removeEntry}
        />
      ))}
    </div>
  );
}
