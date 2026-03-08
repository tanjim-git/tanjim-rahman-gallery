import { useRef } from 'react';

interface Photo {
  title: string;
  category: string;
  img: string;
}

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ photos, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const photo = photos[currentIndex];
  const touchStart = useRef<number | null>(null);
  const touchDelta = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart.current !== null) {
      touchDelta.current = e.touches[0].clientX - touchStart.current;
    }
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    if (touchDelta.current > threshold) onPrev();
    else if (touchDelta.current < -threshold) onNext();
    touchStart.current = null;
    touchDelta.current = 0;
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-text-muted-warm hover:text-warm-white transition-colors duration-300"
        aria-label="Close"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="2" y1="2" x2="18" y2="18" />
          <line x1="18" y1="2" x2="2" y2="18" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-7 left-6 z-10 font-body text-[11px] tracking-[2px] text-text-muted-warm">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Prev arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 z-10 w-12 h-12 flex items-center justify-center text-text-muted-warm hover:text-primary transition-colors duration-300 group"
        aria-label="Previous"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 group-hover:-translate-x-0.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 z-10 w-12 h-12 flex items-center justify-center text-text-muted-warm hover:text-primary transition-colors duration-300 group"
        aria-label="Next"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 group-hover:translate-x-0.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative z-[1] max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={photo.img}
          src={photo.img}
          alt={photo.title}
          className="max-w-full max-h-[78vh] object-contain rounded-[var(--radius-sm)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] animate-[fadeIn_0.3s_ease]"
        />
        <div className="mt-5 text-center">
          <span className="font-body text-[9px] tracking-[3px] uppercase text-primary font-medium">{photo.category}</span>
          <h3 className="font-display text-2xl text-warm-white mt-1">{photo.title}</h3>
        </div>
      </div>
    </div>
  );
}
