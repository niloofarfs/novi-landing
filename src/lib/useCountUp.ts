'use client';

import { useEffect, useRef, useState } from 'react';

import { prefersReducedMotion } from './prefersReducedMotion';

export type UseCountUpOptions = {
  /** Animate from zero the first time this flips true. */
  active: boolean;
  durationMs?: number;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts a record of numbers up from zero the first time `active` flips true,
 * then tracks every later change instantly - which is what a slider needs.
 *
 * Returns the final values immediately under `prefers-reduced-motion`.
 */
export function useCountUp<K extends string>(
  targets: Record<K, number>,
  { active, durationMs = 760 }: UseCountUpOptions,
): Record<K, number> {
  const [displayed, setDisplayed] = useState<Record<K, number>>(targets);
  const frame = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  // Read the latest targets inside the effect without depending on identity.
  const targetsRef = useRef(targets);
  targetsRef.current = targets;

  // Content signature: a new object with the same numbers must not re-trigger.
  const signature = (Object.keys(targets) as K[])
    .sort()
    .map((key) => `${key}:${targets[key]}`)
    .join('|');

  useEffect(() => {
    const next = targetsRef.current;
    const keys = Object.keys(next) as K[];

    const snap = () => setDisplayed(next);

    if (!active || prefersReducedMotion()) {
      snap();
      return;
    }

    if (hasAnimated.current) {
      snap();
      return;
    }

    hasAnimated.current = true;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = easeOutCubic(progress);
      setDisplayed(
        Object.fromEntries(keys.map((key) => [key, Math.round((next[key] ?? 0) * eased)])) as Record<
          K,
          number
        >,
      );
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
    // `signature` stands in for the target values by content, not identity.
  }, [active, durationMs, signature]);

  return displayed;
}
