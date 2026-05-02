import { useState, useEffect } from 'react';
import { getProfile, setProfile as saveProfile } from '../lib/storage';

export function useProfile() {
  const [profile, setProfileState] = useState(null);

  useEffect(() => {
    getProfile().then(p => setProfileState(p ?? null));
  }, []);

  function setProfile(data) {
    saveProfile(data);
    setProfileState(data);
  }

  return { profile, setProfile };
}
