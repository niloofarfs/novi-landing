import type { CSSProperties } from 'react';

import { BookButton } from '@/components/BookButton';
import { Docket, DocketCaption, DocketGroup, DocketLine, DocketRule } from '@/components/Docket';
import { Reveal } from '@/components/Reveal';
import { pilot } from '@/content/site';

import styles from './Pilot.module.css';

export function Pilot() {
  return (
    <Reveal className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-reveal-item>
            {pilot.eyebrow}
          </p>
          <h2
            className={styles.heading}
            data-reveal-item
            style={{ '--reveal-delay': '60ms' } as CSSProperties}
          >
            {pilot.heading}
          </h2>
          <p
            className={styles.body}
            data-reveal-item
            style={{ '--reveal-delay': '120ms' } as CSSProperties}
          >
            {pilot.body}
          </p>
          <div data-reveal-item style={{ '--reveal-delay': '160ms' } as CSSProperties}>
            <BookButton label={pilot.ctaLabel} position="pilot" size="md" />
          </div>
        </div>

        <div
          className={styles.docketColumn}
          data-reveal-item
          style={{ '--reveal-delay': '200ms' } as CSSProperties}
        >
          <Docket title={pilot.docketTitle}>
            <DocketGroup>
              {pilot.terms.map((term) => (
                <DocketLine key={term}>{term}</DocketLine>
              ))}
              <DocketLine price>{pilot.price}</DocketLine>
            </DocketGroup>

            <DocketRule />
            <DocketCaption>{pilot.includedTitle}</DocketCaption>
            <ul className={styles.list}>
              {pilot.included.map((item) => (
                <li key={item} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>

            <DocketRule />
            <DocketCaption>{pilot.requiredTitle}</DocketCaption>
            <ul className={styles.list}>
              {pilot.required.map((item) => (
                <li key={item} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>

            <DocketRule />
          </Docket>
        </div>
      </div>
    </Reveal>
  );
}
