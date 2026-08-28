'use client';

import { useEffect } from 'react';

import { track } from '@/lib/analytics';

const MARKS = [25, 50, 75, 100] as const;

/**
 * Renders nothing. Reports how far down the page a visitor actually got,
 * once per mark. Passive listener, rAF-throttled, so it cannot affect scroll
 * performance.
 */
export function ScrollDepth() {
  useEffect(() => {
    const fired = new Set<number>();
    let frame: number | null = null;

    const measure = () => {
      frame = null;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        scrollable <= 0 ? 100 : Math.min(100, ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100);

      for (const mark of MARKS) {
        if (pct >= mark && !fired.has(mark)) {
          fired.add(mark);
          track({ name: 'scroll_depth', props: { depth: mark } });
        }
      }
      if (fired.size === MARKS.length) cleanup();
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };

    const cleanup = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    measure();

    return cleanup;
  }, []);

  return null;
}
