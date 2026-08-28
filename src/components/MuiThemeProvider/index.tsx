'use client';

import { ThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';

import { noviTheme } from './muiTheme';

/**
 * The app shell's only MUI boundary besides AppRouterCacheProvider. Children
 * pass straight through, so every section below stays a server component.
 */
export function MuiThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={noviTheme}>{children}</ThemeProvider>;
}
