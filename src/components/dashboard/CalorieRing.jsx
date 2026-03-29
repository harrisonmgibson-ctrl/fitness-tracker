import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

export default function CalorieRing({ consumed, goal }) {
  const pct = Math.min((consumed / goal) * 100, 100);
  const over = consumed > goal;

  const data = [
    { name: 'background', value: 100, fill: '#1f2937' },
    { name: 'consumed', value: pct, fill: over ? '#ef4444' : '#10b981' },
  ];

  return (
    <div className="bg-gray-900 rounded-2xl p-4">
      <h2 className="text-sm font-medium text-gray-400 mb-3">Calories</h2>
      <div className="relative h-44">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="65%"
            outerRadius="100%"
            startAngle={210}
            endAngle={-30}
            data={data}
            barSize={14}>
            <RadialBar dataKey="value" cornerRadius={8} background={false} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className={`text-3xl font-bold ${over ? 'text-red-400' : 'text-white'}`}>{consumed}</p>
          <p className="text-xs text-gray-500">of {goal} kcal</p>
          {over
            ? <p className="text-xs text-red-400 mt-1">{consumed - goal} over</p>
            : <p className="text-xs text-emerald-400 mt-1">{goal - consumed} remaining</p>
          }
        </div>
      </div>
    </div>
  );
}
