import { useRef, useState } from 'react';

/**
 * Use current time with interval
 *
 * @param interval - update interval in milliseconds, defaults to 1000
 */
export function useNow(interval = 1000) {
  const [now, setNow] = useState(() => new Date());

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pausedRef = useRef(false);

  function pause() {
    pausedRef.current = true;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function resume() {
    pausedRef.current = false;
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setNow(new Date());
      }, interval);
    }
  }

  return { now, pause, resume };
}
