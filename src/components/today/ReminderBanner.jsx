import { useState } from 'react';
import { toISODate } from '../../lib/dateUtils';
import { getReminderDismissed, setReminderDismissed } from '../../lib/storage';

export default function ReminderBanner({ entryCount }) {
  const today = toISODate();
  const [dismissed, setDismissed] = useState(() => getReminderDismissed() === today);

  const hour = new Date().getHours();
  const shouldShow = hour >= 13 && entryCount === 0 && !dismissed;

  if (!shouldShow) return null;

  function dismiss() {
    setReminderDismissed(today);
    setDismissed(true);
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-lg">🔔</span>
        <p className="text-sm text-yellow-800 font-medium">Don't forget to log your meals today!</p>
      </div>
      <button
        onClick={dismiss}
        className="text-yellow-500 hover:text-yellow-700 text-lg leading-none transition-colors ml-2">
        ✕
      </button>
    </div>
  );
}
