const MACROS = [
  { key: 'carbsG', label: 'Carbs', color: 'bg-[#FFD700]', targetKey: 'carbsG' },
  { key: 'proteinG', label: 'Protein', color: 'bg-[#00AAFF]', targetKey: 'proteinG' },
  { key: 'fatG', label: 'Fat', color: 'bg-[#FF6600]', targetKey: 'fatG' },
  { key: 'fiberG', label: 'Fiber', color: 'bg-[#00FF66]', targetKey: 'fiberG' },
];

export default function MacroRibbon({ totals, targets, fiberTarget }) {
  const allTargets = { ...targets, fiberG: fiberTarget || 25 };

  return (
    <div className="grid grid-cols-4 gap-2">
      {MACROS.map(m => {
        const consumed = Math.round((totals[m.key] || 0) * 10) / 10;
        const target = allTargets[m.targetKey] || 1;
        const pct = Math.min((consumed / target) * 100, 100);
        return (
          <div key={m.key} className="bg-[#141414] rounded-2xl shadow-sm p-2">
            <p className="text-xs text-[#997700] mb-1">{m.label}</p>
            <p className="text-sm font-semibold text-[#FFD700]">{consumed}g</p>
            <p className="text-xs text-[#665500] mb-2">of {target}g</p>
            <div className="w-full bg-[#1E1E1E] rounded-full h-1.5">
              <div className={`h-1.5 rounded-full ${m.color}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
