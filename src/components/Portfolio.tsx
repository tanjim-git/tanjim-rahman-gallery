import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-6.jpg';
import portfolio7 from '@/assets/portfolio-7.jpg';
import portfolio8 from '@/assets/portfolio-8.jpg';
import portfolio9 from '@/assets/portfolio-9.jpg';
import Lightbox from '@/components/Lightbox';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const categories = ['All', 'Portraits', 'Weddings', 'Editorial', 'Landscapes'];

const fallbackPhotos = [
  { title: 'Golden Hour', category: 'Portraits', h: 340, img: portfolio1 },
  { title: 'The Ceremony', category: 'Weddings', h: 460, img: portfolio2 },
  { title: 'Vogue Dhaka', category: 'Editorial', h: 380, img: portfolio3 },
  { title: 'Monsoon Light', category: 'Landscapes', h: 520, img: portfolio4 },
  { title: 'Stillness', category: 'Portraits', h: 310, img: portfolio5 },
  { title: 'First Dance', category: 'Weddings', h: 430, img: portfolio6 },
  { title: 'Heritage', category: 'Editorial', h: 370, img: portfolio7 },
  { title: 'River Dawn', category: 'Landscapes', h: 490, img: portfolio8 },
  { title: 'Intimacy', category: 'Portraits', h: 350, img: portfolio9 },
];

type Photo = { title: string; category: string; h: number; img: string };
export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [photos, setPhotos] = useState<Photo[]>(fallbackPhotos);

  useEffect(() => {
    const loadPhotos = async () => {
      const { data } = await supabase
        .from('portfolio_photos')
        .select('*')
        .order('display_order', { ascending: true });
      if (data && data.length > 0) {
        setPhotos(data.map((p) => ({
          title: p.title,
          category: p.category,
          h: 340 + Math.floor(Math.random() * 180),
          img: p.image_url,
        })));
      }
    };
    loadPhotos();
  }, []);

  const filtered = active === 'All' ? photos : photos.filter((p) => p.category === active);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <>
      <section id="work" className="py-[var(--space-xl)] px-6 lg:px-8">
        <div className="max-w-[var(--max-width)] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <span className="font-body text-[10px] tracking-[4px] uppercase text-primary font-medium">Selected Work</span>
            <h2 className="font-display text-[clamp(36px,4vw,56px)] font-light text-warm-white mt-4">
              A Visual Diary
            </h2>
            <p className="font-body text-[14px] text-text-muted-warm mt-4 max-w-md mx-auto leading-relaxed">
              A curated collection of moments, stories, and light — captured across portraits, weddings, and landscapes.
            </p>
          </ScrollReveal>

          <ScrollReveal className="flex justify-center gap-4 sm:gap-8 mb-14 flex-wrap" delay={0.15}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActive(cat); setLightboxIndex(null); }}
                className={`font-body text-[11px] tracking-[2px] uppercase pb-2 transition-all duration-300 border-b-[1.5px] ${
                  active === cat
                    ? 'text-primary border-primary'
                    : 'text-text-muted-warm border-transparent hover:text-foreground hover:border-primary/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>

          <StaggerContainer className="masonry" staggerDelay={0.08}>
            {filtered.map((photo, i) => (
              <StaggerItem
                key={photo.title + active + i}
                className="group relative overflow-hidden rounded-[var(--radius-sm)] bg-surface-2 cursor-none"
                style={{ height: photo.h }}
              >
                <div className="absolute inset-0" onClick={() => openLightbox(i)}>
                  <img
                    src={photo.img}
                    alt={photo.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <span className="font-body text-[9px] tracking-[3px] uppercase text-primary font-medium transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      {photo.category}
                    </span>
                    <div className="flex items-center justify-between mt-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      <span className="font-display text-xl text-warm-white">{photo.title}</span>
                      <span className="text-primary text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal className="flex justify-center mt-14" delay={0.2}>
            <button className="border border-primary/25 text-primary px-12 py-[13px] font-body text-[10px] tracking-[2.5px] uppercase hover:bg-accent-dim hover:border-primary/40 transition-all duration-300 rounded-[2px]">
              Load More
            </button>
          </ScrollReveal>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}
    </>
  );
}
