import { useState } from 'react';
import { sumEntries } from '../../lib/calculations';
import DiaryEntryRow from '../diary/DiaryEntryRow';
import FoodSearchModal from '../diary/FoodSearchModal';

const MEAL_LABELS = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snacks',
};

export default function MealSummaryCard({ mealType, entries, onAdd, onRemove, onEdit }) {
  const [showModal, setShowModal] = useState(false);
  const mealEntries = entries.filter(e => e.mealType === mealType);
  const total = sumEntries(mealEntries);

  return (
    <div className="bg-[#141414] rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2000]">
        <h3 className="font-semibold text-[#FFD700] text-sm">{MEAL_LABELS[mealType]}</h3>
        <span className="text-xs text-[#665500]">{total.calories} kcal</span>
      </div>
      {mealEntries.length === 0 && (
        <p className="text-xs text-[#665500] px-4 py-2">No foods logged</p>
      )}
      {mealEntries.map(entry => (
        <DiaryEntryRow key={entry.id} entry={entry} onRemove={onRemove} onEdit={onEdit} />
      ))}
      <button
        onClick={() => setShowModal(true)}
        className="w-full text-left px-4 py-2.5 text-sm text-[#00AAFF] hover:bg-[#1A1A1A] transition-colors font-medium">
        + Log Food
      </button>
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
