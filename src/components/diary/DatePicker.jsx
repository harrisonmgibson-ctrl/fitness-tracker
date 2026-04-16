import { formatDisplayDate, addDays, toISODate } from '../../lib/dateUtils';

export default function DatePicker({ date, onChange, compact }) {
  const isToday = date === toISODate();

  if (compact) {
    return (
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => onChange(addDays(date, -1))}
          className="p-1.5 rounded-lg bg-[#1E1E1E] hover:bg-[#2A2A2A] transition-colors text-[#CCA800] text-lg leading-none">
          ‹
        </button>
        <span className="font-semibold text-[#FFD700] text-sm">{formatDisplayDate(date)}</span>
        <button
          onClick={() => onChange(addDays(date, 1))}
          disabled={isToday}
          className="p-1.5 rounded-lg bg-[#1E1E1E] hover:bg-[#2A2A2A] disabled:opacity-30 transition-colors text-[#CCA800] text-lg leading-none">
          ›
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-3">
      <button
        onClick={() => onChange(addDays(date, -1))}
        className="p-2 rounded-lg bg-[#1E1E1E] hover:bg-[#2A2A2A] transition-colors text-[#CCA800]">
        ‹
      </button>
      <span className="font-semibold text-[#FFD700]">{formatDisplayDate(date)}</span>
      <button
        onClick={() => onChange(addDays(date, 1))}
        disabled={isToday}
        className="p-2 rounded-lg bg-[#1E1E1E] hover:bg-[#2A2A2A] disabled:opacity-30 transition-colors text-[#CCA800]">
        ›
      </button>
    </div>
  );
}
