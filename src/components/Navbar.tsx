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

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          height: 'var(--nav-height)',
          background: scrolled ? 'rgba(13,12,11,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,248,230,0.05)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[var(--max-width)] mx-auto h-full flex items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-[20px] font-normal tracking-[3px] text-warm-white hover:text-primary transition-colors duration-300"
          >
            T·R
          </button>

          {/* Center links - desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="nav-link font-body text-[11px] font-medium tracking-[2.5px] uppercase text-text-muted-warm hover:text-primary transition-colors duration-300"
              >
                {link}
              </button>
            ))}
          </div>

          {/* CTA - desktop */}
          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:block border border-primary/60 text-primary px-[24px] py-[10px] font-body text-[10px] font-medium tracking-[2px] uppercase rounded-[2px] hover:bg-accent-dim hover:border-primary transition-all duration-300"
          >
            Book a Session
          </button>

          {/* Hamburger - mobile */}
          <button
            className="md:hidden flex flex-col gap-[6px] z-50 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-[1px] bg-warm-white transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-[1px] bg-warm-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
            <span className={`block w-6 h-[1px] bg-warm-white transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-10 md:hidden transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link, i) => (
          <button
            key={link}
            onClick={() => scrollTo(link.toLowerCase())}
            className="font-display text-4xl font-light text-warm-white hover:text-primary transition-colors duration-300"
            style={{
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
              transition: `all 0.4s ease ${i * 0.08}s`,
            }}
          >
            {link}
          </button>
        ))}
        <button
          onClick={() => scrollTo('contact')}
          className="border border-primary/60 text-primary px-10 py-3 font-body text-[11px] tracking-[2px] uppercase mt-4 hover:bg-accent-dim transition-all duration-300"
          style={{
            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            opacity: menuOpen ? 1 : 0,
            transition: 'all 0.4s ease 0.4s',
          }}
        >
          Book a Session
        </button>
      </div>
    </>
  );
}
