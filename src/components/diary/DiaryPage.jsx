import { useState } from 'react';
import { toISODate } from '../../lib/dateUtils';
import { useDiary } from '../../hooks/useDiary';
import { useProfile } from '../../hooks/useProfile';
import { useGoals } from '../../hooks/useGoals';
import DatePicker from './DatePicker';
import MealSection from './MealSection';
import DailyTotalsBar from './DailyTotalsBar';

const MEALS = ['breakfast', 'lunch', 'dinner', 'snack'];

export default function DiaryPage() {
  const [date, setDate] = useState(toISODate());
  const { entries, addEntry, removeEntry, dailyTotals } = useDiary(date);
  const { profile } = useProfile();
  const goals = useGoals(profile);

  function handleDateChange(newDate) {
    setDate(newDate);
  }

  return (
    <div className="pt-2 pb-32">
      <DatePicker date={date} onChange={handleDateChange} />
      {MEALS.map(meal => (
        <MealSection
          key={meal}
          mealType={meal}
          entries={entries}
          onAdd={addEntry}
          onRemove={removeEntry}
        />
      ))}
      <DailyTotalsBar totals={dailyTotals} goals={goals} />
    </div>
  );
}
