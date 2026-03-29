export default function StepPersonal({ data, onChange, onNext }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (data.age && data.gender && data.heightCm && data.currentWeightKg) onNext();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm text-gray-400 mb-1">Age</label>
        <input
          type="number" min="10" max="100" required
          value={data.age || ''}
          onChange={e => onChange({ age: Number(e.target.value) })}
          className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="e.g. 28"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Gender</label>
        <div className="flex gap-3">
          {['male', 'female'].map(g => (
            <button key={g} type="button"
              onClick={() => onChange({ gender: g })}
              className={`flex-1 py-3 rounded-lg capitalize font-medium transition-colors ${data.gender === g ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-300'}`}>
              {g}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Height (cm)</label>
        <input
          type="number" min="100" max="250" required
          value={data.heightCm || ''}
          onChange={e => onChange({ heightCm: Number(e.target.value) })}
          className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="e.g. 175"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Current Weight (kg)</label>
        <input
          type="number" min="30" max="300" step="0.1" required
          value={data.currentWeightKg || ''}
          onChange={e => onChange({ currentWeightKg: Number(e.target.value) })}
          className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="e.g. 80"
        />
      </div>
      <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3 rounded-lg transition-colors">
        Next
      </button>
    </form>
  );
}
