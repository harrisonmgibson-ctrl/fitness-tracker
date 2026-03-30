import { useState } from 'react';
import { createPortal } from 'react-dom';
import foods from '../../data/foodDatabase';
import preMeals from '../../data/mealDatabase';
import { useSavedMeals } from '../../hooks/useSavedMeals';
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
    if (searchSelected) onAdd(searchSelected, searchQty);
  }

  // ── Quick Add state ──────────────────────────────────────────────────────────
  const [qName, setQName] = useState('');
  const [qCal, setQCal] = useState('');
  const [qProtein, setQProtein] = useState('');
  const [qCarbs, setQCarbs] = useState('');
  const [qFat, setQFat] = useState('');

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
    }, 1);
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-t-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-900">Add to {MEAL_LABEL[mealType]}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${activeTab === t.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── BUILD MEAL ──────────────────────────────────────────────────────── */}
        {activeTab === 'build' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-4 space-y-3 flex-shrink-0 border-b border-gray-50">
              <input
                type="text" value={mealName} onChange={e => setMealName(e.target.value)}
                placeholder="Name your meal (e.g. Chicken Rice Bowl)"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066EE] text-sm"
              />
            </div>

            {/* Ingredient list */}
            <div className="overflow-y-auto flex-1 p-4 space-y-2">
              {ingredients.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-2">Search below to add ingredients</p>
              )}
              {ingredients.map(({ food, quantity, key }) => (
                <div key={key} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                  <div>
                    <p className="text-sm text-gray-900">{food.name}</p>
                    <p className="text-xs text-gray-400">{quantity} × {food.servingUnit} · {Math.round(food.calories * quantity)} kcal</p>
                  </div>
                  <button onClick={() => removeIngredient(key)} className="text-gray-300 hover:text-red-400 text-xl leading-none ml-3">×</button>
                </div>
              ))}

              {/* Running total */}
              {ingredients.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-3 grid grid-cols-4 gap-1 text-center text-xs mt-2">
                  <div><p className="text-gray-400">Calories</p><p className="font-semibold text-gray-900">{mealTotal.calories}</p></div>
                  <div><p className="text-gray-400">Protein</p><p className="font-semibold text-gray-900">{mealTotal.proteinG}g</p></div>
                  <div><p className="text-gray-400">Carbs</p><p className="font-semibold text-gray-900">{mealTotal.carbsG}g</p></div>
                  <div><p className="text-gray-400">Fat</p><p className="font-semibold text-gray-900">{mealTotal.fatG}g</p></div>
                </div>
              )}

              {/* Ingredient search */}
              <div className="pt-2 space-y-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Add Ingredient</p>
                <input
                  type="text" value={ingQuery} onChange={e => { setIngQuery(e.target.value); setIngSelected(null); }}
                  placeholder="Search ingredients..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066EE] text-sm"
                />

                {/* Ingredient search results */}
                {ingQuery.length > 0 && !ingSelected && (
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    {ingResults.length === 0 && (
                      <p className="text-xs text-gray-400 p-3 text-center">No results</p>
                    )}
                    {ingResults.map(food => (
                      <button key={food.id} onClick={() => setIngSelected(food)}
                        className="w-full flex justify-between px-4 py-2.5 hover:bg-gray-50 border-b border-gray-50 last:border-0 text-left">
                        <span className="text-sm text-gray-900">{food.name}</span>
                        <span className="text-xs text-gray-400">{food.calories} kcal</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Quantity picker for selected ingredient */}
                {ingSelected && (
                  <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-800">{ingSelected.name}</span>
                      <button onClick={() => setIngSelected(null)} className="text-gray-400 text-sm">Change</button>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-xs text-gray-500">Servings:</label>
                      <input type="number" min="0.25" max="20" step="0.25" value={ingQty}
                        onChange={e => setIngQty(Number(e.target.value))}
                        className="w-24 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
                      />
                      <span className="text-xs text-gray-400">{Math.round(ingSelected.calories * ingQty)} kcal</span>
                    </div>
                    <button onClick={addIngredient}
                      className="w-full bg-[#0066EE] hover:bg-[#0052BE] text-white text-sm font-medium py-2 rounded-xl transition-colors">
                      + Add to Meal
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer actions */}
            {ingredients.length > 0 && (
              <div className="p-4 border-t border-gray-100 space-y-2 flex-shrink-0">
                {savedMsg && (
                  <p className="text-center text-xs text-green-600 font-medium">✓ Saved to My Meals</p>
                )}
                <div className="flex gap-2">
                  <button onClick={handleSaveMeal}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium transition-colors">
                    Save to My Meals
                  </button>
                  <button onClick={handleAddMeal}
                    className="flex-1 bg-[#0066EE] hover:bg-[#0052BE] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
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
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066EE] text-sm"
                />
              </div>
              <div className="overflow-y-auto flex-1 px-4 pb-4 space-y-4">

                {/* Saved meals */}
                {savedMeals.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">My Saved Meals</p>
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
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">{cat}</p>
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
                  <p className="text-sm text-gray-400 text-center py-4">No meals found</p>
                )}
              </div>
            </div>
          )
        )}

        {/* ── SEARCH ──────────────────────────────────────────────────────────── */}
        {activeTab === 'search' && (
          <>
            <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
              <input autoFocus type="text" value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setSearchSelected(null); }}
                placeholder="Search foods..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066EE] text-sm"
              />
            </div>

            {!searchSelected ? (
              <ul className="overflow-y-auto flex-1">
                {searchResults.map(food => (
                  <li key={food.id}>
                    <button onClick={() => { setSearchSelected(food); setSearchQty(1); }}
                      className="w-full flex justify-between items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-50 text-left">
                      <div>
                        <p className="text-sm text-gray-900">{food.name}</p>
                        <p className="text-xs text-gray-400">{food.servingSizeG}{food.servingUnit === 'g' || food.servingUnit === 'ml' ? food.servingUnit : ` (${food.servingUnit})`}</p>
                      </div>
                      <span className="text-sm text-gray-500">{food.calories} kcal</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 space-y-4 overflow-y-auto flex-1">
                <div>
                  <p className="font-medium text-gray-900">{searchSelected.name}</p>
                  <p className="text-xs text-gray-400">{searchSelected.calories} kcal per {searchSelected.servingUnit}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Servings</label>
                  <input type="number" min="0.25" max="20" step="0.25" value={searchQty}
                    onChange={e => setSearchQty(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
                  />
                </div>
                <div className="bg-gray-50 rounded-xl p-3 grid grid-cols-4 gap-2 text-center text-xs">
                  <div><p className="text-gray-400">Calories</p><p className="font-medium">{Math.round(searchSelected.calories * searchQty)}</p></div>
                  <div><p className="text-gray-400">Protein</p><p className="font-medium">{Math.round(searchSelected.proteinG * searchQty)}g</p></div>
                  <div><p className="text-gray-400">Carbs</p><p className="font-medium">{Math.round(searchSelected.carbsG * searchQty)}g</p></div>
                  <div><p className="text-gray-400">Fat</p><p className="font-medium">{Math.round(searchSelected.fatG * searchQty)}g</p></div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setSearchSelected(null)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium">
                    Back
                  </button>
                  <button onClick={handleSearchAdd} className="flex-1 bg-[#0066EE] hover:bg-[#0052BE] text-white font-semibold py-3 rounded-xl transition-colors">
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
              <label className="text-sm text-gray-500 block mb-1">Food / Meal Name <span className="text-red-400">*</span></label>
              <input autoFocus type="text" value={qName} onChange={e => setQName(e.target.value)}
                placeholder="e.g. Chicken sandwich" required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">Calories <span className="text-red-400">*</span></label>
              <input type="number" min="0" required value={qCal} onChange={e => setQCal(e.target.value)}
                placeholder="e.g. 450"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
              />
            </div>
            <p className="text-xs text-gray-400 pt-1">Optional macros</p>
            <div className="grid grid-cols-3 gap-2">
              {[['Protein (g)', qProtein, setQProtein], ['Carbs (g)', qCarbs, setQCarbs], ['Fat (g)', qFat, setQFat]].map(([label, val, set]) => (
                <div key={label}>
                  <label className="text-xs text-gray-500 block mb-1">{label}</label>
                  <input type="number" min="0" step="0.1" value={val} onChange={e => set(e.target.value)} placeholder="0"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
                  />
                </div>
              ))}
            </div>
            <button type="submit" disabled={!qName || !qCal}
              className="w-full bg-[#0066EE] hover:bg-[#0052BE] disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-colors mt-2">
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
    <div className="bg-gray-50 rounded-xl px-3 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900 truncate">{meal.name}</p>
          <p className="text-xs text-gray-400">
            {meal.calories} kcal · P {meal.proteinG}g · C {meal.carbsG}g · F {meal.fatG}g
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {showDelete && (
            <button onClick={onDelete} className="text-gray-300 hover:text-red-400 text-lg leading-none px-1">×</button>
          )}
          {onCustomise && (
            <button onClick={onCustomise}
              className="border border-[#0066EE] text-[#0066EE] hover:bg-blue-50 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors">
              Customise
            </button>
          )}
          <button onClick={onAdd}
            className="bg-[#0066EE] hover:bg-[#0052BE] text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
