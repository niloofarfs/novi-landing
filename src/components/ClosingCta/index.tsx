import type { CSSProperties } from 'react';

import { BookButton } from '@/components/BookButton';
import { Reveal } from '@/components/Reveal';
import { closingCta } from '@/content/site';

import styles from './ClosingCta.module.css';

export function ClosingCta() {
  return (
    <Reveal className={styles.section} id="book">
      <div className={styles.inner}>
        <p className={styles.lead} data-reveal-item>
          {closingCta.lead}
        </p>
        <h2
          className={styles.heading}
          data-reveal-item
          style={{ '--reveal-delay': '60ms' } as CSSProperties}
        >
          {closingCta.heading}
        </h2>
        <div data-reveal-item style={{ '--reveal-delay': '120ms' } as CSSProperties}>
          <BookButton label={closingCta.ctaLabel} position="closing" size="xl" />
        </div>
        <span
          className={styles.note}
          data-reveal-item
          style={{ '--reveal-delay': '160ms' } as CSSProperties}
        >
          {closingCta.ctaNote}
        </span>
      </div>
    </Reveal>
  );
}
