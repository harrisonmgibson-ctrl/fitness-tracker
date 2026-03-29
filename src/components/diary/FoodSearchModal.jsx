import { useState } from 'react';
import { createPortal } from 'react-dom';
import foods from '../../data/foodDatabase';

export default function FoodSearchModal({ mealType, onAdd, onClose }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const results = query.length > 0
    ? foods.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
    : foods;

  function handleAdd() {
    if (selected) onAdd(selected, quantity);
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70" onClick={onClose}>
      <div
        className="bg-gray-900 rounded-t-2xl w-full max-w-lg max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-800">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-white capitalize">Add to {mealType}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-xl leading-none">×</button>
          </div>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(null); }}
            placeholder="Search foods..."
            className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {!selected ? (
          <ul className="overflow-y-auto flex-1">
            {results.map(food => (
              <li key={food.id}>
                <button
                  onClick={() => { setSelected(food); setQuantity(1); }}
                  className="w-full flex justify-between items-center px-4 py-3 hover:bg-gray-800 transition-colors text-left">
                  <div>
                    <p className="text-sm text-white">{food.name}</p>
                    <p className="text-xs text-gray-500">{food.servingSizeG}{food.servingUnit === 'g' ? 'g' : ` (${food.servingUnit})`}</p>
                  </div>
                  <span className="text-sm text-gray-400">{food.calories} kcal</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 space-y-4">
            <div>
              <p className="font-medium text-white">{selected.name}</p>
              <p className="text-xs text-gray-400">{selected.calories} kcal per serving</p>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Servings</label>
              <input
                type="number" min="0.25" max="20" step="0.25"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="bg-gray-800 rounded-lg p-3 grid grid-cols-4 gap-2 text-center text-xs">
              <div><p className="text-gray-400">Calories</p><p className="text-white font-medium">{Math.round(selected.calories * quantity)}</p></div>
              <div><p className="text-gray-400">Protein</p><p className="text-white font-medium">{Math.round(selected.proteinG * quantity)}g</p></div>
              <div><p className="text-gray-400">Carbs</p><p className="text-white font-medium">{Math.round(selected.carbsG * quantity)}g</p></div>
              <div><p className="text-gray-400">Fat</p><p className="text-white font-medium">{Math.round(selected.fatG * quantity)}g</p></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSelected(null)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors">
                Back
              </button>
              <button onClick={handleAdd} className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3 rounded-lg transition-colors">
                Add to Diary
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
