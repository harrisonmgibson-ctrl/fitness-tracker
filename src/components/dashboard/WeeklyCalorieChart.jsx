import { BarChart, Bar, XAxis, YAxis, ReferenceLine, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { last7Days, shortDayLabel, toISODate } from '../../lib/dateUtils';
import { getAllDiary } from '../../lib/storage';
import { sumEntries } from '../../lib/calculations';

export default function WeeklyCalorieChart({ calorieGoal }) {
  const diary = getAllDiary();
  const today = toISODate();

  const data = last7Days().map(date => {
    const entries = diary[date] || [];
    const total = sumEntries(entries);
    return {
      day: shortDayLabel(date),
      calories: total.calories,
      isToday: date === today,
    };
  });

  return (
    <div className="bg-gray-900 rounded-2xl p-4">
      <h2 className="text-sm font-medium text-gray-400 mb-3">This Week</h2>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -20 }}>
          <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: 8 }}
            labelStyle={{ color: '#9ca3af' }}
            itemStyle={{ color: '#10b981' }}
            formatter={v => [`${v} kcal`, 'Calories']}
          />
          <ReferenceLine y={calorieGoal} stroke="#10b981" strokeDasharray="4 2" strokeWidth={1} />
          <Bar dataKey="calories" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.isToday ? '#10b981' : '#374151'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-600 mt-1 text-right">— goal: {calorieGoal} kcal</p>
    </div>
  );
}
