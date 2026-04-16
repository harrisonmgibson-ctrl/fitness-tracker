import { useState } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

export default function WeightSparklineCard({ log, onAddWeight }) {
  const [weightInput, setWeightInput] = useState('');

  const sparkData = [...log].slice(0, 14).reverse().map(e => ({
    date: e.date,
    weight: e.weightKg,
  }));

  function handleSubmit(e) {
    e.preventDefault();
    if (weightInput) {
      onAddWeight(Number(weightInput));
      setWeightInput('');
    }
  }

  const latest = log[0];

  return (
    <div className="bg-[#141414] rounded-2xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-[#997700]">Weight</h3>
        {latest && (
          <span className="text-sm font-semibold text-[#FFD700]">{latest.weightKg} kg</span>
        )}
      </div>

      {sparkData.length >= 2 && (
        <div className="h-16 mb-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
              <Tooltip
                contentStyle={{ backgroundColor: '#141414', border: '1px solid #3D2E00', borderRadius: 8, fontSize: 11 }}
                formatter={v => [`${v} kg`]}
                labelFormatter={l => l}
              />
              <Line type="monotone" dataKey="weight" stroke="#00AAFF" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="number" step="0.1" min="30" max="300"
          value={weightInput}
          onChange={e => setWeightInput(e.target.value)}
          placeholder="Log weight (kg)"
          className="flex-1 bg-[#1A1A1A] border border-[#3D2E00] rounded-xl px-3 py-2 text-[#FFD700] placeholder:text-[#665500] text-sm focus:outline-none focus:ring-2 focus:ring-[#00AAFF]"
        />
        <button type="submit" className="bg-[#00AAFF] hover:bg-[#0088DD] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          Log
        </button>
      </form>
    </div>
  );
}
