import type { Metadata, Viewport } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import {
  Barlow_Condensed,
  IBM_Plex_Mono,
  Noto_Sans,
  Noto_Sans_Arabic,
} from 'next/font/google';
import type { ReactNode } from 'react';

import { meta } from '@/content/site';

import './globals.css';

/* Self-hosted by next/font at build time - no runtime font requests.
 *
 * `display: 'swap'` is safe here only because the layout is metric-proof: the
 * one-line labels that used to re-wrap when these faces landed (the section
 * eyebrows, the header CTA) now have reserved boxes, so the swap changes
 * glyphs without moving anything. Measured CLS is 0. `display: 'optional'`
 * scored identically but costs the brand type on a first, slow visit, so
 * 'swap' wins. If you add a new single-line label in a display or mono face,
 * give it the same treatment - see .eyebrow in any section's CSS module.
 *
 * Weights are limited to the ones actually used (400/600/700); adding one
 * costs roughly 15-30 KB on the critical path. */

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
  preload: true,
});

const body = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
  preload: true,
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  preload: true,
});

/* Arabic carries real content - the Arabic and Urdu exchanges - so it is worth
   its weight. Not preloaded: it would compete with LCP for bandwidth.
   Devanagari is deliberately absent; see --font-devanagari in globals.css. */

const arabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400'],
  variable: '--font-noto-sans-arabic',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: 'website',
    locale: 'en_AE',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#12160F',
  width: 'device-width',
  initialScale: 1,
};

const fontVariables = [
  display.variable,
  body.variable,
  mono.variable,
  arabic.variable,
].join(' ');

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={meta.locale} dir="ltr" className={fontVariables}>
      <body>
        <AppRouterCacheProvider options={{ key: 'novi', enableCssLayer: true }}>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
