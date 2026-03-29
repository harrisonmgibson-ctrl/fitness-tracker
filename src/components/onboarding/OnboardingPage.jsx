import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import StepPersonal from './StepPersonal';
import StepGoal from './StepGoal';
import StepActivity from './StepActivity';

const STEPS = ['Personal', 'Goal', 'Activity'];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({});
  const { setProfile } = useProfile();
  const navigate = useNavigate();

  function update(fields) {
    setForm(prev => ({ ...prev, ...fields }));
  }

  function handleSubmit() {
    setProfile(form);
    navigate('/diary');
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Set Up Your Profile</h1>
        <p className="text-gray-400 text-sm">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>
        <div className="flex gap-1 mt-3">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-emerald-500' : 'bg-gray-700'}`} />
          ))}
        </div>
      </div>

      {step === 0 && <StepPersonal data={form} onChange={update} onNext={() => setStep(1)} />}
      {step === 1 && <StepGoal data={form} onChange={update} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
      {step === 2 && <StepActivity data={form} onChange={update} onSubmit={handleSubmit} onBack={() => setStep(1)} />}
    </div>
  );
}
