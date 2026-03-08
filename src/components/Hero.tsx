import heroImg from '@/assets/hero-portrait.jpg';
import { useParallax } from '@/hooks/useParallax';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const defaultHero = {
  name: 'Tanjim Rahman',
  tagline: 'Fine Art & Portrait Photography',
  description: 'Capturing light, telling stories, and turning fleeting moments into timeless art — from Dhaka to the world.',
  cta_text: 'View Portfolio',
  cta2_text: 'Book a Session',
  available_text: 'Available for 2026 bookings',
};

export default function Hero() {
  const { data: hero } = useSiteSettings('hero', defaultHero);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const { ref: imageRef, offset: imageOffset } = useParallax(0.12);
  const { ref: textRef, offset: textOffset } = useParallax(0.06);
  const { ref: glowRef, offset: glowOffset } = useParallax(-0.08);
  const { ref: accentRef, offset: accentOffset } = useParallax(0.18);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, hsl(37 46% 61% / 0.04) 0%, transparent 70%)',
          transform: `translate(-50%, calc(-50% + ${glowOffset}px))`,
        }}
      />

      <div className="max-w-[var(--max-width)] mx-auto w-full px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center pt-[calc(var(--nav-height)+20px)]">
        <div
          ref={textRef}
          className="stagger visible flex flex-col gap-7 py-12 lg:py-0 will-change-transform"
          style={{ transform: `translateY(${textOffset}px)` }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-primary" />
            <span className="font-body text-[10px] tracking-[3.5px] uppercase text-primary font-medium">
              {hero.tagline}
            </span>
          </div>

          <h1 className="font-display text-[clamp(48px,6vw,88px)] font-light leading-[1.05] tracking-[-1px] text-warm-white">
            Capturing<br />
            <span className="italic">Light,</span><br />
            Telling Stories.
          </h1>

          <p className="font-body text-[15px] font-light leading-[1.8] text-text-muted-warm max-w-[420px]">
            {hero.description}
          </p>

          <div className="flex items-center gap-5 mt-3 flex-wrap">
            <button
              onClick={() => scrollTo('work')}
              className="group bg-primary text-accent-foreground px-9 py-[13px] font-body text-[10px] font-medium tracking-[2px] uppercase rounded-[2px] transition-all duration-300 hover:shadow-[0_8px_30px_-8px_hsl(37_46%_61%_/_0.35)]"
            >
              {hero.cta_text}
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-text-muted-warm font-body text-[12px] tracking-[1px] hover:text-primary transition-colors duration-300 group"
            >
              See My Story <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        <div ref={imageRef} className="relative flex justify-center lg:justify-end will-change-transform" style={{ transform: `translateY(${imageOffset}px)` }}>
          <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-[var(--radius-sm)] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
            <img src={heroImg} alt={`Portrait by ${hero.name}`} className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-3 border border-primary/15 rounded-[2px] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </div>
          <div
            ref={accentRef}
            className="absolute -bottom-6 -left-6 w-24 h-24 border border-primary/10 rounded-[var(--radius-sm)] hidden lg:block will-change-transform"
            style={{ transform: `translateY(${accentOffset}px)` }}
          />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="relative w-[1px] h-10 bg-primary/15 overflow-hidden">
          <div className="scroll-dot absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[2px] rounded-full bg-primary" />
        </div>
        <span className="font-body text-[9px] tracking-[3px] uppercase text-text-muted-warm">Scroll</span>
      </div>
    </section>
  );
}
