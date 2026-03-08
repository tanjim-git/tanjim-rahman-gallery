import { useState, useEffect, useCallback } from 'react';

const navLinks = ['Work', 'About', 'Services', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.toLowerCase());
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -50% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

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
            {navLinks.map((link) => {
              const id = link.toLowerCase();
              const isActive = activeSection === id;
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(id)}
                  className={`nav-link font-body text-[11px] font-medium tracking-[2.5px] uppercase transition-colors duration-300 relative pb-1 ${
                    isActive ? 'text-primary' : 'text-text-muted-warm hover:text-primary'
                  }`}
                >
                  {link}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-primary transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </button>
              );
            })}
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
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: menuOpen ? 'hsl(var(--background))' : 'transparent',
        }}
      >
        {/* Background decorative accent */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full transition-all duration-1000"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 70%)',
            transform: menuOpen ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
          }}
        />

        {navLinks.map((link, i) => {
          const id = link.toLowerCase();
          const isActive = activeSection === id;
          return (
            <button
              key={link}
              onClick={() => scrollTo(id)}
              className={`font-display text-4xl font-light transition-colors duration-300 ${
                isActive ? 'text-primary' : 'text-warm-white hover:text-primary'
              }`}
              style={{
                transform: menuOpen ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                opacity: menuOpen ? 1 : 0,
                transition: `all 0.5s cubic-bezier(0.23,1,0.32,1) ${i * 0.1}s`,
              }}
            >
              {link}
            </button>
          );
        })}
        <button
          onClick={() => scrollTo('contact')}
          className="border border-primary/60 text-primary px-10 py-3 font-body text-[11px] tracking-[2px] uppercase mt-4 hover:bg-accent-dim transition-all duration-300"
          style={{
            transform: menuOpen ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            opacity: menuOpen ? 1 : 0,
            transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1) 0.45s',
          }}
        >
          Book a Session
        </button>
      </div>
    </>
  );
}
