const MACROS = [
  { key: 'carbsG', label: 'Carbs', color: 'bg-[#FFD700]' },
  { key: 'proteinG', label: 'Protein', color: 'bg-[#00AAFF]' },
  { key: 'fatG', label: 'Fat', color: 'bg-[#FF6600]' },
  { key: 'fiberG', label: 'Fiber', color: 'bg-[#00FF66]' },
];

export default function MacroBreakdown({ totals, targets, fiberTarget }) {
  const allTargets = { ...targets, fiberG: fiberTarget || 25 };

  return (
    <div className="bg-[#141414] rounded-2xl shadow-sm p-4">
      <h2 className="text-sm font-medium text-[#997700] mb-3">Macros</h2>
      <div className="space-y-3">
        {MACROS.map(m => {
          const consumed = Math.round((totals[m.key] || 0) * 10) / 10;
          const target = allTargets[m.key] || 1;
          const pct = Math.min((consumed / target) * 100, 100);
          return (
            <div key={m.key}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#CCA800]">{m.label}</span>
                <span className="text-[#665500]">{consumed}g / {target}g</span>
              </div>
              <div className="w-full bg-[#1E1E1E] rounded-full h-2">
                <div className={`h-2 rounded-full ${m.color} transition-all`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
