const WEEKLY_GOALS = [
  { value: -1.0, label: 'Lose 1 kg / week', description: 'Aggressive cut' },
  { value: -0.5, label: 'Lose 0.5 kg / week', description: 'Steady cut' },
  { value: 0, label: 'Maintain weight', description: 'Eat at TDEE' },
  { value: 0.5, label: 'Gain 0.5 kg / week', description: 'Lean bulk' },
];

export default function StepGoal({ data, onChange, onNext, onBack }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (data.goalWeightKg && data.weeklyGoalKg !== undefined) onNext();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm text-gray-500 mb-1">Goal Weight (kg)</label>
        <input
          type="number" min="30" max="300" step="0.1" required
          value={data.goalWeightKg || ''}
          onChange={e => onChange({ goalWeightKg: Number(e.target.value) })}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0066EE]"
          placeholder="e.g. 75"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-2">Weekly Goal</label>
        <div className="space-y-2">
          {WEEKLY_GOALS.map(g => (
            <button key={g.value} type="button"
              onClick={() => onChange({ weeklyGoalKg: g.value })}
              className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-colors ${data.weeklyGoalKg === g.value ? 'bg-[#0066EE] text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>
              <span className="font-medium">{g.label}</span>
              <span className="text-sm opacity-70">{g.description}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors">
          Back
        </button>
        <button type="submit" className="flex-1 bg-[#0066EE] hover:bg-[#0052BE] text-white font-semibold py-3 rounded-xl transition-colors">
          Next
        </button>
      </div>
    </form>
  );
}
