import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDiary } from '../../hooks/useDiary';
import { useWeightLog } from '../../hooks/useWeightLog';
import { toISODate } from '../../lib/dateUtils';
import FoodSearchModal from '../diary/FoodSearchModal';

const MEALS = ['breakfast', 'lunch', 'dinner', 'snack'];
const MEAL_LABELS = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snacks' };

export default function FABModal({ onClose }) {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showWeightForm, setShowWeightForm] = useState(false);
  const [weightInput, setWeightInput] = useState('');
  const { addEntry } = useDiary(toISODate());
  const { addWeight } = useWeightLog();

  function handleLogWeight(e) {
    e.preventDefault();
    if (weightInput) {
      addWeight(Number(weightInput));
      onClose();
    }
  }

  if (selectedMeal) {
    return (
      <FoodSearchModal
        mealType={selectedMeal}
        onAdd={(food, qty) => { addEntry(selectedMeal, food, qty); onClose(); }}
        onClose={() => setSelectedMeal(null)}
      />
    );
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-[#141414] rounded-t-2xl w-full max-w-lg p-5"
        onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-[#FFD700] text-base">Quick Add</h2>
          <button onClick={onClose} className="text-[#665500] hover:text-[#CCA800] text-2xl leading-none">×</button>
        </div>

        {!showWeightForm ? (
          <>
            <p className="text-xs text-[#997700] mb-2 uppercase tracking-wide font-medium">Log Food</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {MEALS.map(meal => (
                <button
                  key={meal}
                  onClick={() => setSelectedMeal(meal)}
                  className="bg-[#1E1E1E] hover:bg-[#2A2A2A] rounded-xl py-3 text-sm font-medium text-[#CCA800] transition-colors">
                  {MEAL_LABELS[meal]}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowWeightForm(true)}
              className="w-full bg-[#1E1E1E] hover:bg-[#2A2A2A] rounded-xl py-3 text-sm font-medium text-[#CCA800] transition-colors">
              ⚖️ Log Weight
            </button>
          </>
        ) : (
          <form onSubmit={handleLogWeight} className="space-y-3">
            <p className="text-xs text-[#997700] uppercase tracking-wide font-medium">Log Weight</p>
            <input
              autoFocus
              type="number" step="0.1" min="30" max="300"
              value={weightInput}
              onChange={e => setWeightInput(e.target.value)}
              placeholder="Weight (kg)"
              className="w-full bg-[#1A1A1A] border border-[#3D2E00] rounded-xl px-4 py-3 text-[#FFD700] placeholder:text-[#665500] focus:outline-none focus:ring-2 focus:ring-[#00AAFF]"
            />
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowWeightForm(false)}
                className="flex-1 bg-[#1E1E1E] text-[#CCA800] py-3 rounded-xl font-medium">
                Back
              </button>
              <button type="submit"
                className="flex-1 bg-[#00AAFF] text-white py-3 rounded-xl font-semibold hover:bg-[#0088DD] transition-colors">
                Log
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
