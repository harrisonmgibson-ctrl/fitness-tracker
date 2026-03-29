import { useState } from 'react';
import { toISODate } from '../../lib/dateUtils';
import { useDiary } from '../../hooks/useDiary';
import { useProfile } from '../../hooks/useProfile';
import { useGoals } from '../../hooks/useGoals';
import { useWeightLog } from '../../hooks/useWeightLog';
import { useStreak } from '../../hooks/useStreak';
import TopHeader from '../layout/TopHeader';
import HeroCalorieRing from './HeroCalorieRing';
import MacroRibbon from './MacroRibbon';
import StreakWidget from './StreakWidget';
import MealSummaryCard from './MealSummaryCard';
import WaterCard from './WaterCard';
import WeightSparklineCard from './WeightSparklineCard';

const MEALS = ['breakfast', 'lunch', 'dinner', 'snack'];

export default function TodayPage() {
  const [date, setDate] = useState(toISODate());
  const { entries, addEntry, removeEntry, dailyTotals } = useDiary(date);
  const { profile } = useProfile();
  const goals = useGoals(profile);
  const { log, addWeight } = useWeightLog();
  const streak = useStreak();

  if (!goals) return null;

  return (
    <div className="pb-4">
      <TopHeader date={date} onDateChange={setDate} />

      <div className="space-y-3">
        <HeroCalorieRing consumed={dailyTotals.calories} goal={goals.calorieGoal} />
        <MacroRibbon totals={dailyTotals} targets={goals.macroTargets} />
        <StreakWidget streak={streak} />

        {MEALS.map(meal => (
          <MealSummaryCard
            key={meal}
            mealType={meal}
            entries={entries}
            onAdd={addEntry}
            onRemove={removeEntry}
          />
        ))}

        <WaterCard />
        <WeightSparklineCard log={log} onAddWeight={addWeight} />
      </div>
    </div>
  );
}
