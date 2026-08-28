'use client';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import type { CSSProperties } from 'react';

import { MuiThemeProvider } from '@/components/MuiThemeProvider';
import { Reveal } from '@/components/Reveal';
import { faq } from '@/content/site';

import styles from './Faq.module.css';

export function Faq() {
  return (
    <MuiThemeProvider>
    <Reveal className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow} data-reveal-item>
          {faq.eyebrow}
        </p>
        <h2
          className={styles.heading}
          data-reveal-item
          style={{ '--reveal-delay': '60ms' } as CSSProperties}
        >
          {faq.heading}
        </h2>

        <div
          className={styles.ticket}
          data-reveal-item
          style={{ '--reveal-delay': '120ms' } as CSSProperties}
        >
          <div className={styles.perforation} aria-hidden="true" />
          <div className={styles.items}>
            {/* All collapsed by default; each panel is independent. */}
            {faq.items.map((item, i) => (
              <Accordion key={item.question}>
                <AccordionSummary
                  expandIcon={<span aria-hidden="true" />}
                  id={`novi-faq-${i}-summary`}
                  aria-controls={`novi-faq-${i}-panel`}
                >
                  {item.question}
                </AccordionSummary>
                <AccordionDetails
                  id={`novi-faq-${i}-panel`}
                  role="region"
                  aria-labelledby={`novi-faq-${i}-summary`}
                >
                  {item.answer}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
    </MuiThemeProvider>
  );
}
