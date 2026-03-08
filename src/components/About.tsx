import aboutImg from '@/assets/about-portrait.jpg';

const stats = [
  { value: '10+', label: 'Years' },
  { value: '340+', label: 'Sessions' },
  { value: '28', label: 'Awards' },
];

export default function About() {
  return (
    <section id="about" className="py-[var(--space-xl)] px-6">
      <div className="max-w-[var(--max-width)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left - Image */}
        <div className="reveal relative">
          <div className="relative w-full max-w-[480px] aspect-square bg-surface-2 rounded-[var(--radius-sm)] overflow-hidden">
            <img src={aboutImg} alt="Portrait of Tanjim Rahman" className="w-full h-full object-cover" />
          </div>
          {/* Offset gold border */}
          <div className="absolute top-4 left-4 w-full max-w-[480px] aspect-square border border-primary/25 rounded-[var(--radius-sm)] -z-10" />
        </div>

        {/* Right - Text */}
        <div className="stagger visible flex flex-col gap-6">
          <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-light italic text-warm-white leading-[1.15]">
            Photography is<br />the art of<br />frozen time.
          </h2>

          <div className="w-[60px] h-[1px] bg-primary" />

          <p className="font-body text-[15px] font-light leading-relaxed text-text-muted-warm">
            With over a decade behind the lens, I've had the privilege of documenting love, light, and the quiet beauty of everyday moments. My work spans fine-art portraiture, editorial campaigns, and intimate wedding stories.
          </p>

          <p className="font-body text-[15px] font-light leading-relaxed text-text-muted-warm">
            I believe great photography is never about the camera — it's about trust, patience, and the willingness to wait for the light to speak.
          </p>

          <div className="flex gap-12 mt-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl text-primary">{s.value}</div>
                <div className="font-body text-[11px] tracking-[2px] uppercase text-text-muted-warm mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <p className="font-display italic text-lg text-text-muted-warm mt-4">— Tanjim Rahman</p>
        </div>
      </div>
    </section>
  );
}
