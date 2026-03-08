import { useSiteSettings } from '@/hooks/useSiteSettings';

const defaultPackages = [
  {
    num: 'I',
    name: 'Portrait Sessions',
    tagline: 'Your story, beautifully told',
    tiers: [
      { tier: 'Essential', price: '৳8,000', features: ['1-hour session', 'Studio or outdoor', '15 retouched images', 'Online gallery'] },
      { tier: 'Signature', price: '৳15,000', features: ['2-hour session', 'Wardrobe consultation', '30 retouched images', 'Online gallery', '5 fine art prints'], popular: true },
      { tier: 'Bespoke', price: '৳25,000', features: ['Half-day session', 'Styling & creative direction', '50+ retouched images', 'Online gallery', '10 fine art prints', 'Custom album'] },
    ],
  },
  {
    num: 'II',
    name: 'Wedding Stories',
    tagline: 'Every emotion, every detail',
    tiers: [
      { tier: 'Ceremony', price: '৳45,000', features: ['6-hour coverage', '1 photographer', '200+ edited images', 'Online gallery', 'Engagement mini-session'] },
      { tier: 'Full Day', price: '৳85,000', features: ['12-hour coverage', '2 photographers', '500+ edited images', 'Online gallery', 'Engagement session', 'Wedding album', 'Same-day highlights'], popular: true },
      { tier: 'Legacy', price: '৳1,50,000', features: ['Multi-day coverage', '2 photographers + assistant', '800+ edited images', 'Online gallery', 'Engagement session', 'Premium album', 'Same-day highlights', 'Fine art prints collection'] },
    ],
  },
  {
    num: 'III',
    name: 'Editorial & Commercial',
    tagline: 'Vision meets precision',
    tiers: [
      { tier: 'Campaign', price: '৳25,000', features: ['Half-day shoot', '10 final images', 'Basic retouching', 'Commercial license'] },
      { tier: 'Editorial', price: '৳50,000', features: ['Full-day shoot', '25 final images', 'Advanced retouching', 'Commercial license', 'Art direction support'], popular: true },
      { tier: 'Production', price: 'Custom', features: ['Multi-day production', 'Unlimited final images', 'Full post-production', 'Commercial license', 'Full creative team', 'Location scouting'] },
    ],
  },
];

export default function Services() {
  const { data: settings } = useSiteSettings<{ packages: typeof defaultPackages }>('services', { packages: defaultPackages });
  const packages = settings.packages || defaultPackages;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-[var(--space-xl)] px-6 lg:px-8">
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="reveal text-center mb-20">
          <span className="font-body text-[10px] tracking-[4px] uppercase text-primary font-medium">Investment</span>
          <h2 className="font-display text-[clamp(36px,4vw,56px)] font-light text-warm-white mt-4">
            Packages & Pricing
          </h2>
          <p className="font-body text-[14px] text-text-muted-warm mt-4 max-w-lg mx-auto leading-relaxed">
            Every session is crafted with intention — tailored to your story, your vision, your moment. Choose a package or let's create something custom.
          </p>
        </div>

        {packages.map((pkg: any, pkgIdx: number) => (
          <div key={pkg.num} className={`reveal ${pkgIdx > 0 ? 'mt-24' : ''}`}>
            <div className="flex items-center gap-6 mb-10">
              <span className="font-display text-[20px] text-text-muted-warm/40 tracking-wider">{pkg.num}</span>
              <div>
                <h3 className="font-display italic text-[28px] text-warm-white leading-tight">{pkg.name}</h3>
                <p className="font-body text-[12px] text-text-muted-warm mt-1">{pkg.tagline}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {(pkg.tiers || []).map((tier: any) => (
                <div
                  key={tier.tier}
                  className={`group relative bg-background border rounded-[var(--radius-sm)] p-8 lg:p-10 flex flex-col transition-all duration-500 hover:border-primary/25 ${
                    tier.popular ? 'border-primary/30 ring-1 ring-primary/10' : 'border-border/30'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-8 bg-primary text-primary-foreground font-body text-[8px] tracking-[2px] uppercase px-3 py-1 rounded-sm">
                      Most Popular
                    </span>
                  )}
                  <span className="font-body text-[10px] tracking-[3px] uppercase text-text-muted-warm">{tier.tier}</span>
                  <div className="mt-4 mb-6">
                    <span className="font-display text-[36px] font-light text-warm-white leading-none">{tier.price}</span>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {(tier.features || []).map((f: string) => (
                      <li key={f} className="flex items-start gap-3">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
                          <path d="M3 7L6 10L11 4" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-body text-[13px] text-text-muted-warm leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollTo('contact')}
                    className={`w-full font-body text-[10px] tracking-[2px] uppercase py-3 rounded-[2px] transition-all duration-300 ${
                      tier.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border border-primary/40 text-primary hover:bg-accent-dim hover:border-primary/60'
                    }`}
                  >
                    {tier.price === 'Custom' ? 'Get a Quote' : 'Book Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="reveal mt-16 text-center">
          <p className="font-body text-[13px] text-text-muted-warm leading-relaxed max-w-md mx-auto">
            Don't see what you need? Every project is unique. <button onClick={() => scrollTo('contact')} className="text-primary hover:text-warm-white transition-colors">Let's discuss a custom package</button> tailored to your vision.
          </p>
        </div>
      </div>
    </section>
  );
}
