import { useState, useEffect } from 'react';

const navLinks = ['Work', 'About', 'Services', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          height: 'var(--nav-height)',
          background: scrolled ? 'rgba(13,12,11,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="max-w-[var(--max-width)] mx-auto h-full flex items-center justify-between px-6">
          {/* Logo */}
          <span className="font-display text-[20px] font-normal tracking-[3px] text-warm-white">
            T·R
          </span>

          {/* Center links - desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="nav-link font-body text-[12px] font-medium tracking-[2px] uppercase text-text-muted-warm hover:text-primary transition-colors"
              >
                {link}
              </button>
            ))}
          </div>

          {/* CTA - desktop */}
          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:block border border-primary text-primary px-[22px] py-[9px] font-body text-[11px] font-medium tracking-[1.5px] uppercase rounded-[2px] hover:bg-accent-dim transition-colors"
          >
            Book a Session
          </button>

          {/* Hamburger - mobile */}
          <button
            className="md:hidden flex flex-col gap-[5px] z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-[1px] bg-warm-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-6 h-[1px] bg-warm-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[1px] bg-warm-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="font-display text-3xl text-warm-white hover:text-primary transition-colors"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="border border-primary text-primary px-8 py-3 font-body text-[11px] tracking-[1.5px] uppercase mt-4"
          >
            Book a Session
          </button>
        </div>
      )}
    </>
  );
}
