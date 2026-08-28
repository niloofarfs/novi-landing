'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { track } from '@/lib/analytics';
import { prefersReducedMotion } from '@/lib/prefersReducedMotion';
import { exchanges, phoneDemo, type Exchange } from '@/content/site';

import styles from './PhoneDemo.module.css';

type Phase = 'typing' | 'thinking' | 'answer';

const TYPE_INTERVAL_MS = 26;
const THINKING_DELAY_MS = 220;
const ANSWER_DELAY_MS = 1150;

const FIRST: Exchange = exchanges[0]!;

export function PhoneDemo() {
  const [langCode, setLangCode] = useState<Exchange['langCode']>(FIRST.langCode);
  /** Bumped to replay the exchange already on screen. */
  const [nonce, setNonce] = useState(0);
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = exchanges.find((e) => e.langCode === langCode) ?? FIRST;

  const clearTimers = useCallback(() => {
    if (interval.current !== null) {
      clearInterval(interval.current);
      interval.current = null;
    }
    for (const timer of timers.current) clearTimeout(timer);
    timers.current = [];
  }, []);

  /**
   * Plays the exchange. The typing pass is decorative: under
   * `prefers-reduced-motion` the full exchange renders on the spot and no
   * timer is ever created.
   */
  useEffect(() => {
    clearTimers();

    if (prefersReducedMotion()) {
      setTyped(active.question);
      setPhase('answer');
      return;
    }

    setTyped('');
    setPhase('typing');

    let i = 0;
    interval.current = setInterval(() => {
      i += 1;
      setTyped(active.question.slice(0, i));
      if (i < active.question.length) return;

      if (interval.current !== null) clearInterval(interval.current);
      interval.current = null;
      timers.current.push(setTimeout(() => setPhase('thinking'), THINKING_DELAY_MS));
      timers.current.push(setTimeout(() => setPhase('answer'), ANSWER_DELAY_MS));
    }, TYPE_INTERVAL_MS);

    return clearTimers;
    // `nonce` re-runs the exchange when the active chip is pressed again.
  }, [active, nonce, clearTimers]);

  const pick = (code: Exchange['langCode']) => {
    track({ name: 'language_chip_click', props: { langCode: code } });
    if (code === langCode) setNonce((n) => n + 1);
    else setLangCode(code);
  };

  const answerLines = active.answer.split('\n');
  const sourceLabel = active.source ?? phoneDemo.escalatedSourceLabel;

  return (
    <div className={styles.wrap}>
      <div className={styles.frame}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.shell}>
          <div className={styles.screen}>
            <div className={styles.statusBar}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span className={styles.statusLabel}>{phoneDemo.deviceLabel}</span>
            </div>

            <div className={styles.thread} role="group" aria-label={phoneDemo.threadLabel}>
              {/* dir comes from the exchange data. The chrome around it stays LTR. */}
              {/* The bubble is sized by the full question at all times, so the
                  typing pass cannot grow it and shift the layout. */}
              <p
                className={styles.question}
                dir={active.dir}
                lang={active.langCode}
                style={{ fontFamily: active.fontVar }}
              >
                <span className={styles.questionSizer} aria-hidden="true">
                  {active.question}
                </span>
                {/* The caret is a pseudo-element: as its own box it would
                    register a layout shift on every character. */}
                <span
                  className={styles.questionText}
                  data-typing={phase === 'typing' ? 'true' : undefined}
                >
                  {phase === 'typing' ? typed : active.question}
                </span>
              </p>

              {phase === 'thinking' ? (
                <div className={styles.typing} aria-hidden="true">
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              ) : null}

              {phase === 'answer' ? (
                <div
                  className={styles.answer}
                  dir={active.dir}
                  lang={active.langCode}
                  style={{ fontFamily: active.fontVar }}
                >
                  {answerLines.map((line, i) => (
                    <span key={i} className={styles.answerLine}>
                      {line}
                    </span>
                  ))}
                  {/* Always visible. Kept LTR: document names are Latin text. */}
                  <span className={styles.source} dir="ltr" lang="en">
                    {sourceLabel}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Announces the settled exchange once, instead of character by character. */}
      <p className="visuallyHidden" aria-live="polite">
        {phase === 'answer'
          ? `${active.label}. ${active.question} ${answerLines.join(' ')} ${sourceLabel}.`
          : ''}
      </p>

      <ul className={styles.chips} aria-label={phoneDemo.chipGroupLabel}>
        {exchanges.map((exchange) => (
          <li key={exchange.langCode}>
            <button
              type="button"
              className={styles.chip}
              lang={exchange.langCode}
              dir={exchange.dir}
              style={{ fontFamily: exchange.fontVar }}
              aria-pressed={exchange.langCode === langCode}
              onClick={() => pick(exchange.langCode)}
            >
              {exchange.label}
            </button>
          </li>
        ))}
      </ul>

      <p className={styles.exampleNote}>{phoneDemo.exampleNote}</p>
    </div>
  );
}
