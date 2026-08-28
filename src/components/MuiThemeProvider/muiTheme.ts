'use client';

import { createTheme } from '@mui/material/styles';

/**
 * Deliberately minimal. MUI is used for exactly two components - Slider and
 * Accordion - because they need real accessibility behaviour. This theme maps
 * those two to the design's tokens and nothing else: no palette, no
 * typography scale, no shape system that could leak into the rest of the page.
 */
export const noviTheme = createTheme({
  cssVariables: false,
  components: {
    /* ------------------------------------------------- cost calculator --- */
    MuiSlider: {
      defaultProps: {
        size: 'medium',
        valueLabelDisplay: 'off',
      },
      styleOverrides: {
        root: {
          height: 8,
          padding: '15px 0',
          display: 'block',
          width: '100%',
          color: 'var(--amber)',
          touchAction: 'pan-y',
          '&.Mui-focusVisible': {
            outline: 'none',
          },
        },
        rail: {
          height: 8,
          opacity: 1,
          borderRadius: 999,
          background: 'linear-gradient(180deg, var(--grey-500), var(--grey-300))',
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.35)',
        },
        track: {
          height: 8,
          border: 'none',
          borderRadius: 999,
          background: 'linear-gradient(180deg, var(--amber), var(--amber-deep))',
        },
        thumb: {
          width: 26,
          height: 26,
          background: 'linear-gradient(160deg, var(--paper-raised), var(--grey-300))',
          border: '1px solid var(--grey-600)',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          '&:hover, &.Mui-focusVisible, &.Mui-active': {
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          },
          '&.Mui-focusVisible': {
            outline: '2px solid var(--amber-text)',
            outlineOffset: 3,
          },
          '&::before, &::after': {
            display: 'none',
          },
        },
      },
    },

    /* -------------------------------------------------------------- faq --- */
    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
        elevation: 0,
        square: true,
      },
      styleOverrides: {
        root: {
          background: 'transparent',
          color: 'var(--grey-800)',
          borderBottom: '1px dashed var(--grey-200)',
          '&::before': { display: 'none' },
          '&:last-of-type': { borderBottom: 'none' },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 52,
          padding: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: '13.5px',
          letterSpacing: '0.04em',
          color: 'var(--grey-800)',
          '&.Mui-expanded': { minHeight: 52 },
          '&.Mui-focusVisible': {
            background: 'transparent',
            outline: '2px solid var(--amber-text)',
            outlineOffset: 2,
          },
        },
        content: {
          margin: '18px 0',
          paddingRight: 14,
          '&.Mui-expanded': { margin: '18px 0' },
        },
        expandIconWrapper: {
          fontFamily: 'var(--font-mono)',
          fontSize: 17,
          lineHeight: 1,
          color: 'var(--amber-text)',
          transform: 'none',
          '&::after': { content: '"+"' },
          '&.Mui-expanded': {
            transform: 'none',
            '&::after': { content: '"–"' },
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0 0 18px',
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          lineHeight: 1.6,
          color: 'var(--text-on-paper-muted)',
          maxWidth: '56ch',
          textWrap: 'pretty',
        },
      },
    },
  },
});
