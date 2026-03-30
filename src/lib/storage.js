const KEYS = {
  PROFILE: 'ft_profile',
  DIARY: 'ft_diary',
  WEIGHT_LOG: 'ft_weight_log',
  SAVED_MEALS: 'ft_saved_meals',
  EXERCISE: 'ft_exercise',
  WATER: 'ft_water',
  WATER_GOAL: 'ft_water_goal',
  REMINDER_DISMISSED: 'ft_reminder_dismissed',
};

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Profile
export function getProfile() {
  return safeGet(KEYS.PROFILE, null);
}

export function setProfile(profile) {
  safeSet(KEYS.PROFILE, profile);
}

// Diary — stored as { 'YYYY-MM-DD': [entries] }
export function getDiaryDay(isoDate) {
  const all = safeGet(KEYS.DIARY, {});
  return all[isoDate] || [];
}

export function setDiaryDay(isoDate, entries) {
  const all = safeGet(KEYS.DIARY, {});
  all[isoDate] = entries;
  safeSet(KEYS.DIARY, all);
}

export function getAllDiary() {
  return safeGet(KEYS.DIARY, {});
}

// Weight log — array of { id, date, weightKg }
export function getWeightLog() {
  return safeGet(KEYS.WEIGHT_LOG, []);
}

export function setWeightLog(log) {
  safeSet(KEYS.WEIGHT_LOG, log);
}

// Saved meals — array of { id, name, calories, proteinG, carbsG, fatG }
export function getSavedMeals() {
  return safeGet(KEYS.SAVED_MEALS, []);
}

export function setSavedMeals(meals) {
  safeSet(KEYS.SAVED_MEALS, meals);
}

// Exercise — { 'YYYY-MM-DD': [{ id, name, caloriesBurned }] }
export function getExerciseDay(isoDate) {
  const all = safeGet(KEYS.EXERCISE, {});
  return all[isoDate] || [];
}

export function setExerciseDay(isoDate, entries) {
  const all = safeGet(KEYS.EXERCISE, {});
  all[isoDate] = entries;
  safeSet(KEYS.EXERCISE, all);
}

// Water — { 'YYYY-MM-DD': count }
export function getWaterDay(isoDate) {
  const all = safeGet(KEYS.WATER, {});
  return all[isoDate] ?? 0;
}

export function setWaterDay(isoDate, count) {
  const all = safeGet(KEYS.WATER, {});
  all[isoDate] = count;
  safeSet(KEYS.WATER, all);
}

// Water goal — number (default 8)
export function getWaterGoal() {
  return safeGet(KEYS.WATER_GOAL, 8);
}

export function setWaterGoal(n) {
  safeSet(KEYS.WATER_GOAL, n);
}

// Reminder dismissed — ISO date string
export function getReminderDismissed() {
  return safeGet(KEYS.REMINDER_DISMISSED, null);
}

export function setReminderDismissed(isoDate) {
  safeSet(KEYS.REMINDER_DISMISSED, isoDate);
}
