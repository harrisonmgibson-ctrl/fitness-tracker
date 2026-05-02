import { useState, useEffect } from 'react';
import { getWeightLog, setWeightLog as saveLog } from '../lib/storage';
import { toISODate } from '../lib/dateUtils';

export function useWeightLog() {
  const [log, setLog] = useState([]);

  useEffect(() => {
    getWeightLog().then(setLog);
  }, []);

  function addWeight(weightKg, date = toISODate()) {
    const filtered = log.filter((e) => e.date !== date);
    const updated = [...filtered, { id: crypto.randomUUID(), date, weightKg }]
      .sort((a, b) => b.date.localeCompare(a.date));
    saveLog(updated);
    setLog(updated);
  }

  return { log, addWeight };
}
