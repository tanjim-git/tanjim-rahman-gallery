import { useEffect, useCallback, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import JournalPreview from '@/components/JournalPreview';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import { useCustomCursor } from '@/hooks/useCustomCursor';

const Index = () => {
  useCustomCursor();
  const [loading, setLoading] = useState(true);

  const initObserver = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal, .stagger').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (loading) return;
    const cleanup1 = initObserver();
    const timeout = setTimeout(() => {
      cleanup1?.();
      initObserver();
    }, 200);
    return () => {
      clearTimeout(timeout);
      cleanup1?.();
    };
  }, [initObserver, loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div className={`grain ${loading ? 'opacity-0' : 'animate-fade-in'}`}>
        <Navbar />
        <main>
          <Hero />
          <Portfolio />
          <About />
          <Services />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
