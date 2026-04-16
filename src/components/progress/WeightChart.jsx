import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer, CartesianGrid } from 'recharts';

function formatDate(isoDate) {
  const d = new Date(isoDate + 'T00:00:00');
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
}

export default function WeightChart({ log, goalWeightKg }) {
  if (!log || log.length < 2) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h2 className="text-sm font-medium text-gray-500 mb-2">Weight Trend</h2>
        <p className="text-xs text-gray-400 text-center py-4">
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
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h2 className="text-sm font-medium text-gray-500 mb-2">Weight Trend</h2>
        <p className="text-xs text-gray-400 text-center py-4">
          Log at least 2 weight entries to see your trend.
        </p>
      </div>
    );
  }

  const weights = data.map(d => d.weight);
  const minW = Math.min(...weights, goalWeightKg ?? Infinity) - 1;
  const maxW = Math.max(...weights, goalWeightKg ?? -Infinity) + 1;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <h2 className="text-sm font-medium text-gray-500 mb-3">Weight Trend</h2>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            interval="preserveStartEnd"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[minW, maxW]}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={v => `${v}kg`}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }}
            formatter={v => [`${v} kg`, 'Weight']}
            labelFormatter={l => l}
          />
          {goalWeightKg != null && (
            <ReferenceLine
              y={goalWeightKg}
              stroke="#22C55E"
              strokeDasharray="4 4"
              label={{ value: 'Goal', position: 'insideTopRight', fontSize: 10, fill: '#22C55E' }}
            />
          )}
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#0066EE"
            strokeWidth={2}
            dot={{ r: 3, fill: '#0066EE', strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
