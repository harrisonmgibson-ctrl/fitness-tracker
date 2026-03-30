import { useState } from 'react';
import {
  getWaterDay, setWaterDay,
  getWaterGoal, setWaterGoal,
  getCupSizeMl, setCupSizeMl,
  getBottleSizeMl, setBottleSizeMl,
} from '../lib/storage';

export function useWater(date) {
  const [totalMl, setTotalMl] = useState(() => getWaterDay(date));
  const [goalMl, setGoalMlState] = useState(() => getWaterGoal());
  const [cupSizeMl, setCupSizeMlState] = useState(() => getCupSizeMl());
  const [bottleSizeMl, setBottleSizeMlState] = useState(() => getBottleSizeMl());

  function addMl(n) {
    const next = Math.max(0, totalMl + n);
    setWaterDay(date, next);
    setTotalMl(next);
  }

  function setGoalMl(n) {
    const val = Math.max(100, Math.min(10000, Number(n)));
    setWaterGoal(val);
    setGoalMlState(val);
  }

  function updateCupSize(n) {
    const val = Math.max(50, Math.min(2000, Number(n)));
    setCupSizeMl(val);
    setCupSizeMlState(val);
  }

  function updateBottleSize(n) {
    const val = Math.max(100, Math.min(5000, Number(n)));
    setBottleSizeMl(val);
    setBottleSizeMlState(val);
  }

  return { totalMl, goalMl, cupSizeMl, bottleSizeMl, addMl, setGoalMl, setCupSizeMl: updateCupSize, setBottleSizeMl: updateBottleSize };
}
