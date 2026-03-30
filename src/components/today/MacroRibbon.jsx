const MACROS = [
  { key: 'carbsG', label: 'Carbs', color: 'bg-yellow-400', targetKey: 'carbsG' },
  { key: 'proteinG', label: 'Protein', color: 'bg-blue-400', targetKey: 'proteinG' },
  { key: 'fatG', label: 'Fat', color: 'bg-orange-400', targetKey: 'fatG' },
  { key: 'fiberG', label: 'Fiber', color: 'bg-green-400', targetKey: 'fiberG' },
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
          <div key={m.key} className="bg-white rounded-2xl shadow-sm p-2">
            <p className="text-xs text-gray-500 mb-1">{m.label}</p>
            <p className="text-sm font-semibold text-gray-900">{consumed}g</p>
            <p className="text-xs text-gray-400 mb-2">of {target}g</p>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className={`h-1.5 rounded-full ${m.color}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
