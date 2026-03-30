import { useState } from 'react';
import { getExerciseDay, setExerciseDay } from '../lib/storage';

export function useExercise(date) {
  const [entries, setEntries] = useState(() => getExerciseDay(date));

  function addExercise({ name, caloriesBurned }) {
    const newEntry = { id: crypto.randomUUID(), name, caloriesBurned: Number(caloriesBurned) };
    const updated = [...entries, newEntry];
    setExerciseDay(date, updated);
    setEntries(updated);
  }

  function removeExercise(id) {
    const updated = entries.filter(e => e.id !== id);
    setExerciseDay(date, updated);
    setEntries(updated);
  }

  const totalBurned = entries.reduce((sum, e) => sum + (e.caloriesBurned || 0), 0);

  return { entries, addExercise, removeExercise, totalBurned };
}
