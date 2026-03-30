import { useState } from 'react';
import { getWaterDay, setWaterDay, getWaterGoal, setWaterGoal } from '../lib/storage';

export function useWater(date) {
  const [count, setCount] = useState(() => getWaterDay(date));
  const [goal, setGoalState] = useState(() => getWaterGoal());

  function increment() {
    const next = Math.min(count + 1, 30);
    setWaterDay(date, next);
    setCount(next);
  }

  function decrement() {
    const next = Math.max(count - 1, 0);
    setWaterDay(date, next);
    setCount(next);
  }

  function setGoal(n) {
    const val = Math.max(1, Math.min(30, Number(n)));
    setWaterGoal(val);
    setGoalState(val);
  }

  return { count, goal, increment, decrement, setGoal };
}
