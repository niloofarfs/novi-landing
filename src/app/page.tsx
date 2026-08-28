import { ClosingCta } from '@/components/ClosingCta';
import { CostCalculator } from '@/components/CostCalculator';
import { Faq } from '@/components/Faq';
import { Founders } from '@/components/Founders';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Pilot } from '@/components/Pilot';
import { ScrollDepth } from '@/components/ScrollDepth';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { Trust } from '@/components/Trust';
import { nav } from '@/content/site';

/** Single static route. No server data, no API routes - fully prerendered. */
export default function Page() {
  return (
    <>
      <a className="skipLink" href="#main">
        {nav.skipToContent}
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <CostCalculator />
        <HowItWorks />
        <Trust />
        <Pilot />
        <Founders />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
      <ScrollDepth />
    </>
  );
}
