import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer, CartesianGrid } from 'recharts';

function formatDate(isoDate) {
  const d = new Date(isoDate + 'T00:00:00');
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
}

export default function WeightChart({ log, goalWeightKg }) {
  if (!log || log.length < 2) {
    return (
      <div className="bg-[#141414] rounded-2xl shadow-sm p-4">
        <h2 className="text-sm font-medium text-[#997700] mb-2">Weight Trend</h2>
        <p className="text-xs text-[#665500] text-center py-4">
          Log at least 2 weight entries to see your trend.
        </p>
      </div>
    );
  }

  // Filter to last 90 days and reverse for ascending order
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 90);
  const data = [...log]
    .filter(e => new Date(e.date + 'T00:00:00') >= cutoff)
    .reverse()
    .map(e => ({ date: e.date, label: formatDate(e.date), weight: e.weightKg }));

  if (data.length < 2) {
    return (
      <div className="bg-[#141414] rounded-2xl shadow-sm p-4">
        <h2 className="text-sm font-medium text-[#997700] mb-2">Weight Trend</h2>
        <p className="text-xs text-[#665500] text-center py-4">
          Log at least 2 weight entries to see your trend.
        </p>
      </div>
    );
  }

  const weights = data.map(d => d.weight);
  const minW = Math.min(...weights, goalWeightKg ?? Infinity) - 1;
  const maxW = Math.max(...weights, goalWeightKg ?? -Infinity) + 1;

  return (
    <div className="bg-[#141414] rounded-2xl shadow-sm p-4">
      <h2 className="text-sm font-medium text-[#997700] mb-3">Weight Trend</h2>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2000" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: '#997700' }}
            interval="preserveStartEnd"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[minW, maxW]}
            tick={{ fontSize: 10, fill: '#997700' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={v => `${v}kg`}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #3D2E00', backgroundColor: '#141414' }}
            formatter={v => [`${v} kg`, 'Weight']}
            labelFormatter={l => l}
          />
          {goalWeightKg != null && (
            <ReferenceLine
              y={goalWeightKg}
              stroke="#00FF66"
              strokeDasharray="4 4"
              label={{ value: 'Goal', position: 'insideTopRight', fontSize: 10, fill: '#00FF66' }}
            />
          )}
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#00AAFF"
            strokeWidth={2}
            dot={{ r: 3, fill: '#00AAFF', strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
