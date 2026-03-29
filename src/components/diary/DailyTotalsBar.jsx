export default function DailyTotalsBar({ totals, goals }) {
  if (!goals) return null;
  const { calorieGoal, macroTargets } = goals;
  const remaining = calorieGoal - totals.calories;
  const over = remaining < 0;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-10">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Calories</span>
            <span className={`text-sm font-semibold ${over ? 'text-red-400' : 'text-white'}`}>
              {totals.calories} / {calorieGoal} kcal
              {over ? ` (${Math.abs(remaining)} over)` : ` (${remaining} left)`}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5 mb-3">
            <div
              className={`h-1.5 rounded-full transition-all ${over ? 'bg-red-500' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min((totals.calories / calorieGoal) * 100, 100)}%` }}
            />
          </div>
          <div className="flex gap-4 text-xs">
            {[
              { label: 'Protein', value: totals.proteinG, target: macroTargets.proteinG, color: 'text-blue-400' },
              { label: 'Carbs', value: totals.carbsG, target: macroTargets.carbsG, color: 'text-yellow-400' },
              { label: 'Fat', value: totals.fatG, target: macroTargets.fatG, color: 'text-orange-400' },
            ].map(m => (
              <div key={m.label} className="flex-1 text-center">
                <p className={`font-medium ${m.color}`}>{m.value}g</p>
                <p className="text-gray-500">{m.label} / {m.target}g</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
