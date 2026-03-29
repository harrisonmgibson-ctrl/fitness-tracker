import { getAllDiary } from '../lib/storage';
import { toISODate, addDays } from '../lib/dateUtils';

export function useStreak() {
  const diary = getAllDiary();
  let streak = 0;
  let checkDate = toISODate();

  while (true) {
    const entries = diary[checkDate];
    if (!entries || entries.length === 0) break;
    streak++;
    checkDate = addDays(checkDate, -1);
  }

  return streak;
}
