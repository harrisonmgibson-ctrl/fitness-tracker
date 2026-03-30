import { useState } from 'react';
import { getDiaryDay, setDiaryDay } from '../lib/storage';
import { sumEntries } from '../lib/calculations';

export function useDiary(date) {
  const [entries, setEntries] = useState(() => getDiaryDay(date));

  function addEntry(mealType, foodItem, quantity) {
    const newEntry = {
      id: crypto.randomUUID(),
      mealType,
      foodItemId: foodItem.id,
      foodName: foodItem.name,
      servingUnit: foodItem.servingUnit,
      quantity,
      calories: Math.round(foodItem.calories * quantity),
      proteinG: Math.round(foodItem.proteinG * quantity * 10) / 10,
      carbsG: Math.round(foodItem.carbsG * quantity * 10) / 10,
      fatG: Math.round(foodItem.fatG * quantity * 10) / 10,
      fiberG: Math.round((foodItem.fiberG || 0) * quantity * 10) / 10,
    };
    const updated = [...entries, newEntry];
    setDiaryDay(date, updated);
    setEntries(updated);
  }

  function removeEntry(id) {
    const updated = entries.filter((e) => e.id !== id);
    setDiaryDay(date, updated);
    setEntries(updated);
  }

  function copyFromDate(fromDate) {
    const source = getDiaryDay(fromDate);
    if (!source.length) return;
    const copied = source.map(e => ({ ...e, id: crypto.randomUUID() }));
    setDiaryDay(date, copied);
    setEntries(copied);
  }

  const dailyTotals = sumEntries(entries);

  return { entries, addEntry, removeEntry, copyFromDate, dailyTotals };
}
