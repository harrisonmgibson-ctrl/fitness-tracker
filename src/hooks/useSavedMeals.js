import { useState } from 'react';
import { getSavedMeals, setSavedMeals } from '../lib/storage';

export function useSavedMeals() {
  const [meals, setMeals] = useState(() => getSavedMeals());

  function addMeal(meal) {
    const newMeal = { ...meal, id: `saved_${crypto.randomUUID()}` };
    const updated = [newMeal, ...meals];
    setMeals(updated);
    setSavedMeals(updated);
    return newMeal;
  }

  function removeMeal(id) {
    const updated = meals.filter(m => m.id !== id);
    setMeals(updated);
    setSavedMeals(updated);
  }

  return { meals, addMeal, removeMeal };
}
