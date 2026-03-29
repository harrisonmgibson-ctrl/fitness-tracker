import { useState } from 'react';
import { createPortal } from 'react-dom';
import foods from '../../data/foodDatabase';

export default function FoodSearchModal({ mealType, onAdd, onClose }) {
  const [activeTab, setActiveTab] = useState('search');

  // Search tab state
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Quick Add tab state
  const [quickName, setQuickName] = useState('');
  const [quickCalories, setQuickCalories] = useState('');
  const [quickProtein, setQuickProtein] = useState('');
  const [quickCarbs, setQuickCarbs] = useState('');
  const [quickFat, setQuickFat] = useState('');

  const results = query.length > 0
    ? foods.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
    : foods;

  function handleAdd() {
    if (selected) onAdd(selected, quantity);
  }

  function handleQuickAdd(e) {
    e.preventDefault();
    if (!quickName || !quickCalories) return;
    const syntheticFood = {
      id: `custom_${crypto.randomUUID()}`,
      name: quickName,
      servingUnit: 'serving',
      servingSizeG: 1,
      calories: Number(quickCalories),
      proteinG: Number(quickProtein) || 0,
      carbsG: Number(quickCarbs) || 0,
      fatG: Number(quickFat) || 0,
    };
    onAdd(syntheticFood, 1);
  }

  const mealLabel = mealType.charAt(0).toUpperCase() + mealType.slice(1);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-t-2xl w-full max-w-lg max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-900 capitalize">Add to {mealLabel}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
            <button
              onClick={() => { setActiveTab('search'); setSelected(null); }}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'search' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
              Search
            </button>
            <button
              onClick={() => setActiveTab('quickadd')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'quickadd' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
              Quick Add
            </button>
          </div>
        </div>

        {/* Search Tab */}
        {activeTab === 'search' && (
          <>
            <div className="px-4 py-3 border-b border-gray-100">
              <input
                autoFocus
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setSelected(null); }}
                placeholder="Search foods..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
              />
            </div>

            {!selected ? (
              <ul className="overflow-y-auto flex-1">
                {results.map(food => (
                  <li key={food.id}>
                    <button
                      onClick={() => { setSelected(food); setQuantity(1); }}
                      className="w-full flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50">
                      <div>
                        <p className="text-sm text-gray-900">{food.name}</p>
                        <p className="text-xs text-gray-400">{food.servingSizeG}{food.servingUnit === 'g' ? 'g' : ` (${food.servingUnit})`}</p>
                      </div>
                      <span className="text-sm text-gray-500">{food.calories} kcal</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 space-y-4 overflow-y-auto">
                <div>
                  <p className="font-medium text-gray-900">{selected.name}</p>
                  <p className="text-xs text-gray-400">{selected.calories} kcal per serving</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Servings</label>
                  <input
                    type="number" min="0.25" max="20" step="0.25"
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
                  />
                </div>
                <div className="bg-gray-50 rounded-xl p-3 grid grid-cols-4 gap-2 text-center text-xs">
                  <div><p className="text-gray-400">Calories</p><p className="text-gray-900 font-medium">{Math.round(selected.calories * quantity)}</p></div>
                  <div><p className="text-gray-400">Protein</p><p className="text-gray-900 font-medium">{Math.round(selected.proteinG * quantity)}g</p></div>
                  <div><p className="text-gray-400">Carbs</p><p className="text-gray-900 font-medium">{Math.round(selected.carbsG * quantity)}g</p></div>
                  <div><p className="text-gray-400">Fat</p><p className="text-gray-900 font-medium">{Math.round(selected.fatG * quantity)}g</p></div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setSelected(null)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl transition-colors font-medium">
                    Back
                  </button>
                  <button onClick={handleAdd} className="flex-1 bg-[#0066EE] hover:bg-[#0052BE] text-white font-semibold py-3 rounded-xl transition-colors">
                    Add to Diary
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Quick Add Tab */}
        {activeTab === 'quickadd' && (
          <form onSubmit={handleQuickAdd} className="p-4 space-y-3 overflow-y-auto flex-1">
            <div>
              <label className="text-sm text-gray-500 block mb-1">Food / Meal Name <span className="text-red-400">*</span></label>
              <input
                autoFocus
                type="text"
                value={quickName}
                onChange={e => setQuickName(e.target.value)}
                placeholder="e.g. Chicken sandwich"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">Calories <span className="text-red-400">*</span></label>
              <input
                type="number" min="0" required
                value={quickCalories}
                onChange={e => setQuickCalories(e.target.value)}
                placeholder="e.g. 450"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
              />
            </div>
            <p className="text-xs text-gray-400 pt-1">Optional macros</p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Protein (g)</label>
                <input
                  type="number" min="0" step="0.1"
                  value={quickProtein}
                  onChange={e => setQuickProtein(e.target.value)}
                  placeholder="0"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Carbs (g)</label>
                <input
                  type="number" min="0" step="0.1"
                  value={quickCarbs}
                  onChange={e => setQuickCarbs(e.target.value)}
                  placeholder="0"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Fat (g)</label>
                <input
                  type="number" min="0" step="0.1"
                  value={quickFat}
                  onChange={e => setQuickFat(e.target.value)}
                  placeholder="0"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={!quickName || !quickCalories}
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
