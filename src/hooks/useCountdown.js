import { useEffect, useState, useCallback } from 'react';

/**
 * Countdown to an ISO date string (with timezone offset). Returns the
 * remaining days/hours/minutes/seconds and a `finished` flag. Ticks once
 * per second and cleans up on unmount.
 */
function getRemaining(target) {
  const total = target - Date.now();
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, finished: false };
}

export function useCountdown(isoDate) {
  const target = new Date(isoDate).getTime();
  const compute = useCallback(() => getRemaining(target), [target]);
  const [time, setTime] = useState(compute);

  useEffect(() => {
    setTime(compute());
    const id = setInterval(() => setTime(compute()), 1000);
    return () => clearInterval(id);
  }, [compute]);

  return time;
}

export default useCountdown;
