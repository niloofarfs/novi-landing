import type { ReactNode } from 'react';

import styles from './Docket.module.css';

/* --------------------------------------------------------------- Docket --- */

export function Docket({
  title,
  footer,
  children,
  className,
}: {
  title: string;
  footer?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={[styles.docket, className].filter(Boolean).join(' ')}>
      <div className={styles.perforation} aria-hidden="true" />
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        <hr className={styles.rule} />
        {children}
        {footer ? (
          <>
            <hr className={styles.rule} />
            <p className={styles.footer}>{footer}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- parts --- */

export function DocketGroup({
  children,
  roomy = false,
}: {
  children: ReactNode;
  roomy?: boolean;
}) {
  return <div className={[styles.group, roomy && styles.roomy].filter(Boolean).join(' ')}>{children}</div>;
}

export function DocketRule() {
  return <hr className={styles.rule} />;
}

export function DocketRow({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: 'strong' | 'money';
}) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <span
        className={[styles.rowValue, emphasis && styles[emphasis]].filter(Boolean).join(' ')}
      >
        {value}
      </span>
    </div>
  );
}

export function DocketLine({ children, price = false }: { children: ReactNode; price?: boolean }) {
  return <div className={[styles.line, price && styles.price].filter(Boolean).join(' ')}>{children}</div>;
}

export function DocketCaption({ children }: { children: ReactNode }) {
  return <p className={styles.caption}>{children}</p>;
}
