import { useState } from 'react';
import { getProfile, setProfile as saveProfile } from '../lib/storage';

export function useProfile() {
  const [profile, setProfileState] = useState(() => getProfile());

  function setProfile(data) {
    saveProfile(data);
    setProfileState(data);
  }

  return { profile, setProfile };
}
