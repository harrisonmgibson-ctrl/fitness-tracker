import { useState, useEffect } from 'react';
import { getAllDiary } from '../lib/storage';
import { toISODate, addDays } from '../lib/dateUtils';

export function useStreak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    getAllDiary().then(diary => {
      let s = 0;
      let checkDate = toISODate();
      while (true) {
        const entries = diary[checkDate];
        if (!entries || entries.length === 0) break;
        s++;
        checkDate = addDays(checkDate, -1);
      }
      setStreak(s);
    });
  }, []);

  return streak;
}
