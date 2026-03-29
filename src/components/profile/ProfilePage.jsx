import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import { useGoals } from '../../hooks/useGoals';

const ACTIVITY_LABELS = {
  sedentary: 'Sedentary',
  lightly_active: 'Lightly Active',
  moderately_active: 'Moderately Active',
  very_active: 'Very Active',
  extra_active: 'Extra Active',
};

export default function ProfilePage() {
  const { profile, setProfile } = useProfile();
  const goals = useGoals(profile);
  const navigate = useNavigate();

  function handleReset() {
    if (confirm('Reset your profile? This will clear all data.')) {
      localStorage.clear();
      navigate('/setup');
    }
  }

  if (!profile) return null;

  return (
    <div className="pt-4 space-y-4">
      <h1 className="text-xl font-bold text-white">Profile</h1>

      <div className="bg-gray-900 rounded-2xl p-4 space-y-2 text-sm">
        <Row label="Age" value={`${profile.age} years`} />
        <Row label="Gender" value={profile.gender} />
        <Row label="Height" value={`${profile.heightCm} cm`} />
        <Row label="Current Weight" value={`${profile.currentWeightKg} kg`} />
        <Row label="Goal Weight" value={`${profile.goalWeightKg} kg`} />
        <Row label="Activity" value={ACTIVITY_LABELS[profile.activityLevel]} />
        <Row label="Weekly Goal" value={`${profile.weeklyGoalKg > 0 ? '+' : ''}${profile.weeklyGoalKg} kg/week`} />
      </div>

      {goals && (
        <div className="bg-gray-900 rounded-2xl p-4 space-y-2 text-sm">
          <Row label="BMR" value={`${goals.bmr} kcal`} />
          <Row label="TDEE" value={`${goals.tdee} kcal`} />
          <Row label="Daily Calorie Goal" value={`${goals.calorieGoal} kcal`} highlight />
          <Row label="Protein Target" value={`${goals.macroTargets.proteinG}g`} />
          <Row label="Carbs Target" value={`${goals.macroTargets.carbsG}g`} />
          <Row label="Fat Target" value={`${goals.macroTargets.fatG}g`} />
        </div>
      )}

      <button
        onClick={() => navigate('/setup')}
        className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-medium transition-colors">
        Edit Profile
      </button>
      <button
        onClick={handleReset}
        className="w-full bg-transparent border border-red-800 hover:border-red-600 text-red-500 py-3 rounded-xl font-medium transition-colors">
        Reset All Data
      </button>
    </div>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className={highlight ? 'text-emerald-400 font-semibold' : 'text-white'}>{value}</span>
    </div>
  );
}
