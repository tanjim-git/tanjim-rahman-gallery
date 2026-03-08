const navLinks = ['Work', 'About', 'Services', 'Contact'];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="font-display text-[24px] tracking-[4px] text-warm-white">T·R</span>
          <p className="font-body text-[13px] tracking-[2px] text-text-muted-warm italic">
            Light. Story. Emotion.
          </p>

          <div className="flex gap-6 mt-4">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="font-body text-[11px] tracking-[1.5px] uppercase text-text-muted-warm hover:text-primary transition-colors"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Social icons placeholder */}
          <div className="flex gap-6 mt-2">
            {['Instagram', 'Facebook', 'Behance'].map((s) => (
              <span key={s} className="font-body text-[11px] tracking-[1px] uppercase text-text-muted-warm hover:text-primary transition-colors cursor-none">
                {s}
              </span>
            ))}
          </div>

          <div className="w-full border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-body text-[11px] text-text-muted-warm">
              © 2025 Tanjim Rahman. All rights reserved.
            </span>
            <span className="font-body text-[11px] text-text-muted-warm italic">
              Designed with intention. Shot with heart.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
