/**
 * Single source for the booking destination.
 *
 * Reads NEXT_PUBLIC_BOOKING_URL (inlined at build time). Falls back to "#"
 * and warns once in development so a misconfigured deploy is loud locally
 * and silent in front of a visitor.
 */

let warned = false;

export function getBookingUrl(): string {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL;
  if (url) return url;

  if (process.env.NODE_ENV === 'development' && !warned) {
    warned = true;
    console.warn(
      '[novi] NEXT_PUBLIC_BOOKING_URL is not set - every "Book 15 minutes" CTA points at "#". See .env.example.',
    );
  }
  return '#';
}
