export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** SSR-safe read. Returns false on the server so markup stays deterministic. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
