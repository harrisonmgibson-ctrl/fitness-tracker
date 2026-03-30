import { useState } from 'react';
import { toISODate } from '../../lib/dateUtils';
import { useDiary } from '../../hooks/useDiary';
import { useProfile } from '../../hooks/useProfile';
import { useGoals } from '../../hooks/useGoals';
import { useWeightLog } from '../../hooks/useWeightLog';
import { useStreak } from '../../hooks/useStreak';
import { useExercise } from '../../hooks/useExercise';
import TopHeader from '../layout/TopHeader';
import HeroCalorieRing from './HeroCalorieRing';
import MacroRibbon from './MacroRibbon';
import StreakWidget from './StreakWidget';
import MealSummaryCard from './MealSummaryCard';
import ExerciseCard from './ExerciseCard';
import WaterCard from './WaterCard';
import WeightSparklineCard from './WeightSparklineCard';
import ReminderBanner from './ReminderBanner';

const MEALS = ['breakfast', 'lunch', 'dinner', 'snack'];

export default function TodayPage() {
  const [date, setDate] = useState(toISODate());
  const { entries, addEntry, removeEntry, dailyTotals } = useDiary(date);
  const { profile } = useProfile();
  const goals = useGoals(profile);
  const { log, addWeight } = useWeightLog();
  const streak = useStreak();
  const { totalBurned } = useExercise(date);

  if (!goals) return null;

  return (
    <div className="pb-4">
      <TopHeader date={date} onDateChange={setDate} />

      <div className="space-y-3">
        <ReminderBanner entryCount={entries.length} />
        <HeroCalorieRing
          consumed={dailyTotals.calories}
          goal={goals.calorieGoal}
          exerciseCalories={totalBurned}
        />
        <MacroRibbon
          totals={dailyTotals}
          targets={goals.macroTargets}
          fiberTarget={goals.fiberTarget}
        />
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

        <ExerciseCard date={date} />
        <WaterCard date={date} />
        <WeightSparklineCard log={log} onAddWeight={addWeight} />
      </div>
    </div>
  );
}
