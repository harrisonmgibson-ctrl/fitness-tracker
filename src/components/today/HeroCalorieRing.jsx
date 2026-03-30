import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

export default function HeroCalorieRing({ consumed, goal, exerciseCalories = 0 }) {
  const net = consumed - exerciseCalories;
  const pct = Math.min((net / goal) * 100, 100);
  const over = net > goal;
  const remaining = goal - net;

  const data = [
    { name: 'background', value: 100, fill: '#E5E7EB' },
    { name: 'consumed', value: Math.max(pct, 0), fill: over ? '#ef4444' : '#0066EE' },
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
            {over ? net - goal : Math.abs(remaining)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {over ? 'Calories Over' : 'Calories Remaining'}
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-3 text-xs text-gray-400 mt-1 flex-wrap">
        <span><span className="font-medium text-gray-600">{goal}</span> Goal</span>
        <span>−</span>
        <span><span className="font-medium text-gray-600">{consumed}</span> Food</span>
        {exerciseCalories > 0 && (
          <>
            <span>+</span>
            <span><span className="font-medium text-green-600">{exerciseCalories}</span> Exercise</span>
          </>
        )}
        <span>=</span>
        <span className={`font-medium ${over ? 'text-red-500' : 'text-[#0066EE]'}`}>
          {over ? `${net - goal} over` : `${remaining} left`}
        </span>
      </div>
    </div>
  );
}
