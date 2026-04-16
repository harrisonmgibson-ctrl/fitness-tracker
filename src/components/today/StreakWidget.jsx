export default function StreakWidget({ streak }) {
  if (streak === 0) return null;

  return (
    <div className="flex items-center justify-center gap-2 bg-[#141414] rounded-2xl shadow-sm px-4 py-2.5">
      <span className="text-lg">🔥</span>
      <span className="text-sm font-semibold text-[#FFD700]">{streak} Day Streak</span>
      <span className="text-xs text-[#665500]">Keep it up!</span>
    </div>
  );
}
