import { PriceCalculator } from '@/components/calculator/price-calculator';
import { CtaSection } from '@/components/site/sections/cta-section';
import { DiySection } from '@/components/site/sections/diy-section';
import { FaqSection } from '@/components/site/sections/faq-section';
import { HeroSection } from '@/components/site/sections/hero-section';
import { PainSection } from '@/components/site/sections/pain-section';
import { PortalSection } from '@/components/site/sections/portal-section';
import { PricingSection } from '@/components/site/sections/pricing-section';
import { ProcessSection } from '@/components/site/sections/process-section';
import { ServicesSection } from '@/components/site/sections/services-section';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteNav } from '@/components/site/site-nav';
import { sx } from '@/lib/site/sx';

export function HomePage() {
  return (
    <div style={sx("font-family:'Barlow',sans-serif;color:#1E2522")}>
      <SiteNav />
      <HeroSection />
      <DiySection />
      <PainSection />
      <PricingSection />
      <ServicesSection />
      <PortalSection />
      <ProcessSection />
      <FaqSection />
      <CtaSection>
        <PriceCalculator />
      </CtaSection>
      <SiteFooter />
    </div>
  );
}
