import { useState, useEffect } from 'react';
import {
  getWaterDay, setWaterDay,
  getWaterGoal, setWaterGoal,
  getCupSizeMl, setCupSizeMl,
  getBottleSizeMl, setBottleSizeMl,
} from '../lib/storage';

export function useWater(date) {
  const [totalMl, setTotalMl] = useState(0);
  const [goalMl, setGoalMlState] = useState(2000);
  const [cupSizeMl, setCupSizeMlState] = useState(250);
  const [bottleSizeMl, setBottleSizeMlState] = useState(500);

  useEffect(() => {
    getWaterDay(date).then(setTotalMl);
  }, [date]);

  useEffect(() => {
    getWaterGoal().then(setGoalMlState);
    getCupSizeMl().then(setCupSizeMlState);
    getBottleSizeMl().then(setBottleSizeMlState);
  }, []);

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
