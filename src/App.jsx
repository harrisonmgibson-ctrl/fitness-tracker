import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getProfile } from './lib/storage';
import AppShell from './components/layout/AppShell';
import OnboardingPage from './components/onboarding/OnboardingPage';
import TodayPage from './components/today/TodayPage';
import DiaryPage from './components/diary/DiaryPage';
import ProgressPage from './components/progress/ProgressPage';
import MorePage from './components/more/MorePage';
import ProfilePage from './components/profile/ProfilePage';

function RequireProfile({ children }) {
  return getProfile() ? children : <Navigate to="/setup" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/setup" element={<OnboardingPage />} />
        <Route element={<AppShell />}>
          <Route path="/" element={<RequireProfile><TodayPage /></RequireProfile>} />
          <Route path="/diary" element={<RequireProfile><DiaryPage /></RequireProfile>} />
          <Route path="/progress" element={<RequireProfile><ProgressPage /></RequireProfile>} />
          <Route path="/more" element={<RequireProfile><MorePage /></RequireProfile>} />
          <Route path="/profile" element={<RequireProfile><ProfilePage /></RequireProfile>} />
          <Route path="/dashboard" element={<Navigate to="/progress" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
