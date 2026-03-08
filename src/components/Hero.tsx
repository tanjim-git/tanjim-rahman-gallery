import heroImg from '@/assets/hero-portrait.jpg';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle radial glow behind hero */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(37 46% 61% / 0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-[var(--max-width)] mx-auto w-full px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center pt-[calc(var(--nav-height)+20px)]">
        {/* Left */}
        <div className="stagger visible flex flex-col gap-7 py-12 lg:py-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-primary" />
            <span className="font-body text-[10px] tracking-[3.5px] uppercase text-primary font-medium">
              Fine Art & Portrait Photography
            </span>
          </div>

          <h1 className="font-display text-[clamp(48px,6vw,88px)] font-light leading-[1.05] tracking-[-1px] text-warm-white">
            Capturing<br />
            <span className="italic">Light,</span><br />
            Telling Stories.
          </h1>

          <p className="font-body text-[15px] font-light leading-[1.8] text-text-muted-warm max-w-[420px]">
            Based in Dhaka, Bangladesh. Available worldwide for editorial, portrait, and wedding commissions.
          </p>

          <div className="flex items-center gap-5 mt-3 flex-wrap">
            <button
              onClick={() => scrollTo('work')}
              className="group bg-primary text-accent-foreground px-9 py-[13px] font-body text-[10px] font-medium tracking-[2px] uppercase rounded-[2px] transition-all duration-300 hover:shadow-[0_8px_30px_-8px_hsl(37_46%_61%_/_0.35)]"
            >
              View Portfolio
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-text-muted-warm font-body text-[12px] tracking-[1px] hover:text-primary transition-colors duration-300 group"
            >
              See My Story <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-[var(--radius-sm)] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
            <img
              src={heroImg}
              alt="Portrait by Tanjim Rahman"
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Gold frame inset */}
            <div className="absolute inset-3 border border-primary/15 rounded-[2px] pointer-events-none" />
            {/* Bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </div>
          {/* Floating accent element */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-primary/10 rounded-[var(--radius-sm)] hidden lg:block" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="relative w-[1px] h-10 bg-primary/15 overflow-hidden">
          <div className="scroll-dot absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[2px] rounded-full bg-primary" />
        </div>
        <span className="font-body text-[9px] tracking-[3px] uppercase text-text-muted-warm">Scroll</span>
      </div>
    </section>
  );
}
