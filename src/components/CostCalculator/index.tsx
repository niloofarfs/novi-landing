'use client';

import Slider from '@mui/material/Slider';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

import { Docket, DocketGroup, DocketRow, DocketRule } from '@/components/Docket';
import { MuiThemeProvider } from '@/components/MuiThemeProvider';
import { Reveal } from '@/components/Reveal';
import {
  costCalculator,
  REPLACEMENT_COST_HIGH,
  REPLACEMENT_COST_LOW,
  sliderDefaults,
  sliders,
} from '@/content/site';
import { debounce, track } from '@/lib/analytics';
import { useCountUp } from '@/lib/useCountUp';

import styles from './CostCalculator.module.css';

type Inputs = typeof sliderDefaults;

const numberFormat = new Intl.NumberFormat('en-US');
const money = (value: number) => `$${numberFormat.format(value)}`;

const SETTLE_MS = 600;

export function CostCalculator() {
  const [inputs, setInputs] = useState<Inputs>(sliderDefaults);
  const [counting, setCounting] = useState(false);

  const firstInteraction = useRef(false);

  const reportSettled = useMemo(
    () =>
      debounce((values: Inputs) => {
        track({ name: 'calculator_interact', props: { ...values } });
      }, SETTLE_MS),
    [],
  );

  useEffect(() => reportSettled.cancel, [reportSettled]);

  const setValue = (key: keyof Inputs, value: number) => {
    if (!firstInteraction.current) {
      firstInteraction.current = true;
      track({ name: 'calculator_interact', props: { ...inputs, [key]: value } });
    }
    const next = { ...inputs, [key]: value };
    setInputs(next);
    reportSettled(next);
  };

  const replacements = Math.round(
    inputs.locations * inputs.staffPerLocation * (inputs.turnoverPct / 100),
  );

  const targets = useMemo(
    () => ({
      locations: inputs.locations,
      staffPerLocation: inputs.staffPerLocation,
      turnoverPct: inputs.turnoverPct,
      replacements,
      costLow: replacements * REPLACEMENT_COST_LOW,
      costHigh: replacements * REPLACEMENT_COST_HIGH,
    }),
    [inputs.locations, inputs.staffPerLocation, inputs.turnoverPct, replacements],
  );

  const shown = useCountUp(targets, { active: counting });

  return (
    <MuiThemeProvider>
    <Reveal className={styles.section} onReveal={() => setCounting(true)}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-reveal-item>
            {costCalculator.eyebrow}
          </p>
          <h2 className={styles.heading} data-reveal-item style={{ '--reveal-delay': '60ms' } as CSSProperties}>
            {costCalculator.heading}
          </h2>
          <p className={styles.body} data-reveal-item style={{ '--reveal-delay': '120ms' } as CSSProperties}>
            {costCalculator.body}
          </p>
          <p className={styles.stat} data-reveal-item style={{ '--reveal-delay': '160ms' } as CSSProperties}>
            {costCalculator.statLead}
            <strong className={styles.statValue}>{costCalculator.statValue}</strong>
            {costCalculator.statTrail}
          </p>

          <fieldset
            className={styles.controls}
            data-reveal-item
            style={{ '--reveal-delay': '200ms' } as CSSProperties}
          >
            <legend className="visuallyHidden">{costCalculator.controlsLabel}</legend>
            {sliders.map((spec) => {
              const value = inputs[spec.key];
              const text = spec.format(value);
              return (
                <div key={spec.id} className={styles.control}>
                  <div className={styles.controlHead}>
                    <span className={styles.controlLabel} id={`${spec.id}-label`}>
                      {spec.label}
                    </span>
                    <output className={styles.controlValue} htmlFor={spec.id}>
                      {text}
                    </output>
                  </div>
                  <div className={styles.sliderRow}>
                    <Slider
                      id={spec.id}
                      value={value}
                      min={spec.min}
                      max={spec.max}
                      step={spec.step}
                      marks={false}
                      aria-label={spec.label}
                      aria-valuetext={text}
                      onChange={(_, next) => setValue(spec.key, next as number)}
                    />
                  </div>
                </div>
              );
            })}
          </fieldset>

          <p className={styles.sources} data-reveal-item style={{ '--reveal-delay': '240ms' } as CSSProperties}>
            {costCalculator.sources}
          </p>
        </div>

        <div className={styles.docketColumn} data-reveal-item style={{ '--reveal-delay': '160ms' } as CSSProperties}>
          <Docket title={costCalculator.docketTitle} footer={costCalculator.docketFooter}>
            <DocketGroup>
              <DocketRow
                label={costCalculator.rowLabels.locations}
                value={numberFormat.format(shown.locations)}
              />
              <DocketRow
                label={costCalculator.rowLabels.staffPerLocation}
                value={numberFormat.format(shown.staffPerLocation)}
              />
              <DocketRow
                label={costCalculator.rowLabels.turnoverPct}
                value={`${shown.turnoverPct}%`}
              />
            </DocketGroup>
            <DocketRule />
            <DocketGroup roomy>
              <DocketRow
                label={costCalculator.rowLabels.replacements}
                value={numberFormat.format(shown.replacements)}
                emphasis="strong"
              />
              {/* Always a range. A single figure would read as false precision. */}
              <DocketRow
                label={costCalculator.rowLabels.costLow}
                value={money(shown.costLow)}
                emphasis="money"
              />
              <DocketRow
                label={costCalculator.rowLabels.costHigh}
                value={money(shown.costHigh)}
                emphasis="money"
              />
            </DocketGroup>
          </Docket>
        </div>
      </div>
    </Reveal>
    </MuiThemeProvider>
  );
}
