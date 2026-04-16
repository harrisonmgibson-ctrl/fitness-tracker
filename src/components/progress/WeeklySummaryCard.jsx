import { getAllDiary } from '../../lib/storage';
import { sumEntries } from '../../lib/calculations';
import { toISODate } from '../../lib/dateUtils';

function getLastNDays(n) {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function shortDay(isoDate) {
  return new Date(isoDate + 'T12:00:00').toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric' });
}

export default function WeeklySummaryCard({ calorieGoal }) {
  const allDiary = getAllDiary();
  const today = toISODate();
  const days = getLastNDays(7);

  const rows = days.map(date => {
    const entries = allDiary[date] || [];
    const logged = sumEntries(entries).calories;
    const diff = logged - calorieGoal;
    return { date, logged, diff };
  });

  const loggedDays = rows.filter(r => r.logged > 0);
  const avgLogged = loggedDays.length
    ? Math.round(loggedDays.reduce((s, r) => s + r.logged, 0) / loggedDays.length)
    : 0;

  function diffColor(diff, logged) {
    if (logged === 0) return 'text-[#665500]';
    if (Math.abs(diff) <= 100) return 'text-[#00FF66]';
    if (diff > 100) return 'text-[#FF2233]';
    return 'text-[#665500]';
  }

  function diffLabel(diff, logged) {
    if (logged === 0) return '—';
    return diff >= 0 ? `+${diff}` : `${diff}`;
  }

  return (
    <div className="bg-[#141414] rounded-2xl shadow-sm p-4">
      <h2 className="text-sm font-medium text-[#997700] mb-3">Weekly Summary</h2>
      <div className="space-y-2">
        {rows.map(r => (
          <div key={r.date} className="grid grid-cols-3 text-xs items-center">
            <span className={`text-[#CCA800] ${r.date === today ? 'font-semibold' : ''}`}>
              {shortDay(r.date)}{r.date === today ? ' ·' : ''}
            </span>
            <span className="text-center text-[#CCA800]">
              {r.logged > 0 ? `${r.logged} kcal` : <span className="text-[#3D2E00]">—</span>}
            </span>
            <span className={`text-right font-medium ${diffColor(r.diff, r.logged)}`}>
              {diffLabel(r.diff, r.logged)}
            </span>
          </div>
        ))}
      </div>
      {avgLogged > 0 && (
        <div className="mt-3 pt-3 border-t border-[#2A2000] flex justify-between text-xs">
          <span className="text-[#997700]">Avg logged ({loggedDays.length} days)</span>
          <span className="font-semibold text-[#FFD700]">{avgLogged} kcal</span>
        </div>
      )}
      <p className="text-xs text-[#665500] mt-1 text-right">Goal: {calorieGoal} kcal/day</p>
    </div>
  );
}
