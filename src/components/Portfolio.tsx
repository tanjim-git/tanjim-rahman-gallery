import { useState } from 'react';

const categories = ['All', 'Portraits', 'Weddings', 'Editorial', 'Landscapes'];

const photos = [
  { title: 'Golden Hour', category: 'Portraits', h: 320 },
  { title: 'The Ceremony', category: 'Weddings', h: 440 },
  { title: 'Vogue Dhaka', category: 'Editorial', h: 380 },
  { title: 'Monsoon Light', category: 'Landscapes', h: 500 },
  { title: 'Stillness', category: 'Portraits', h: 300 },
  { title: 'First Dance', category: 'Weddings', h: 420 },
  { title: 'Heritage', category: 'Editorial', h: 360 },
  { title: 'River Dawn', category: 'Landscapes', h: 480 },
  { title: 'Intimacy', category: 'Portraits', h: 340 },
];

export default function Portfolio() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? photos : photos.filter((p) => p.category === active);

  return (
    <section id="work" className="py-[var(--space-xl)] px-6">
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="reveal text-center mb-16">
          <span className="font-body text-[11px] tracking-[3px] uppercase text-primary">Selected Work</span>
          <h2 className="font-display text-[clamp(36px,4vw,56px)] font-light text-warm-white mt-3">
            A Visual Diary
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="reveal flex justify-center gap-6 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-body text-[12px] tracking-[1.5px] uppercase pb-2 transition-all border-b ${
                active === cat
                  ? 'text-primary border-primary'
                  : 'text-text-muted-warm border-transparent hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="masonry">
          {filtered.map((photo, i) => (
            <div
              key={photo.title + i}
              className="reveal group relative overflow-hidden rounded-[var(--radius-sm)] bg-surface-2"
              style={{ height: photo.h }}
            >
              {/* Gradient placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface-2 to-surface flex items-center justify-center">
                <span className="font-body text-[12px] text-text-muted-warm tracking-wider">
                  [ {photo.title} ]
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="font-body text-[10px] tracking-[2px] uppercase text-primary">{photo.category}</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-display text-lg text-warm-white">{photo.title}</span>
                  <span className="text-primary">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal flex justify-center mt-12">
          <button className="border border-primary/30 text-primary px-10 py-3 font-body text-[11px] tracking-[2px] uppercase hover:bg-accent-dim transition-colors rounded-[2px]">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
}
