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

export default function MealSection({ mealType, entries, onAdd, onRemove, onEdit }) {
  const [showModal, setShowModal] = useState(false);
  const mealEntries = entries.filter(e => e.mealType === mealType);
  const total = sumEntries(mealEntries);

  return (
    <div className="mb-3">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-50 sticky top-0 bg-white z-10">
          <h2 className="font-semibold text-gray-800">{MEAL_LABELS[mealType]}</h2>
          <span className="text-xs text-gray-400">{total.calories} kcal</span>
        </div>
        {mealEntries.length === 0 && (
          <p className="text-xs text-gray-400 px-4 py-2">No foods logged</p>
        )}
        {mealEntries.map(entry => (
          <DiaryEntryRow key={entry.id} entry={entry} onRemove={onRemove} onEdit={onEdit} />
        ))}
        <button
          onClick={() => setShowModal(true)}
          className="w-full text-left px-4 py-2.5 text-sm text-[#0066EE] hover:bg-gray-50 transition-colors font-medium">
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
