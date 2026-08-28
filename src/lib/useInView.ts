'use client';

import { useEffect, useRef, useState } from 'react';

import { prefersReducedMotion } from './prefersReducedMotion';

export type UseInViewOptions = {
  /** Default matches the site-wide reveal threshold. */
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
};

export type UseInViewResult<T extends Element> = {
  ref: React.RefObject<T | null>;
  inView: boolean;
};

/**
 * One IntersectionObserver per section. Under `prefers-reduced-motion` it
 * reports `inView` immediately on mount and never creates an observer, so
 * every section renders in its final state.
 */
export function useInView<T extends Element = HTMLElement>({
  rootMargin = '0px 0px -15% 0px',
  threshold = 0,
  triggerOnce = true,
}: UseInViewOptions = {}): UseInViewResult<T> {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (triggerOnce) observer.unobserve(entry.target);
          } else if (!triggerOnce) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, triggerOnce]);

  return { ref, inView };
}
