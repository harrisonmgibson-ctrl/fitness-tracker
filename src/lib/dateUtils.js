export function toISODate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function formatDisplayDate(isoStr) {
  const [year, month, day] = isoStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const today = toISODate();
  const yesterday = toISODate(new Date(Date.now() - 86400000));

  if (isoStr === today) return 'Today';
  if (isoStr === yesterday) return 'Yesterday';

  return date.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
}

export function addDays(isoStr, n) {
  const [year, month, day] = isoStr.split('-').map(Number);
  const date = new Date(year, month - 1, day + n);
  return toISODate(date);
}

export function last7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    days.push(toISODate(new Date(Date.now() - i * 86400000)));
  }
  return days;
}

export function shortDayLabel(isoStr) {
  const [year, month, day] = isoStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-AU', { weekday: 'short' });
}
