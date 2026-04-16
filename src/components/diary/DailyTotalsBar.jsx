export default function DailyTotalsBar({ totals, goals }) {
  if (!goals) return null;
  const { calorieGoal, macroTargets } = goals;
  const remaining = calorieGoal - totals.calories;
  const over = remaining < 0;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-10">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-[#141414] border border-[#3D2E00] rounded-xl px-4 py-3 shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#665500]">Calories</span>
            <span className={`text-sm font-semibold ${over ? 'text-[#FF2233]' : 'text-[#FFD700]'}`}>
              {totals.calories} / {calorieGoal} kcal
              {over ? ` (${Math.abs(remaining)} over)` : ` (${remaining} left)`}
            </span>
          </div>
          <div className="w-full bg-[#2A2A2A] rounded-full h-1.5 mb-3">
            <div
              className="h-1.5 rounded-full transition-all"
              style={{
                width: `${Math.min((totals.calories / calorieGoal) * 100, 100)}%`,
                backgroundColor: over ? '#FF2233' : '#00FF66',
              }}
            />
          </div>
          <div className="flex gap-4 text-xs">
            {[
              { label: 'Protein', value: totals.proteinG, target: macroTargets.proteinG, color: 'text-[#00AAFF]' },
              { label: 'Carbs', value: totals.carbsG, target: macroTargets.carbsG, color: 'text-[#FFD700]' },
              { label: 'Fat', value: totals.fatG, target: macroTargets.fatG, color: 'text-[#FF6600]' },
            ].map(m => (
              <div key={m.label} className="flex-1 text-center">
                <p className={`font-medium ${m.color}`}>{m.value}g</p>
                <p className="text-[#665500]">{m.label} / {m.target}g</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
