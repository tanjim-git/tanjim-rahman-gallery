import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCustomCursor } from '@/hooks/useCustomCursor';

const Index = () => {
  useScrollReveal();
  useCustomCursor();

  useEffect(() => {
    // Re-observe after initial render
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
          });
        },
        { threshold: 0.1 }
      );
      document.querySelectorAll('.reveal, .stagger').forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="grain">
      <Navbar />
      <Hero />
      <Portfolio />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
