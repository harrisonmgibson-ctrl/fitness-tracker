const MACROS = [
  { key: 'carbsG', label: 'Carbs', color: 'bg-yellow-400' },
  { key: 'proteinG', label: 'Protein', color: 'bg-blue-400' },
  { key: 'fatG', label: 'Fat', color: 'bg-orange-400' },
];

export default function MacroBreakdown({ totals, targets }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-4">
      <h2 className="text-sm font-medium text-gray-400 mb-3">Macros</h2>
      <div className="space-y-3">
        {MACROS.map(m => {
          const consumed = totals[m.key] || 0;
          const target = targets[m.key] || 1;
          const pct = Math.min((consumed / target) * 100, 100);
          return (
            <div key={m.key}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">{m.label}</span>
                <span className="text-gray-400">{consumed}g / {target}g</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className={`h-2 rounded-full ${m.color} transition-all`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
