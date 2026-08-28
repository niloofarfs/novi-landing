import { BookButton } from '@/components/BookButton';
import { PhoneDemo } from '@/components/PhoneDemo';
import { hero } from '@/content/site';

import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            <span className={styles.eyebrowText}>{hero.eyebrow}</span>
          </p>
          <h1 className={styles.headline}>
            {hero.headline}
            <span className={styles.headlineMuted}>{hero.headlineMuted}</span>
          </h1>
          <p className={styles.body}>{hero.body}</p>
          <div className={styles.actions}>
            <BookButton label={hero.ctaLabel} position="hero" size="lg" />
            <span className={styles.ctaNote}>{hero.ctaNote}</span>
          </div>
        </div>

        <PhoneDemo />
      </div>
    </section>
  );
}
