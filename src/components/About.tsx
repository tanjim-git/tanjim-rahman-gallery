import aboutImg from '@/assets/about-portrait.jpg';

const stats = [
  { value: '10+', label: 'Years' },
  { value: '340+', label: 'Sessions' },
  { value: '28', label: 'Awards' },
];

export default function About() {
  return (
    <section id="about" className="py-[var(--space-xl)] px-6 lg:px-8 bg-surface/50">
      <div className="max-w-[var(--max-width)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left - Image */}
        <div className="reveal relative mx-auto lg:mx-0">
          <div className="relative w-full max-w-[460px] aspect-square rounded-[var(--radius-sm)] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
            <img src={aboutImg} alt="Portrait of Tanjim Rahman" className="w-full h-full object-cover" loading="lazy" />
          </div>
          {/* Offset gold border */}
          <div className="absolute top-5 left-5 w-full max-w-[460px] aspect-square border border-primary/20 rounded-[var(--radius-sm)] -z-10" />
          {/* Small accent */}
          <div className="absolute -bottom-4 -right-4 w-16 h-16 border border-primary/10 rounded-[var(--radius-sm)] hidden lg:block" />
        </div>

        {/* Right - Text */}
        <div className="stagger visible flex flex-col gap-7">
          <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-light italic text-warm-white leading-[1.15]">
            Photography is<br />the art of<br />frozen time.
          </h2>

          <div className="w-[60px] h-[1px] bg-primary/60" />

          <p className="font-body text-[15px] font-light leading-[1.85] text-text-muted-warm">
            With over a decade behind the lens, I've had the privilege of documenting love, light, and the quiet beauty of everyday moments. My work spans fine-art portraiture, editorial campaigns, and intimate wedding stories.
          </p>

          <p className="font-body text-[15px] font-light leading-[1.85] text-text-muted-warm">
            I believe great photography is never about the camera — it's about trust, patience, and the willingness to wait for the light to speak.
          </p>

          <div className="flex gap-14 mt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-[36px] font-light text-primary leading-none">{s.value}</div>
                <div className="font-body text-[10px] tracking-[2.5px] uppercase text-text-muted-warm mt-2">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-6 border-t border-border/50">
            <p className="font-display italic text-[18px] text-text-muted-warm">— Tanjim Rahman</p>
          </div>
        </div>
      </div>
    </section>
  );
}
