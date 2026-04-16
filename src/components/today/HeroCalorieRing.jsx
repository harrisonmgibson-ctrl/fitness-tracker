export default function HeroCalorieRing({ consumed, goal, exerciseCalories = 0 }) {
  const net = consumed - exerciseCalories;
  const over = net > goal;
  const remaining = goal - net;

  const totalLength = Math.PI * 85; // ≈ 267
  const fillLength = Math.min(Math.max((net / goal), 0), 1) * totalLength;
  const arcColor = over ? '#FF2233' : '#00FF66';

  return (
    <div className="bg-[#141414] rounded-2xl shadow-sm p-5">
      <svg viewBox="0 0 200 120" className="w-full max-w-[260px] mx-auto block">
        {/* Background arc */}
        <path
          d="M 15,108 A 85,85 0 0 1 185,108"
          fill="none"
          stroke="#2A2000"
          strokeWidth="22"
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d="M 15,108 A 85,85 0 0 1 185,108"
          fill="none"
          stroke={arcColor}
          strokeWidth="22"
          strokeLinecap="round"
          strokeDasharray={`${fillLength} ${totalLength}`}
        />
        {/* Center text */}
        <text
          x="100" y="83"
          textAnchor="middle"
          fontSize="28"
          fontWeight="700"
          fill={over ? '#FF2233' : '#FFD700'}>
          {over ? net - goal : Math.abs(remaining)}
        </text>
        <text
          x="100" y="100"
          textAnchor="middle"
          fontSize="10"
          fill="#997700">
          {over ? 'Calories Over' : 'Calories Remaining'}
        </text>
      </svg>

      <div className="flex justify-center gap-3 text-xs text-[#665500] mt-1 flex-wrap">
        <span><span className="font-medium text-[#CCA800]">{goal}</span> Goal</span>
        <span>−</span>
        <span><span className="font-medium text-[#CCA800]">{consumed}</span> Food</span>
        {exerciseCalories > 0 && (
          <>
            <span>+</span>
            <span><span className="font-medium text-[#00FF66]">{exerciseCalories}</span> Exercise</span>
          </>
        )}
        <span>=</span>
        <span className={`font-medium ${over ? 'text-[#FF2233]' : 'text-[#00AAFF]'}`}>
          {over ? `${net - goal} over` : `${remaining} left`}
        </span>
      </div>
    </div>
  );
}
