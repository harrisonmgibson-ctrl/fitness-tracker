import { useState } from 'react';
import { getRecents, setRecents } from '../lib/storage';

export function useRecents() {
  const [recents, setRecentsState] = useState(() => getRecents());

  function pushRecent(food) {
    const item = {
      foodId: food.id,
      foodName: food.name,
      servingUnit: food.servingUnit,
      servingSizeG: food.servingSizeG,
      calories: food.calories,
      proteinG: food.proteinG,
      carbsG: food.carbsG,
      fatG: food.fatG,
      fiberG: food.fiberG || 0,
    };
    const deduplicated = recents.filter(r => r.foodId !== food.id);
    const updated = [item, ...deduplicated].slice(0, 20);
    setRecents(updated);
    setRecentsState(updated);
  }

  return { recents, pushRecent };
}
