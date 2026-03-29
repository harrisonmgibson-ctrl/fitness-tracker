export default function DiaryEntryRow({ entry, onRemove }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-800 group transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white truncate">{entry.foodName}</p>
        <p className="text-xs text-gray-500">{entry.quantity} × {entry.servingUnit}</p>
      </div>
      <div className="flex items-center gap-3 ml-2">
        <span className="text-sm font-medium text-gray-300">{entry.calories} kcal</span>
        <button
          onClick={() => onRemove(entry.id)}
          className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all text-lg leading-none">
          ×
        </button>
      </div>
    </div>
  );
}
