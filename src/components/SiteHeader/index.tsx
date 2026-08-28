import { nav } from '@/content/site';

import styles from './SiteHeader.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top" aria-label={nav.homeLabel}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.wordmark}>{nav.wordmark}</span>
        </a>
        <nav>
          <a className={styles.navCta} href="#book">
            {nav.ctaLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
