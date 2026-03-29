import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

export default function HeroCalorieRing({ consumed, goal }) {
  const pct = Math.min((consumed / goal) * 100, 100);
  const over = consumed > goal;
  const remaining = goal - consumed;

  const data = [
    { name: 'background', value: 100, fill: '#E5E7EB' },
    { name: 'consumed', value: pct, fill: over ? '#ef4444' : '#0066EE' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="relative h-52">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="60%"
            outerRadius="100%"
            startAngle={210}
            endAngle={-30}
            data={data}
            barSize={16}>
            <RadialBar dataKey="value" cornerRadius={10} background={false} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className={`text-4xl font-bold ${over ? 'text-red-500' : 'text-gray-900'}`}>
            {over ? consumed - goal : Math.abs(remaining)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {over ? 'Calories Over' : 'Calories Remaining'}
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-6 text-xs text-gray-400 mt-1">
        <span><span className="font-medium text-gray-600">{goal}</span> Goal</span>
        <span>−</span>
        <span><span className="font-medium text-gray-600">{consumed}</span> Food</span>
        <span>=</span>
        <span className={`font-medium ${over ? 'text-red-500' : 'text-[#0066EE]'}`}>
          {over ? `${consumed - goal} over` : `${remaining} left`}
        </span>
      </div>
    </div>
  );
}
