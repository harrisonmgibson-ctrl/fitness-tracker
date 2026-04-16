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
    <div className="bg-[#141414] rounded-2xl shadow-sm p-4">
      <h2 className="text-sm font-medium text-[#997700] mb-3">This Week</h2>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -20 }}>
          <XAxis dataKey="day" tick={{ fill: '#997700', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#997700', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#141414', border: '1px solid #3D2E00', borderRadius: 8 }}
            labelStyle={{ color: '#CCA800' }}
            itemStyle={{ color: '#00AAFF' }}
            formatter={v => [`${v} kcal`, 'Calories']}
          />
          <ReferenceLine y={calorieGoal} stroke="#00AAFF" strokeDasharray="4 2" strokeWidth={1} />
          <Bar dataKey="calories" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.isToday ? '#00AAFF' : '#2A2000'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-[#665500] mt-1 text-right">— goal: {calorieGoal} kcal</p>
    </div>
  );
}
