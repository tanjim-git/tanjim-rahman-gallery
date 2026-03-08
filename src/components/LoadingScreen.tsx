import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'logo' | 'exit'>('logo');

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase('exit'), 1600);
    const doneTimer = setTimeout(onComplete, 2200);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Thin gold line animating width */}
      <div className="absolute top-0 left-0 h-[1px] bg-primary animate-[loaderLine_1.6s_ease-in-out_forwards]" />

      {/* Logo name */}
      <h1
        className="font-display text-[clamp(28px,5vw,48px)] font-light text-warm-white tracking-[6px] animate-[loaderReveal_1s_ease-out_0.2s_both]"
      >
        Tanjim Rahman
      </h1>

      {/* Tagline */}
      <span className="font-body text-[10px] tracking-[4px] uppercase text-primary mt-3 animate-[loaderReveal_0.8s_ease-out_0.7s_both]">
        Fine Art Photography
      </span>
    </div>
  );
}
