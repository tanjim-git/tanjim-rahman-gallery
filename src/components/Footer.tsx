const navLinks = ['Work', 'About', 'Services', 'Contact'];
const socials = [
  { name: 'Instagram', href: 'https://instagram.com/tanjimrahman.photo' },
  { name: 'Facebook', href: '#' },
  { name: 'Behance', href: '#' },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/30 pt-20 pb-10 px-6 lg:px-8">
      <div className="max-w-[var(--max-width)] mx-auto">
        {/* Top area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <span className="font-display text-[28px] tracking-[5px] text-warm-white">T·R</span>
            <p className="font-display italic text-[14px] text-text-muted-warm mt-3">
              Light. Story. Emotion.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <span className="font-body text-[9px] tracking-[3px] uppercase text-text-muted-warm/50 mb-4 block">Navigation</span>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="text-left font-body text-[13px] text-text-muted-warm hover:text-primary transition-colors duration-300"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <span className="font-body text-[9px] tracking-[3px] uppercase text-text-muted-warm/50 mb-4 block">Follow</span>
            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] text-text-muted-warm hover:text-primary transition-colors duration-300"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-body text-[11px] text-text-muted-warm/50">
            © 2025 Tanjim Rahman. All rights reserved.
          </span>
          <span className="font-body text-[11px] text-text-muted-warm/50 italic">
            Designed with intention. Shot with heart.
          </span>
        </div>
      </div>
    </footer>
  );
}
