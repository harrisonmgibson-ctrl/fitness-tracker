import { useState } from 'react';

export default function DiaryEntryRow({ entry, onRemove, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draftQty, setDraftQty] = useState(String(entry.quantity));

  function handleConfirm() {
    const qty = parseFloat(draftQty);
    if (!isNaN(qty) && qty >= 0.25) {
      onEdit(entry.id, qty);
    }
    setEditing(false);
  }

  function handleCancel() {
    setDraftQty(String(entry.quantity));
    setEditing(false);
  }

  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#1A1A1A] group transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#FFD700] truncate">{entry.foodName}</p>
        {editing ? (
          <div className="flex items-center gap-1 mt-0.5">
            <input
              type="number"
              min="0.25" max="20" step="0.25"
              value={draftQty}
              onChange={e => setDraftQty(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleConfirm(); if (e.key === 'Escape') handleCancel(); }}
              className="w-16 text-xs border border-[#3D2E00] rounded px-1 py-0.5 bg-[#1A1A1A] text-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#00AAFF]"
              autoFocus
            />
            <span className="text-xs text-[#665500]">× {entry.servingUnit}</span>
            <button onClick={handleConfirm} className="text-xs text-[#00AAFF] font-medium">✓</button>
            <button onClick={handleCancel} className="text-xs text-[#665500]">✕</button>
          </div>
        ) : (
          <p className="text-xs text-[#665500]">{entry.quantity} × {entry.servingUnit}</p>
        )}
      </div>
      <div className="flex items-center gap-2 ml-2">
        <span className="text-sm font-medium text-[#CCA800]">{entry.calories} kcal</span>
        {!editing && onEdit && (
          <button
            onClick={() => { setDraftQty(String(entry.quantity)); setEditing(true); }}
            className="text-[#665500] hover:text-[#00AAFF] opacity-0 group-hover:opacity-100 transition-all text-sm leading-none">
            ✎
          </button>
        )}
        <button
          onClick={() => onRemove(entry.id)}
          className="text-[#665500] hover:text-[#FF2233] opacity-0 group-hover:opacity-100 transition-all text-lg leading-none">
          ×
        </button>
      </div>
    </div>
  );
}
