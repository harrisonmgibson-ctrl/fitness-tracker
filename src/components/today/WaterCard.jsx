import { useState } from 'react';
import { useWater } from '../../hooks/useWater';

export default function WaterCard({ date }) {
  const { totalMl, goalMl, cupSizeMl, bottleSizeMl, addMl, setGoalMl, setCupSizeMl, setBottleSizeMl } = useWater(date);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('cup'); // 'cup' | 'bottle' | 'exact'
  const [exactInput, setExactInput] = useState('');
  const [editingCup, setEditingCup] = useState(false);
  const [editingBottle, setEditingBottle] = useState(false);
  const [cupInput, setCupInput] = useState('');
  const [bottleInput, setBottleInput] = useState('');
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState('');

  const pct = Math.min((totalMl / goalMl) * 100, 100);

  function handleAdd() {
    if (selected === 'cup') {
      addMl(cupSizeMl);
    } else if (selected === 'bottle') {
      addMl(bottleSizeMl);
    } else {
      const n = parseInt(exactInput, 10);
      if (!isNaN(n) && n > 0) addMl(n);
      setExactInput('');
    }
    setOpen(false);
  }

  function saveCupSize() {
    const n = parseInt(cupInput, 10);
    if (!isNaN(n) && n > 0) setCupSizeMl(n);
    setEditingCup(false);
  }

  function saveBottleSize() {
    const n = parseInt(bottleInput, 10);
    if (!isNaN(n) && n > 0) setBottleSizeMl(n);
    setEditingBottle(false);
  }

  function saveGoal() {
    const n = parseInt(goalInput, 10);
    if (!isNaN(n) && n > 0) setGoalMl(n);
    setEditingGoal(false);
  }

  return (
    <div className="bg-[#141414] rounded-2xl shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">💧</span>
          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-[#FFD700]">Water</p>
              <button
                onClick={() => { setEditingGoal(true); setGoalInput(String(goalMl)); }}
                className="text-[#665500] hover:text-[#CCA800] transition-colors text-xs leading-none">
                ✎
              </button>
            </div>
            {editingGoal ? (
              <div className="flex items-center gap-1 mt-0.5">
                <input
                  type="number"
                  value={goalInput}
                  onChange={e => setGoalInput(e.target.value)}
                  onBlur={saveGoal}
                  onKeyDown={e => e.key === 'Enter' && saveGoal()}
                  min="100" max="10000"
                  className="w-16 text-xs border border-[#3D2E00] rounded px-1 py-0.5 bg-[#1A1A1A] text-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#00AAFF]"
                  autoFocus
                />
                <span className="text-xs text-[#665500]">ml</span>
                <button onClick={saveGoal} className="text-xs text-[#00AAFF] font-medium">Save</button>
              </div>
            ) : (
              <p className="text-xs text-[#665500]">{totalMl} / {goalMl} ml</p>
            )}
          </div>
        </div>
        <button
          onClick={() => setOpen(o => !o)}
          className="text-sm font-medium text-[#00AAFF] border border-[#00AAFF]/30 rounded-xl px-3 py-1.5 hover:bg-[#001A2E] transition-colors flex items-center gap-1">
          + Log Water <span className="text-xs">{open ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[#1E1E1E] rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all"
          style={{
            width: `${pct}%`,
            backgroundColor: pct >= 100 ? '#00FF66' : '#00AAFF',
          }}
        />
      </div>

      {/* Log panel */}
      {open && (
        <div className="mt-3 space-y-2">
          {/* Cup option */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio" name="waterOption" value="cup"
              checked={selected === 'cup'}
              onChange={() => setSelected('cup')}
              className="accent-[#00AAFF]"
            />
            <span className="text-sm text-[#CCA800] flex-1">Cup</span>
            {editingCup ? (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={cupInput}
                  onChange={e => setCupInput(e.target.value)}
                  onBlur={saveCupSize}
                  onKeyDown={e => e.key === 'Enter' && saveCupSize()}
                  min="50" max="2000"
                  className="w-14 text-xs border border-[#3D2E00] rounded px-1 py-0.5 bg-[#1A1A1A] text-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#00AAFF]"
                  autoFocus
                />
                <span className="text-xs text-[#665500]">ml</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span className="text-xs text-[#665500]">{cupSizeMl} ml</span>
                <button
                  onClick={e => { e.preventDefault(); setEditingCup(true); setCupInput(String(cupSizeMl)); }}
                  className="text-[#665500] hover:text-[#CCA800] text-xs leading-none">
                  ✎
                </button>
              </div>
            )}
          </label>

          {/* Bottle option */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio" name="waterOption" value="bottle"
              checked={selected === 'bottle'}
              onChange={() => setSelected('bottle')}
              className="accent-[#00AAFF]"
            />
            <span className="text-sm text-[#CCA800] flex-1">Bottle</span>
            {editingBottle ? (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={bottleInput}
                  onChange={e => setBottleInput(e.target.value)}
                  onBlur={saveBottleSize}
                  onKeyDown={e => e.key === 'Enter' && saveBottleSize()}
                  min="100" max="5000"
                  className="w-14 text-xs border border-[#3D2E00] rounded px-1 py-0.5 bg-[#1A1A1A] text-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#00AAFF]"
                  autoFocus
                />
                <span className="text-xs text-[#665500]">ml</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span className="text-xs text-[#665500]">{bottleSizeMl} ml</span>
                <button
                  onClick={e => { e.preventDefault(); setEditingBottle(true); setBottleInput(String(bottleSizeMl)); }}
                  className="text-[#665500] hover:text-[#CCA800] text-xs leading-none">
                  ✎
                </button>
              </div>
            )}
          </label>

          {/* Exact ml option */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio" name="waterOption" value="exact"
              checked={selected === 'exact'}
              onChange={() => setSelected('exact')}
              className="accent-[#00AAFF]"
            />
            <span className="text-sm text-[#CCA800]">Exact</span>
            <div className="flex items-center gap-1 flex-1">
              <input
                type="number"
                value={exactInput}
                onChange={e => setExactInput(e.target.value)}
                onFocus={() => setSelected('exact')}
                placeholder="ml"
                min="1"
                className="flex-1 text-xs border border-[#3D2E00] rounded px-2 py-0.5 bg-[#1A1A1A] text-[#FFD700] placeholder:text-[#665500] focus:outline-none focus:ring-1 focus:ring-[#00AAFF]"
              />
              <span className="text-xs text-[#665500]">ml</span>
            </div>
          </label>

          <button
            onClick={handleAdd}
            className="w-full bg-[#00AAFF] hover:bg-[#0088DD] text-white rounded-xl py-2 text-sm font-medium transition-colors mt-1">
            Add
          </button>
        </div>
      )}
    </div>
  );
}
