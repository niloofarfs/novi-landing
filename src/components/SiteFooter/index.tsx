import { footer } from '@/content/site';

import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.wordmark}>{footer.wordmark}</span>
        <span className={styles.meta}>
          {footer.location} · <a href={`mailto:${footer.email}`}>{footer.email}</a>
        </span>
      </div>
    </footer>
  );
}
