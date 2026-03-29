import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getProfile } from './lib/storage';
import AppShell from './components/layout/AppShell';
import OnboardingPage from './components/onboarding/OnboardingPage';
import DiaryPage from './components/diary/DiaryPage';
import DashboardPage from './components/dashboard/DashboardPage';
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
          <Route path="/" element={<Navigate to="/diary" replace />} />
          <Route path="/diary" element={<RequireProfile><DiaryPage /></RequireProfile>} />
          <Route path="/dashboard" element={<RequireProfile><DashboardPage /></RequireProfile>} />
          <Route path="/profile" element={<RequireProfile><ProfilePage /></RequireProfile>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
