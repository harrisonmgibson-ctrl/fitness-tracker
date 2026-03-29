const LEVELS = [
  { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
  { value: 'lightly_active', label: 'Lightly Active', description: 'Light exercise 1–3 days/week' },
  { value: 'moderately_active', label: 'Moderately Active', description: 'Moderate exercise 3–5 days/week' },
  { value: 'very_active', label: 'Very Active', description: 'Hard exercise 6–7 days/week' },
  { value: 'extra_active', label: 'Extra Active', description: 'Physical job or 2x training daily' },
];

export default function StepActivity({ data, onChange, onSubmit, onBack }) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        {LEVELS.map(l => (
          <button key={l.value} type="button"
            onClick={() => onChange({ activityLevel: l.value })}
            className={`w-full flex justify-between items-center px-4 py-3 rounded-lg transition-colors ${data.activityLevel === l.value ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-300'}`}>
            <span className="font-medium">{l.label}</span>
            <span className="text-sm opacity-70">{l.description}</span>
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors">
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!data.activityLevel}
          className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white font-semibold py-3 rounded-lg transition-colors">
          Let's Go
        </button>
      </div>
    </div>
  );
}
