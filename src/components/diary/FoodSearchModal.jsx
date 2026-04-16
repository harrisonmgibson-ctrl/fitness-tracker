import { useState } from 'react';
import { createPortal } from 'react-dom';
import foods from '../../data/foodDatabase';
import preMeals from '../../data/mealDatabase';
import { useSavedMeals } from '../../hooks/useSavedMeals';
import { useRecents } from '../../hooks/useRecents';
import MealCustomiser from './MealCustomiser';

const TABS = [
  { id: 'build', label: 'Build Meal' },
  { id: 'mymeals', label: 'My Meals' },
  { id: 'search', label: 'Search' },
  { id: 'quickadd', label: 'Quick Add' },
];

const MEAL_LABEL = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snacks' };

export default function FoodSearchModal({ mealType, onAdd, onClose }) {
  const [activeTab, setActiveTab] = useState('build');
  const { meals: savedMeals, addMeal: saveToMyMeals, removeMeal } = useSavedMeals();
  const { recents, pushRecent } = useRecents();

  // ── Build Meal state ─────────────────────────────────────────────────────────
  const [mealName, setMealName] = useState('');
  const [ingredients, setIngredients] = useState([]); // [{food, quantity}]
  const [ingQuery, setIngQuery] = useState('');
  const [ingSelected, setIngSelected] = useState(null);
  const [ingQty, setIngQty] = useState(1);
  const [savedMsg, setSavedMsg] = useState(false);

  const ingResults = ingQuery.length > 0
    ? foods.filter(f => f.name.toLowerCase().includes(ingQuery.toLowerCase())).slice(0, 20)
    : [];

  const mealTotal = ingredients.reduce((acc, { food, quantity }) => ({
    calories: acc.calories + Math.round(food.calories * quantity),
    proteinG: Math.round((acc.proteinG + food.proteinG * quantity) * 10) / 10,
    carbsG: Math.round((acc.carbsG + food.carbsG * quantity) * 10) / 10,
    fatG: Math.round((acc.fatG + food.fatG * quantity) * 10) / 10,
  }), { calories: 0, proteinG: 0, carbsG: 0, fatG: 0 });

  function addIngredient() {
    if (!ingSelected) return;
    setIngredients(prev => [...prev, { food: ingSelected, quantity: ingQty, key: crypto.randomUUID() }]);
    setIngSelected(null);
    setIngQuery('');
    setIngQty(1);
  }

  function removeIngredient(key) {
    setIngredients(prev => prev.filter(i => i.key !== key));
  }

  function handleAddMeal() {
    if (ingredients.length === 0) return;
    const composite = {
      id: `meal_${crypto.randomUUID()}`,
      name: mealName.trim() || 'Custom Meal',
      servingUnit: 'serving',
      servingSizeG: 1,
      ...mealTotal,
    };
    onAdd(composite, 1);
  }

  function handleSaveMeal() {
    if (ingredients.length === 0) return;
    saveToMyMeals({
      name: mealName.trim() || 'Custom Meal',
      ...mealTotal,
    });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  }

  function handleSaveAndAdd() {
    handleSaveMeal();
    handleAddMeal();
  }

  // ── My Meals state ───────────────────────────────────────────────────────────
  const [mealQuery, setMealQuery] = useState('');
  const [customising, setCustomising] = useState(null); // meal being customised

  function mealFilter(list) {
    if (!mealQuery) return list;
    return list.filter(m => m.name.toLowerCase().includes(mealQuery.toLowerCase()));
  }

  function addPreBuiltMeal(meal) {
    const food = {
      id: meal.id,
      name: meal.name,
      servingUnit: 'serving',
      servingSizeG: 1,
      calories: meal.calories,
      proteinG: meal.proteinG,
      carbsG: meal.carbsG,
      fatG: meal.fatG,
    };
    onAdd(food, 1);
  }

  // ── Search tab state ─────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSelected, setSearchSelected] = useState(null);
  const [searchQty, setSearchQty] = useState(1);

  const searchResults = searchQuery.length > 0
    ? foods.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 30)
    : foods.slice(0, 30);

  function handleSearchAdd() {
    if (!searchSelected) return;
    pushRecent(searchSelected);
    onAdd(searchSelected, searchQty);
  }

  // ── Quick Add state ──────────────────────────────────────────────────────────
  const [qName, setQName] = useState('');
  const [qCal, setQCal] = useState('');
  const [qProtein, setQProtein] = useState('');
  const [qCarbs, setQCarbs] = useState('');
  const [qFat, setQFat] = useState('');
  const [qFiber, setQFiber] = useState('');

  function handleQuickAdd(e) {
    e.preventDefault();
    if (!qName || !qCal) return;
    onAdd({
      id: `custom_${crypto.randomUUID()}`,
      name: qName,
      servingUnit: 'serving',
      servingSizeG: 1,
      calories: Number(qCal),
      proteinG: Number(qProtein) || 0,
      carbsG: Number(qCarbs) || 0,
      fatG: Number(qFat) || 0,
      fiberG: Number(qFiber) || 0,
    }, 1);
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70" onClick={onClose}>
      <div
        className="bg-[#141414] rounded-t-2xl w-full max-w-lg h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="p-4 border-b border-[#2A2000] flex-shrink-0">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-[#FFD700]">Add to {MEAL_LABEL[mealType]}</h2>
            <button onClick={onClose} className="text-[#665500] hover:text-[#CCA800] text-2xl leading-none">×</button>
          </div>
          {/* Tabs */}
          <div className="flex bg-[#1E1E1E] rounded-xl p-1 gap-1">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${activeTab === t.id ? 'bg-[#2A2A2A] text-[#FFD700] shadow-sm' : 'text-[#997700]'}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── BUILD MEAL ──────────────────────────────────────────────────────── */}
        {activeTab === 'build' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-4 space-y-3 flex-shrink-0 border-b border-[#2A2000]">
              <input
                type="text" value={mealName} onChange={e => setMealName(e.target.value)}
                placeholder="Name your meal (e.g. Chicken Rice Bowl)"
                className="w-full bg-[#1A1A1A] border border-[#3D2E00] rounded-xl px-4 py-2.5 text-[#FFD700] placeholder:text-[#665500] focus:outline-none focus:ring-2 focus:ring-[#00AAFF] text-sm"
              />
            </div>

            {/* Ingredient list */}
            <div className="overflow-y-auto flex-1 p-4 space-y-2">
              {ingredients.length === 0 && (
                <p className="text-xs text-[#665500] text-center py-2">Search below to add ingredients</p>
              )}
              {ingredients.map(({ food, quantity, key }) => (
                <div key={key} className="flex items-center justify-between bg-[#1A1A1A] rounded-xl px-3 py-2">
                  <div>
                    <p className="text-sm text-[#FFD700]">{food.name}</p>
                    <p className="text-xs text-[#665500]">{quantity} × {food.servingUnit} · {Math.round(food.calories * quantity)} kcal</p>
                  </div>
                  <button onClick={() => removeIngredient(key)} className="text-[#665500] hover:text-[#FF2233] text-xl leading-none ml-3">×</button>
                </div>
              ))}

              {/* Running total */}
              {ingredients.length > 0 && (
                <div className="bg-[#001A2E] rounded-xl p-3 grid grid-cols-4 gap-1 text-center text-xs mt-2">
                  <div><p className="text-[#665500]">Calories</p><p className="font-semibold text-[#FFD700]">{mealTotal.calories}</p></div>
                  <div><p className="text-[#665500]">Protein</p><p className="font-semibold text-[#FFD700]">{mealTotal.proteinG}g</p></div>
                  <div><p className="text-[#665500]">Carbs</p><p className="font-semibold text-[#FFD700]">{mealTotal.carbsG}g</p></div>
                  <div><p className="text-[#665500]">Fat</p><p className="font-semibold text-[#FFD700]">{mealTotal.fatG}g</p></div>
                </div>
              )}

              {/* Ingredient search */}
              <div className="pt-2 space-y-2">
                <p className="text-xs font-medium text-[#997700] uppercase tracking-wide">Add Ingredient</p>
                <input
                  type="text" value={ingQuery} onChange={e => { setIngQuery(e.target.value); setIngSelected(null); }}
                  placeholder="Search ingredients..."
                  className="w-full bg-[#1A1A1A] border border-[#3D2E00] rounded-xl px-4 py-2.5 text-[#FFD700] placeholder:text-[#665500] focus:outline-none focus:ring-2 focus:ring-[#00AAFF] text-sm"
                />

                {/* Ingredient search results */}
                {ingQuery.length > 0 && !ingSelected && (
                  <div className="bg-[#1E1E1E] border border-[#2A2000] rounded-xl overflow-hidden shadow-sm">
                    {ingResults.length === 0 && (
                      <p className="text-xs text-[#665500] p-3 text-center">No results</p>
                    )}
                    {ingResults.map(food => (
                      <button key={food.id} onClick={() => setIngSelected(food)}
                        className="w-full flex justify-between px-4 py-2.5 hover:bg-[#2A2A2A] border-b border-[#2A2000] last:border-0 text-left">
                        <span className="text-sm text-[#FFD700]">{food.name}</span>
                        <span className="text-xs text-[#665500]">{food.calories} kcal</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Quantity picker for selected ingredient */}
                {ingSelected && (
                  <div className="bg-[#1A1A1A] rounded-xl p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[#FFD700]">{ingSelected.name}</span>
                      <button onClick={() => setIngSelected(null)} className="text-[#997700] text-sm">Change</button>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-xs text-[#997700]">Servings:</label>
                      <input type="number" min="0.25" max="20" step="0.25" value={ingQty}
                        onChange={e => setIngQty(Number(e.target.value))}
                        className="w-24 bg-[#141414] border border-[#3D2E00] rounded-lg px-3 py-1.5 text-sm text-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#00AAFF]"
                      />
                      <span className="text-xs text-[#665500]">{Math.round(ingSelected.calories * ingQty)} kcal</span>
                    </div>
                    <button onClick={addIngredient}
                      className="w-full bg-[#00AAFF] hover:bg-[#0088DD] text-white text-sm font-medium py-2 rounded-xl transition-colors">
                      + Add to Meal
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer actions */}
            {ingredients.length > 0 && (
              <div className="p-4 border-t border-[#2A2000] space-y-2 flex-shrink-0">
                {savedMsg && (
                  <p className="text-center text-xs text-[#00FF66] font-medium">✓ Saved to My Meals</p>
                )}
                <div className="flex gap-2">
                  <button onClick={handleSaveMeal}
                    className="flex-1 bg-[#1E1E1E] hover:bg-[#2A2A2A] text-[#CCA800] py-2.5 rounded-xl text-sm font-medium transition-colors">
                    Save to My Meals
                  </button>
                  <button onClick={handleAddMeal}
                    className="flex-1 bg-[#00AAFF] hover:bg-[#0088DD] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                    Add to Diary
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── MY MEALS ────────────────────────────────────────────────────────── */}
        {activeTab === 'mymeals' && (
          customising ? (
            <MealCustomiser
              meal={customising}
              onLog={(food, qty) => { onAdd(food, qty); setCustomising(null); }}
              onSave={saveToMyMeals}
              onBack={() => setCustomising(null)}
            />
          ) : (
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="p-4 flex-shrink-0">
                <input type="text" value={mealQuery} onChange={e => setMealQuery(e.target.value)}
                  placeholder="Search meals..."
                  className="w-full bg-[#1A1A1A] border border-[#3D2E00] rounded-xl px-4 py-2.5 text-[#FFD700] placeholder:text-[#665500] focus:outline-none focus:ring-2 focus:ring-[#00AAFF] text-sm"
                />
              </div>
              <div className="overflow-y-auto flex-1 px-4 pb-4 space-y-4">

                {/* Saved meals */}
                {savedMeals.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-[#997700] uppercase tracking-wide mb-2">My Saved Meals</p>
                    <div className="space-y-2">
                      {mealFilter(savedMeals).map(meal => (
                        <MealRow key={meal.id} meal={meal} onAdd={() => addPreBuiltMeal(meal)}
                          onDelete={() => removeMeal(meal.id)} showDelete />
                      ))}
                    </div>
                  </div>
                )}

                {/* Pre-built meals grouped by category */}
                {['Breakfast', 'Lunch', 'Dinner'].map(cat => {
                  const filtered = mealFilter(preMeals.filter(m => m.category === cat));
                  if (filtered.length === 0) return null;
                  return (
                    <div key={cat}>
                      <p className="text-xs font-medium text-[#997700] uppercase tracking-wide mb-2">{cat}</p>
                      <div className="space-y-2">
                        {filtered.map(meal => (
                          <MealRow
                            key={meal.id}
                            meal={meal}
                            onAdd={() => addPreBuiltMeal(meal)}
                            onCustomise={meal.ingredients ? () => setCustomising(meal) : null}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}

                {savedMeals.length === 0 && mealFilter(preMeals).length === 0 && (
                  <p className="text-sm text-[#665500] text-center py-4">No meals found</p>
                )}
              </div>
            </div>
          )
        )}

        {/* ── SEARCH ──────────────────────────────────────────────────────────── */}
        {activeTab === 'search' && (
          <>
            <div className="px-4 py-3 border-b border-[#2A2000] flex-shrink-0">
              <input autoFocus type="text" value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setSearchSelected(null); }}
                placeholder="Search foods..."
                className="w-full bg-[#1A1A1A] border border-[#3D2E00] rounded-xl px-4 py-2.5 text-[#FFD700] placeholder:text-[#665500] focus:outline-none focus:ring-2 focus:ring-[#00AAFF] text-sm"
              />
            </div>

            {!searchSelected ? (
              <ul className="overflow-y-auto flex-1">
                {/* Recently used — shown when search is empty */}
                {searchQuery === '' && recents.length > 0 && (
                  <>
                    <li className="px-4 pt-3 pb-1">
                      <p className="text-xs font-medium text-[#665500] uppercase tracking-wide">Recently Used</p>
                    </li>
                    {recents.slice(0, 8).map(r => {
                      const food = { id: r.foodId, name: r.foodName, servingUnit: r.servingUnit, servingSizeG: r.servingSizeG, calories: r.calories, proteinG: r.proteinG, carbsG: r.carbsG, fatG: r.fatG, fiberG: r.fiberG };
                      return (
                        <li key={r.foodId}>
                          <button onClick={() => { setSearchSelected(food); setSearchQty(1); }}
                            className="w-full flex justify-between items-center px-4 py-3 hover:bg-[#1A1A1A] border-b border-[#2A2000] text-left">
                            <div>
                              <p className="text-sm text-[#FFD700]">{r.foodName}</p>
                              <p className="text-xs text-[#665500]">{r.servingUnit}</p>
                            </div>
                            <span className="text-sm text-[#997700]">{r.calories} kcal</span>
                          </button>
                        </li>
                      );
                    })}
                    <li className="px-4 pt-3 pb-1">
                      <p className="text-xs font-medium text-[#665500] uppercase tracking-wide">All Foods</p>
                    </li>
                  </>
                )}
                {searchResults.map(food => (
                  <li key={food.id}>
                    <button onClick={() => { setSearchSelected(food); setSearchQty(1); }}
                      className="w-full flex justify-between items-center px-4 py-3 hover:bg-[#1A1A1A] border-b border-[#2A2000] text-left">
                      <div>
                        <p className="text-sm text-[#FFD700]">{food.name}</p>
                        <p className="text-xs text-[#665500]">{food.servingSizeG}{food.servingUnit === 'g' || food.servingUnit === 'ml' ? food.servingUnit : ` (${food.servingUnit})`}</p>
                      </div>
                      <span className="text-sm text-[#997700]">{food.calories} kcal</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 space-y-4 overflow-y-auto flex-1">
                <div>
                  <p className="font-medium text-[#FFD700]">{searchSelected.name}</p>
                  <p className="text-xs text-[#665500]">{searchSelected.calories} kcal per {searchSelected.servingUnit}</p>
                </div>
                <div>
                  <label className="text-sm text-[#997700] block mb-1">Servings</label>
                  <input type="number" min="0.25" max="20" step="0.25" value={searchQty}
                    onChange={e => setSearchQty(Number(e.target.value))}
                    className="w-full bg-[#1A1A1A] border border-[#3D2E00] rounded-xl px-4 py-2.5 text-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#00AAFF]"
                  />
                </div>
                <div className="bg-[#1A1A1A] rounded-xl p-3 grid grid-cols-4 gap-2 text-center text-xs">
                  <div><p className="text-[#665500]">Calories</p><p className="font-medium text-[#FFD700]">{Math.round(searchSelected.calories * searchQty)}</p></div>
                  <div><p className="text-[#665500]">Protein</p><p className="font-medium text-[#FFD700]">{Math.round(searchSelected.proteinG * searchQty)}g</p></div>
                  <div><p className="text-[#665500]">Carbs</p><p className="font-medium text-[#FFD700]">{Math.round(searchSelected.carbsG * searchQty)}g</p></div>
                  <div><p className="text-[#665500]">Fat</p><p className="font-medium text-[#FFD700]">{Math.round(searchSelected.fatG * searchQty)}g</p></div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setSearchSelected(null)} className="flex-1 bg-[#1E1E1E] hover:bg-[#2A2A2A] text-[#CCA800] py-3 rounded-xl font-medium">
                    Back
                  </button>
                  <button onClick={handleSearchAdd} className="flex-1 bg-[#00AAFF] hover:bg-[#0088DD] text-white font-semibold py-3 rounded-xl transition-colors">
                    Add to Diary
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── QUICK ADD ───────────────────────────────────────────────────────── */}
        {activeTab === 'quickadd' && (
          <form onSubmit={handleQuickAdd} className="p-4 space-y-3 overflow-y-auto flex-1">
            <div>
              <label className="text-sm text-[#997700] block mb-1">Food / Meal Name <span className="text-[#FF2233]">*</span></label>
              <input autoFocus type="text" value={qName} onChange={e => setQName(e.target.value)}
                placeholder="e.g. Chicken sandwich" required
                className="w-full bg-[#1A1A1A] border border-[#3D2E00] rounded-xl px-4 py-2.5 text-[#FFD700] placeholder:text-[#665500] focus:outline-none focus:ring-2 focus:ring-[#00AAFF]"
              />
            </div>
            <div>
              <label className="text-sm text-[#997700] block mb-1">Calories <span className="text-[#FF2233]">*</span></label>
              <input type="number" min="0" required value={qCal} onChange={e => setQCal(e.target.value)}
                placeholder="e.g. 450"
                className="w-full bg-[#1A1A1A] border border-[#3D2E00] rounded-xl px-4 py-2.5 text-[#FFD700] placeholder:text-[#665500] focus:outline-none focus:ring-2 focus:ring-[#00AAFF]"
              />
            </div>
            <p className="text-xs text-[#665500] pt-1">Optional macros</p>
            <div className="grid grid-cols-4 gap-2">
              {[['Protein (g)', qProtein, setQProtein], ['Carbs (g)', qCarbs, setQCarbs], ['Fat (g)', qFat, setQFat], ['Fiber (g)', qFiber, setQFiber]].map(([label, val, set]) => (
                <div key={label}>
                  <label className="text-xs text-[#997700] block mb-1">{label}</label>
                  <input type="number" min="0" step="0.1" value={val} onChange={e => set(e.target.value)} placeholder="0"
                    className="w-full bg-[#1A1A1A] border border-[#3D2E00] rounded-xl px-3 py-2 text-[#FFD700] placeholder:text-[#665500] text-sm focus:outline-none focus:ring-2 focus:ring-[#00AAFF]"
                  />
                </div>
              ))}
            </div>
            <button type="submit" disabled={!qName || !qCal}
              className="w-full bg-[#00AAFF] hover:bg-[#0088DD] disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-colors mt-2">
              Add to Diary
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}

function MealRow({ meal, onAdd, onDelete, onCustomise, showDelete }) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl px-3 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#FFD700] truncate">{meal.name}</p>
          <p className="text-xs text-[#665500]">
            {meal.calories} kcal · P {meal.proteinG}g · C {meal.carbsG}g · F {meal.fatG}g
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {showDelete && (
            <button onClick={onDelete} className="text-[#665500] hover:text-[#FF2233] text-lg leading-none px-1">×</button>
          )}
          {onCustomise && (
            <button onClick={onCustomise}
              className="border border-[#00AAFF] text-[#00AAFF] hover:bg-[#001A2E] text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors">
              Customise
            </button>
          )}
          <button onClick={onAdd}
            className="bg-[#00AAFF] hover:bg-[#0088DD] text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
