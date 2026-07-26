import { useEffect } from 'react';
import { useFlightStore } from '../store/useFlightStore';

export function useReducedMotion() {
  const setReducedMotion = useFlightStore((s) => s.setReducedMotion);
  const reducedMotion = useFlightStore((s) => s.reducedMotion);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [setReducedMotion]);

  return reducedMotion;
}
