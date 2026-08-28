import type { CSSProperties } from 'react';

import { Reveal } from '@/components/Reveal';
import { trust } from '@/content/site';

import styles from './Trust.module.css';

export function Trust() {
  return (
    <Reveal className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-reveal-item>
            {trust.eyebrow}
          </p>
          <h2
            className={styles.heading}
            data-reveal-item
            style={{ '--reveal-delay': '60ms' } as CSSProperties}
          >
            {trust.heading}
          </h2>
          <p
            className={styles.lead}
            data-reveal-item
            style={{ '--reveal-delay': '120ms' } as CSSProperties}
          >
            {trust.lead}
          </p>
          <p
            className={styles.body}
            data-reveal-item
            style={{ '--reveal-delay': '160ms' } as CSSProperties}
          >
            {trust.body}
          </p>
        </div>

        <div
          className={styles.exampleColumn}
          data-reveal-item
          style={{ '--reveal-delay': '200ms' } as CSSProperties}
        >
          <div className={styles.card}>
            <p className={styles.question}>{trust.example.question}</p>
            <div className={styles.answer}>
              <span className={styles.answerText}>{trust.example.answer}</span>
              <span className={styles.source}>{trust.example.source}</span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
