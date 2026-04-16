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
      baseCalories: foodItem.calories,
      baseProteinG: foodItem.proteinG,
      baseCarbsG: foodItem.carbsG,
      baseFatG: foodItem.fatG,
      baseFiberG: foodItem.fiberG || 0,
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

  function updateEntryQuantity(id, newQty) {
    const updated = entries.map(e => {
      if (e.id !== id) return e;
      const base = e.baseCalories != null ? e : {
        ...e,
        baseCalories: e.quantity > 0 ? e.calories / e.quantity : e.calories,
        baseProteinG: e.quantity > 0 ? e.proteinG / e.quantity : e.proteinG,
        baseCarbsG: e.quantity > 0 ? e.carbsG / e.quantity : e.carbsG,
        baseFatG: e.quantity > 0 ? e.fatG / e.quantity : e.fatG,
        baseFiberG: e.quantity > 0 ? (e.fiberG || 0) / e.quantity : (e.fiberG || 0),
      };
      return {
        ...base,
        quantity: newQty,
        calories: Math.round(base.baseCalories * newQty),
        proteinG: Math.round(base.baseProteinG * newQty * 10) / 10,
        carbsG: Math.round(base.baseCarbsG * newQty * 10) / 10,
        fatG: Math.round(base.baseFatG * newQty * 10) / 10,
        fiberG: Math.round(base.baseFiberG * newQty * 10) / 10,
      };
    });
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

  return { entries, addEntry, removeEntry, updateEntryQuantity, copyFromDate, dailyTotals };
}
