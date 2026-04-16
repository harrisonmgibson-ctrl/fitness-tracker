import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import DatePicker from '../diary/DatePicker';

export default function TopHeader({ date, onDateChange }) {
  const { profile } = useProfile();
  const navigate = useNavigate();

  const initials = profile
    ? `${profile.age}`.slice(0, 1)
    : '?';

  return (
    <div className="flex items-center justify-between py-3 bg-[#141414] border-b border-[#2A2000] -mx-4 px-4 mb-4">
      <button
        onClick={() => navigate('/more')}
        className="w-9 h-9 rounded-full bg-[#00AAFF] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
        {initials}
      </button>

      <div className="flex-1 mx-2">
        <DatePicker date={date} onChange={onDateChange} compact />
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="text-[#665500] text-xl leading-none">🔔</button>
        <button className="text-[#665500] text-xl leading-none">✏️</button>
      </div>
    </div>
  );
}
