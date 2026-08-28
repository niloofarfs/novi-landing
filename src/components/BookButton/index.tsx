'use client';

import { getBookingUrl } from '@/lib/booking';
import { track, type CtaPosition } from '@/lib/analytics';

import styles from './BookButton.module.css';

type BookButtonProps = {
  label: string;
  position: CtaPosition;
  size?: 'md' | 'lg' | 'xl';
  className?: string;
};

/** The page's single conversion action, wherever it appears. */
export function BookButton({ label, position, size = 'md', className }: BookButtonProps) {
  return (
    <a
      href={getBookingUrl()}
      className={[styles.cta, styles[size], className].filter(Boolean).join(' ')}
      onClick={() => track({ name: 'cta_click', props: { position } })}
    >
      {label}
    </a>
  );
}
