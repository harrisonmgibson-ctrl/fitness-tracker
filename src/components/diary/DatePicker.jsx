import { formatDisplayDate, addDays, toISODate } from '../../lib/dateUtils';

export default function DatePicker({ date, onChange, compact }) {
  const isToday = date === toISODate();

  if (compact) {
    return (
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => onChange(addDays(date, -1))}
          className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 text-lg leading-none">
          ‹
        </button>
        <span className="font-semibold text-gray-900 text-sm">{formatDisplayDate(date)}</span>
        <button
          onClick={() => onChange(addDays(date, 1))}
          disabled={isToday}
          className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition-colors text-gray-600 text-lg leading-none">
          ›
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-3">
      <button
        onClick={() => onChange(addDays(date, -1))}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600">
        ‹
      </button>
      <span className="font-semibold text-gray-900">{formatDisplayDate(date)}</span>
      <button
        onClick={() => onChange(addDays(date, 1))}
        disabled={isToday}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition-colors text-gray-600">
        ›
      </button>
    </div>
  );
}
