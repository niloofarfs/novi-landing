'use client';

import { useState, type ReactNode } from 'react';

import { prefersReducedMotion } from '@/lib/prefersReducedMotion';
import { useInView } from '@/lib/useInView';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

import styles from './Reveal.module.css';

type RevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Fires once, the first time the section crosses the reveal line. */
  onReveal?: () => void;
};

/**
 * One IntersectionObserver per section.
 *
 * Renders its children in their final state on the server, with no JS and
 * under `prefers-reduced-motion`. The hidden starting state is only armed
 * after mount, in a layout effect, so there is no flash of visible content.
 */
export function Reveal({ children, className, id, onReveal }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const [armed, setArmed] = useState(false);
  const [announced, setAnnounced] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (!prefersReducedMotion()) setArmed(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (inView && !announced) {
      setAnnounced(true);
      onReveal?.();
    }
  }, [inView, announced, onReveal]);

  return (
    <section
      ref={ref}
      id={id}
      className={[styles.reveal, className].filter(Boolean).join(' ')}
      data-inview={armed ? String(inView) : undefined}
    >
      {children}
    </section>
  );
}
