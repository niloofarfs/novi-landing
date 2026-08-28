/**
 * Thin analytics wrapper.
 *
 * A complete no-op unless NEXT_PUBLIC_POSTHOG_KEY is set. Synchronous and
 * failure-tolerant by contract: it must never block render and never throw.
 * Events are handed to `window.posthog` when the snippet is present, and
 * otherwise buffered on `window.__noviAnalyticsQueue` so a late-loading
 * snippet can drain them.
 */

export type CtaPosition = 'hero' | 'pilot' | 'closing';

export type AnalyticsEvent =
  | { name: 'cta_click'; props: { position: CtaPosition } }
  | {
      name: 'calculator_interact';
      props: { locations: number; staffPerLocation: number; turnoverPct: number };
    }
  | { name: 'language_chip_click'; props: { langCode: string } }
  | { name: 'scroll_depth'; props: { depth: 25 | 50 | 75 | 100 } };

type PostHogLike = { capture?: (event: string, props?: Record<string, unknown>) => void };

declare global {
  // eslint-disable-next-line no-var
  var posthog: PostHogLike | undefined;
  // eslint-disable-next-line no-var
  var __noviAnalyticsQueue: Array<{ event: string; props: Record<string, unknown> }> | undefined;
}

const ENABLED = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

/** Fire an event. Safe to call from anywhere, including during render teardown. */
export function track(event: AnalyticsEvent): void {
  if (!ENABLED || typeof window === 'undefined') return;
  try {
    const props = event.props as unknown as Record<string, unknown>;
    const ph = window.posthog;
    if (ph && typeof ph.capture === 'function') {
      ph.capture(event.name, props);
      return;
    }
    (window.__noviAnalyticsQueue ??= []).push({ event: event.name, props });
  } catch {
    // Analytics must never surface to the visitor.
  }
}

/** Debounce helper used for the calculator's settled values. */
export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  waitMs: number,
): ((...args: A) => void) & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const wrapped = (...args: A) => {
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), waitMs);
  };
  wrapped.cancel = () => {
    if (timer !== undefined) clearTimeout(timer);
  };
  return wrapped;
}
