import DynamicLeadCaptureCTA from './DynamicLeadCaptureCTA';

const TIERS = [
  {
    name: 'Foundational Wellness',
    price: '$149',
    period: '/mo',
    tagline: 'Rebuild from the inside out.',
    body: 'Support energy, digestion, and nutrient absorption naturally. The perfect starting point for anyone ready to feel balanced and nourished.',
    cta: 'Build My Foundation',
    offerTag: 'tier_foundational',
    highlight: false,
  },
  {
    name: 'Liver Cleanse RESET',
    price: '$223',
    period: '/kit',
    tagline: 'Reset your metabolism and reduce toxic load.',
    body: 'Gentle liver support including the Liver Cleanse, a 30-day meal plan, and full educational guide. Ideal for hormone imbalance, fatigue, or slow weight loss.',
    cta: 'Begin My Reset',
    offerTag: 'tier_liver_cleanse',
    highlight: true,
  },
  {
    name: '90 Day Detox & Restore',
    price: '$223',
    period: '/mo starting',
    tagline: 'Three phases: Cleanse \u2192 Rebuild \u2192 Thrive.',
    body: 'A customized full-body approach. The best option for those ready to transform their body and energy long-term.',
    cta: 'Apply to the 90 Day Program',
    offerTag: 'tier_90day',
    highlight: false,
  },
];

export default function PricingTiers() {
  return (
    <section id="pricing" className="bg-linen">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <p className="eyebrow text-center">Choose your path</p>
        <h2 className="text-3xl md:text-4xl text-center mt-3 max-w-2xl mx-auto">
          Healing isn&rsquo;t one-size-fits-all &mdash; choose the path that meets you where you are.
        </h2>
        <p className="text-center text-inkMuted mt-4 max-w-xl mx-auto">
          Every level builds on the last, because healing happens in layers, not all at once.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14 items-stretch">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 flex flex-col ${
                tier.highlight
                  ? 'bg-forest text-linen shadow-xl scale-[1.03]'
                  : 'bg-white border border-sage/40'
              }`}
            >
              <h3 className="font-display text-2xl">{tier.name}</h3>
              <p className={`mt-3 text-sm ${tier.highlight ? 'text-linen/80' : 'text-inkMuted'}`}>
                {tier.tagline}
              </p>
              <p className="mt-6">
                <span className="text-4xl font-display font-semibold">{tier.price}</span>
                <span className={tier.highlight ? 'text-linen/70' : 'text-inkMuted'}> {tier.period}</span>
              </p>
              <p className={`mt-5 leading-relaxed flex-1 ${tier.highlight ? 'text-linen/80' : 'text-inkMuted'}`}>
                {tier.body}
              </p>
              <DynamicLeadCaptureCTA
                fallbackLabel={`${tier.cta} \u2192`}
                offerTag={tier.offerTag}
                source="pricing_tiers"
                fallbackSuccessMessage="Thanks! We'll follow up with next steps by email."
                fallbackVariant={tier.highlight ? 'ochre' : 'forest'}
                className="mt-8"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}