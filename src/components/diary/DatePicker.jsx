import { formatDisplayDate, addDays, toISODate } from '../../lib/dateUtils';

export default function DatePicker({ date, onChange }) {
  const isToday = date === toISODate();

  return (
    <div className="flex items-center justify-between py-4">
      <button
        onClick={() => onChange(addDays(date, -1))}
        className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300">
        ‹
      </button>
      <span className="font-semibold text-white">{formatDisplayDate(date)}</span>
      <button
        onClick={() => onChange(addDays(date, 1))}
        disabled={isToday}
        className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-30 transition-colors text-gray-300">
        ›
      </button>
    </div>
  );
}
