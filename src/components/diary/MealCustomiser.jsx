import { useState, useMemo } from 'react';
import foods from '../../data/foodDatabase';

const foodById = Object.fromEntries(foods.map(f => [f.id, f]));

function calcTotal(ingredients) {
  return ingredients.reduce((acc, { food, quantity }) => ({
    calories: acc.calories + Math.round(food.calories * quantity),
    proteinG: Math.round((acc.proteinG + food.proteinG * quantity) * 10) / 10,
    carbsG:   Math.round((acc.carbsG   + food.carbsG   * quantity) * 10) / 10,
    fatG:     Math.round((acc.fatG     + food.fatG     * quantity) * 10) / 10,
    fiberG:   Math.round((acc.fiberG   + (food.fiberG || 0) * quantity) * 10) / 10,
  }), { calories: 0, proteinG: 0, carbsG: 0, fatG: 0, fiberG: 0 });
}

export default function MealCustomiser({ meal, onLog, onSave, onBack }) {
  const [ingredients, setIngredients] = useState(() =>
    meal.ingredients.map((ing, i) => ({
      key: i,
      food: foodById[ing.foodId] || null,
      quantity: ing.quantity,
      swapCategory: ing.swapCategory,
      swapping: false,
      swapQuery: '',
    })).filter(i => i.food !== null)
  );
  const [savedMsg, setSavedMsg] = useState(false);

  const total = useMemo(() => calcTotal(ingredients), [ingredients]);

  function setQty(key, delta) {
    setIngredients(prev => prev.map(i => {
      if (i.key !== key) return i;
      const next = Math.max(0.25, Math.round((i.quantity + delta) * 4) / 4);
      return { ...i, quantity: next };
    }));
  }

  function openSwap(key) {
    setIngredients(prev => prev.map(i =>
      i.key === key ? { ...i, swapping: true, swapQuery: '' } : { ...i, swapping: false }
    ));
  }

  function closeSwap(key) {
    setIngredients(prev => prev.map(i =>
      i.key === key ? { ...i, swapping: false } : i
    ));
  }

  function doSwap(key, newFood) {
    setIngredients(prev => prev.map(i =>
      i.key === key ? { ...i, food: newFood, swapping: false, swapQuery: '' } : i
    ));
  }

  function setSwapQuery(key, q) {
    setIngredients(prev => prev.map(i =>
      i.key === key ? { ...i, swapQuery: q } : i
    ));
  }

  function getSwapOptions(ing) {
    const q = ing.swapQuery.toLowerCase();
    return foods
      .filter(f => f.category === ing.swapCategory && f.id !== ing.food.id)
      .filter(f => !q || f.name.toLowerCase().includes(q))
      .slice(0, 20);
  }

  function handleLog() {
    const composite = {
      id: `custom_${crypto.randomUUID()}`,
      name: meal.name,
      servingUnit: 'serving',
      servingSizeG: 1,
      ...total,
    };
    onLog(composite, 1);
  }

  function handleSaveAndLog() {
    const composite = {
      id: `custom_${crypto.randomUUID()}`,
      name: meal.name,
      servingUnit: 'serving',
      servingSizeG: 1,
      ...total,
    };
    onSave({ name: meal.name, ...total });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
    onLog(composite, 1);
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Back + title */}
      <div className="px-4 pt-3 pb-2 flex items-center gap-2 flex-shrink-0 border-b border-[#2A2000]">
        <button onClick={onBack} className="text-[#00AAFF] text-sm font-medium">← Back</button>
        <p className="text-sm font-semibold text-[#FFD700] truncate">{meal.name}</p>
      </div>

      <div className="overflow-y-auto flex-1 p-4 space-y-2">
        {ingredients.map(ing => (
          <div key={ing.key} className="bg-[#1A1A1A] rounded-xl overflow-hidden">
            {/* Ingredient row */}
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#FFD700] truncate">{ing.food.name}</p>
                <p className="text-xs text-[#665500]">
                  {ing.quantity} × {ing.food.servingUnit} · {Math.round(ing.food.calories * ing.quantity)} kcal
                </p>
              </div>
              {/* Qty controls */}
              <div className="flex items-center gap-1">
                <button onClick={() => setQty(ing.key, -0.25)}
                  className="w-6 h-6 rounded-full bg-[#2A2A2A] hover:bg-[#333333] flex items-center justify-center text-[#CCA800] text-sm leading-none transition-colors">
                  −
                </button>
                <span className="text-xs text-[#CCA800] w-8 text-center">{ing.quantity}</span>
                <button onClick={() => setQty(ing.key, 0.25)}
                  className="w-6 h-6 rounded-full bg-[#2A2A2A] hover:bg-[#333333] flex items-center justify-center text-[#CCA800] text-sm leading-none transition-colors">
                  +
                </button>
              </div>
              {/* Swap toggle */}
              <button
                onClick={() => ing.swapping ? closeSwap(ing.key) : openSwap(ing.key)}
                className="text-xs text-[#00AAFF] font-medium px-2 py-1 rounded-lg border border-[#00AAFF]/30 hover:bg-[#001A2E] transition-colors flex-shrink-0">
                {ing.swapping ? 'Cancel' : '⇄ Swap'}
              </button>
            </div>

            {/* Swap panel */}
            {ing.swapping && (
              <div className="border-t border-[#2A2000] px-3 pb-2">
                <input
                  type="text"
                  value={ing.swapQuery}
                  onChange={e => setSwapQuery(ing.key, e.target.value)}
                  placeholder={`Search ${ing.swapCategory}…`}
                  className="w-full bg-[#141414] border border-[#3D2E00] rounded-lg px-3 py-1.5 text-sm text-[#FFD700] placeholder:text-[#665500] focus:outline-none focus:ring-2 focus:ring-[#00AAFF] my-2"
                  autoFocus
                />
                <div className="max-h-36 overflow-y-auto space-y-1">
                  {getSwapOptions(ing).length === 0 && (
                    <p className="text-xs text-[#665500] text-center py-2">No alternatives found</p>
                  )}
                  {getSwapOptions(ing).map(f => (
                    <button key={f.id} onClick={() => doSwap(ing.key, f)}
                      className="w-full flex justify-between items-center px-3 py-1.5 rounded-lg hover:bg-[#001A2E] text-left transition-colors">
                      <span className="text-sm text-[#FFD700]">{f.name}</span>
                      <span className="text-xs text-[#665500] ml-2 flex-shrink-0">{f.calories} kcal/{f.servingUnit}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Live total */}
        <div className="bg-[#001A2E] rounded-xl p-3 grid grid-cols-4 gap-1 text-center text-xs mt-2">
          <div><p className="text-[#665500]">Calories</p><p className="font-semibold text-[#FFD700]">{total.calories}</p></div>
          <div><p className="text-[#665500]">Protein</p><p className="font-semibold text-[#FFD700]">{total.proteinG}g</p></div>
          <div><p className="text-[#665500]">Carbs</p><p className="font-semibold text-[#FFD700]">{total.carbsG}g</p></div>
          <div><p className="text-[#665500]">Fat</p><p className="font-semibold text-[#FFD700]">{total.fatG}g</p></div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#2A2000] space-y-2 flex-shrink-0">
        {savedMsg && (
          <p className="text-center text-xs text-[#00FF66] font-medium">✓ Saved to My Meals</p>
        )}
        <div className="flex gap-2">
          <button onClick={handleSaveAndLog}
            className="flex-1 bg-[#1E1E1E] hover:bg-[#2A2A2A] text-[#CCA800] py-2.5 rounded-xl text-sm font-medium transition-colors">
            Save & Log
          </button>
          <button onClick={handleLog}
            className="flex-1 bg-[#00AAFF] hover:bg-[#0088DD] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
            Log to Diary
          </button>
        </div>
      </div>
    </div>
  );
}
