import { calcBMR, calcTDEE, calcCalorieGoal, calcMacroTargets, calcFiberTarget } from '../lib/calculations';

export function useGoals(profile) {
  if (!profile) return null;

  const bmr = calcBMR(profile);
  const tdee = calcTDEE(bmr, profile.activityLevel);
  const calorieGoal = calcCalorieGoal(tdee, profile.weeklyGoalKg, profile.gender);
  const macroTargets = calcMacroTargets(calorieGoal);
  const fiberTarget = calcFiberTarget(profile.gender);

  return { bmr: Math.round(bmr), tdee: Math.round(tdee), calorieGoal, macroTargets, fiberTarget };
}
