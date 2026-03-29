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
    }),
    { calories: 0, proteinG: 0, carbsG: 0, fatG: 0 }
  );
}
