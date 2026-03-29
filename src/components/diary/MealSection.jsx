import { useState } from 'react';
import DiaryEntryRow from './DiaryEntryRow';
import FoodSearchModal from './FoodSearchModal';
import { sumEntries } from '../../lib/calculations';

const MEAL_LABELS = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snacks',
};

export default function MealSection({ mealType, entries, onAdd, onRemove }) {
  const [showModal, setShowModal] = useState(false);
  const mealEntries = entries.filter(e => e.mealType === mealType);
  const total = sumEntries(mealEntries);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-semibold text-gray-300">{MEAL_LABELS[mealType]}</h2>
        <span className="text-xs text-gray-500">{total.calories} kcal</span>
      </div>
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        {mealEntries.length === 0 && (
          <p className="text-xs text-gray-600 px-3 py-2">No foods logged</p>
        )}
        {mealEntries.map(entry => (
          <DiaryEntryRow key={entry.id} entry={entry} onRemove={onRemove} />
        ))}
        <button
          onClick={() => setShowModal(true)}
          className="w-full text-left px-3 py-2 text-sm text-emerald-500 hover:text-emerald-400 transition-colors">
          + Add Food
        </button>
      </div>
      {showModal && (
        <FoodSearchModal
          mealType={mealType}
          onAdd={(food, qty) => { onAdd(mealType, food, qty); setShowModal(false); }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
