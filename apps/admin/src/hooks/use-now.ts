/**
 * Use current time with interval
 */
export function useNow(interval = 1000) {
  const [now, setNow] = useState(() => new Date());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pausedRef = useRef(false);

  const pause = useCallback(() => {
    pausedRef.current = true;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setNow(new Date());
      }, interval);
    }
  }, [interval]);

  // useEffect(() => {
  //   if (!pausedRef.current) {
  //     timerRef.current = setInterval(() => {
  //       setNow(new Date());
  //     }, interval);
  //   }

  //   return () => {
  //     if (timerRef.current) {
  //       clearInterval(timerRef.current);
  //     }
  //   };
  // }, [interval]);

  return { now, pause, resume };
}
