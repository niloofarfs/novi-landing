import type { CSSProperties } from 'react';

import { Reveal } from '@/components/Reveal';
import { howItWorks } from '@/content/site';

import styles from './HowItWorks.module.css';

export function HowItWorks() {
  return (
    <Reveal className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow} data-reveal-item>
          {howItWorks.eyebrow}
        </p>
        <h2
          className={styles.heading}
          data-reveal-item
          style={{ '--reveal-delay': '60ms' } as CSSProperties}
        >
          {howItWorks.heading}
        </h2>
        <ol className={styles.steps}>
          {howItWorks.steps.map((step, i) => (
            <li
              key={step.number}
              className={styles.step}
              data-reveal-item
              style={{ '--reveal-delay': `${120 + i * 90}ms` } as CSSProperties}
            >
              <span className={styles.stepNumber} aria-hidden="true">
                {step.number}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
