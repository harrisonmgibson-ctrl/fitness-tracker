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
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <h2 className="text-sm font-medium text-gray-500 mb-3">This Week</h2>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -20 }}>
          <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }}
            labelStyle={{ color: '#6b7280' }}
            itemStyle={{ color: '#0066EE' }}
            formatter={v => [`${v} kcal`, 'Calories']}
          />
          <ReferenceLine y={calorieGoal} stroke="#0066EE" strokeDasharray="4 2" strokeWidth={1} />
          <Bar dataKey="calories" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.isToday ? '#0066EE' : '#E5E7EB'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 mt-1 text-right">— goal: {calorieGoal} kcal</p>
    </div>
  );
}
