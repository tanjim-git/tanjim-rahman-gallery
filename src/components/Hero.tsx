import heroImg from '@/assets/hero-portrait.jpg';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="max-w-[var(--max-width)] mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center pt-[var(--nav-height)]">
        {/* Left */}
        <div className="stagger visible flex flex-col gap-6 py-12 lg:py-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-primary" />
            <span className="font-body text-[11px] tracking-[3px] uppercase text-primary">
              Fine Art & Portrait Photography
            </span>
          </div>

          <h1 className="font-display text-[clamp(48px,6vw,88px)] font-light leading-[1.05] tracking-[-1px] text-warm-white">
            Capturing<br />Light,<br />Telling Stories.
          </h1>

          <p className="font-body text-[15px] font-light leading-relaxed text-text-muted-warm max-w-md">
            Based in Dhaka, Bangladesh. Available worldwide for editorial, portrait, and wedding commissions.
          </p>

          <div className="flex items-center gap-4 mt-2 flex-wrap">
            <button
              onClick={() => scrollTo('work')}
              className="bg-primary text-accent-foreground px-8 py-3 font-body text-[11px] font-medium tracking-[1.5px] uppercase rounded-[2px] hover:opacity-90 transition-opacity"
            >
              View Portfolio
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-primary font-body text-[12px] tracking-[1px] hover:opacity-70 transition-opacity"
            >
              See My Story →
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[400px] aspect-[3/4] bg-surface-2 rounded-[var(--radius-sm)] overflow-hidden">
            <img src={heroImg} alt="Portrait by Tanjim Rahman" className="w-full h-full object-cover" />
            {/* Gold frame inset */}
            <div className="absolute inset-3 border border-primary/20 rounded-[2px] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="relative w-[1px] h-8 bg-primary/20">
          <div className="scroll-dot absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-primary" />
        </div>
        <span className="font-body text-[10px] tracking-[2px] uppercase text-text-muted-warm">Scroll</span>
      </div>
    </section>
  );
}
