import { get, set } from 'idb-keyval';

const KEYS = {
  PROFILE: 'ft_profile',
  DIARY: 'ft_diary',
  WEIGHT_LOG: 'ft_weight_log',
  SAVED_MEALS: 'ft_saved_meals',
  EXERCISE: 'ft_exercise',
  WATER: 'ft_water',
  WATER_GOAL: 'ft_water_goal',
  REMINDER_DISMISSED: 'ft_reminder_dismissed',
  CUP_SIZE_ML: 'ft_cup_size_ml',
  BOTTLE_SIZE_ML: 'ft_bottle_size_ml',
  RECENTS: 'ft_recents',
};

async function safeGet(key, fallback) {
  try {
    const val = await get(key);
    return val !== undefined ? val : fallback;
  } catch {
    return fallback;
  }
}

async function safeSet(key, value) {
  try {
    await set(key, value);
  } catch {
    // ignore write errors
  }
}

// One-time migration: copy any existing localStorage data into IndexedDB
export async function migrateFromLocalStorage() {
  try {
    const already = await get('ft_idb_migrated');
    if (already) return;
    for (const key of Object.values(KEYS)) {
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          await set(key, JSON.parse(raw));
        } catch {}
      }
    }
    await set('ft_idb_migrated', true);
  } catch {
    // migration is best-effort
  }
}

// Profile
export async function getProfile() {
  return safeGet(KEYS.PROFILE, null);
}

export async function setProfile(profile) {
  await safeSet(KEYS.PROFILE, profile);
}

// Diary — stored as { 'YYYY-MM-DD': [entries] }
export async function getDiaryDay(isoDate) {
  const all = await safeGet(KEYS.DIARY, {});
  return all[isoDate] || [];
}

export async function setDiaryDay(isoDate, entries) {
  const all = await safeGet(KEYS.DIARY, {});
  all[isoDate] = entries;
  await safeSet(KEYS.DIARY, all);
}

export async function getAllDiary() {
  return safeGet(KEYS.DIARY, {});
}

// Weight log — array of { id, date, weightKg }
export async function getWeightLog() {
  return safeGet(KEYS.WEIGHT_LOG, []);
}

export async function setWeightLog(log) {
  await safeSet(KEYS.WEIGHT_LOG, log);
}

// Saved meals
export async function getSavedMeals() {
  return safeGet(KEYS.SAVED_MEALS, []);
}

export async function setSavedMeals(meals) {
  await safeSet(KEYS.SAVED_MEALS, meals);
}

// Exercise — { 'YYYY-MM-DD': [{ id, name, caloriesBurned }] }
export async function getExerciseDay(isoDate) {
  const all = await safeGet(KEYS.EXERCISE, {});
  return all[isoDate] || [];
}

export async function setExerciseDay(isoDate, entries) {
  const all = await safeGet(KEYS.EXERCISE, {});
  all[isoDate] = entries;
  await safeSet(KEYS.EXERCISE, all);
}

// Water — { 'YYYY-MM-DD': totalMl }
export async function getWaterDay(isoDate) {
  const all = await safeGet(KEYS.WATER, {});
  return all[isoDate] ?? 0;
}

export async function setWaterDay(isoDate, totalMl) {
  const all = await safeGet(KEYS.WATER, {});
  all[isoDate] = totalMl;
  await safeSet(KEYS.WATER, all);
}

// Water goal
export async function getWaterGoal() {
  return safeGet(KEYS.WATER_GOAL, 2000);
}

export async function setWaterGoal(n) {
  await safeSet(KEYS.WATER_GOAL, n);
}

// Cup size
export async function getCupSizeMl() {
  return safeGet(KEYS.CUP_SIZE_ML, 250);
}

export async function setCupSizeMl(n) {
  await safeSet(KEYS.CUP_SIZE_ML, n);
}

// Bottle size
export async function getBottleSizeMl() {
  return safeGet(KEYS.BOTTLE_SIZE_ML, 500);
}

export async function setBottleSizeMl(n) {
  await safeSet(KEYS.BOTTLE_SIZE_ML, n);
}

// Reminder dismissed
export async function getReminderDismissed() {
  return safeGet(KEYS.REMINDER_DISMISSED, null);
}

export async function setReminderDismissed(isoDate) {
  await safeSet(KEYS.REMINDER_DISMISSED, isoDate);
}

// Recents
export async function getRecents() {
  return safeGet(KEYS.RECENTS, []);
}

export async function setRecents(list) {
  await safeSet(KEYS.RECENTS, list);
}
