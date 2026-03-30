const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};

// weeklyGoalKg → daily calorie deficit/surplus
// -1.0 kg/week ≈ -1100 kcal/day, -0.5 ≈ -550, 0 = maintain, +0.5 ≈ +550
const WEEKLY_GOAL_DEFICIT = {
  '-1.0': -1100,
  '-0.75': -825,
  '-0.5': -550,
  '0': 0,
  '0.25': 275,
  '0.5': 550,
};

export function calcBMR(profile) {
  const { age, gender, heightCm, currentWeightKg } = profile;
  // Mifflin-St Jeor
  const base = 10 * currentWeightKg + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
}

export function calcTDEE(bmr, activityLevel) {
  return bmr * (ACTIVITY_MULTIPLIERS[activityLevel] || 1.2);
}

export function calcCalorieGoal(tdee, weeklyGoalKg, gender) {
  const key = String(weeklyGoalKg);
  const deficit = WEEKLY_GOAL_DEFICIT[key] ?? 0;
  const floor = gender === 'male' ? 1500 : 1200;
  return Math.max(Math.round(tdee + deficit), floor);
}

export function calcMacroTargets(calorieGoal) {
  return {
    carbsG: Math.round((calorieGoal * 0.5) / 4),
    proteinG: Math.round((calorieGoal * 0.2) / 4),
    fatG: Math.round((calorieGoal * 0.3) / 9),
  };
}

export function sumEntries(entries) {
  return entries.reduce(
    (acc, e) => ({
      calories: acc.calories + (e.calories || 0),
      proteinG: acc.proteinG + (e.proteinG || 0),
      carbsG: acc.carbsG + (e.carbsG || 0),
      fatG: acc.fatG + (e.fatG || 0),
      fiberG: acc.fiberG + (e.fiberG || 0),
    }),
    { calories: 0, proteinG: 0, carbsG: 0, fatG: 0, fiberG: 0 }
  );
}

// RDA: 38g men, 25g women
export function calcFiberTarget(gender) {
  return gender === 'male' ? 38 : 25;
}

// Estimates implied TDEE from weight trend vs logged calories.
// Returns null if insufficient data (needs ≥2 weight entries spanning ≥7 days).
export function calcAdaptiveTDEE(weightLog, allDiary, baseTDEE) {
  if (!weightLog || weightLog.length < 2) return null;

  // Sort by date ascending
  const sorted = [...weightLog].sort((a, b) => a.date.localeCompare(b.date));

  // Use last 30 days
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const cutoffISO = cutoff.toISOString().slice(0, 10);
  const recent = sorted.filter(w => w.date >= cutoffISO);

  if (recent.length < 2) return null;

  const earliest = recent[0];
  const latest = recent[recent.length - 1];
  const days = Math.round(
    (new Date(latest.date) - new Date(earliest.date)) / (1000 * 60 * 60 * 24)
  );
  if (days < 7) return null;

  const weightDeltaKg = latest.weightKg - earliest.weightKg;
  const dailyCalDelta = (weightDeltaKg * 7700) / days;

  // Average logged calories over the same date range
  const diaryEntries = Object.entries(allDiary || {})
    .filter(([date]) => date >= earliest.date && date <= latest.date)
    .map(([, entries]) => sumEntries(entries).calories);

  if (diaryEntries.length === 0) return null;

  const avgLogged = diaryEntries.reduce((a, b) => a + b, 0) / diaryEntries.length;
  const impliedTDEE = avgLogged - dailyCalDelta;

  return Math.round(impliedTDEE);
}
