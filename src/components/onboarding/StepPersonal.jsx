export default function StepPersonal({ data, onChange, onNext }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (data.age && data.gender && data.heightCm && data.currentWeightKg) onNext();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm text-[#997700] mb-1">Age</label>
        <input
          type="number" min="10" max="100" required
          value={data.age || ''}
          onChange={e => onChange({ age: Number(e.target.value) })}
          className="w-full bg-[#141414] border border-[#3D2E00] rounded-xl px-4 py-3 text-[#FFD700] placeholder:text-[#665500] focus:outline-none focus:ring-2 focus:ring-[#00AAFF]"
          placeholder="e.g. 28"
        />
      </div>
      <div>
        <label className="block text-sm text-[#997700] mb-1">Gender</label>
        <div className="flex gap-3">
          {['male', 'female'].map(g => (
            <button key={g} type="button"
              onClick={() => onChange({ gender: g })}
              className={`flex-1 py-3 rounded-xl capitalize font-medium transition-colors ${data.gender === g ? 'bg-[#00AAFF] text-white' : 'bg-[#141414] border border-[#3D2E00] text-[#CCA800]'}`}>
              {g}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm text-[#997700] mb-1">Height (cm)</label>
        <input
          type="number" min="100" max="250" required
          value={data.heightCm || ''}
          onChange={e => onChange({ heightCm: Number(e.target.value) })}
          className="w-full bg-[#141414] border border-[#3D2E00] rounded-xl px-4 py-3 text-[#FFD700] placeholder:text-[#665500] focus:outline-none focus:ring-2 focus:ring-[#00AAFF]"
          placeholder="e.g. 175"
        />
      </div>
      <div>
        <label className="block text-sm text-[#997700] mb-1">Current Weight (kg)</label>
        <input
          type="number" min="30" max="300" step="0.1" required
          value={data.currentWeightKg || ''}
          onChange={e => onChange({ currentWeightKg: Number(e.target.value) })}
          className="w-full bg-[#141414] border border-[#3D2E00] rounded-xl px-4 py-3 text-[#FFD700] placeholder:text-[#665500] focus:outline-none focus:ring-2 focus:ring-[#00AAFF]"
          placeholder="e.g. 80"
        />
      </div>
      <button type="submit" className="w-full bg-[#00AAFF] hover:bg-[#0088DD] text-white font-semibold py-3 rounded-xl transition-colors">
        Next
      </button>
    </form>
  );
}
