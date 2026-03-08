import aboutImg from '@/assets/about-portrait.jpg';
import { useParallax } from '@/hooks/useParallax';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const defaultAbout = {
  heading: 'The Eye Behind the Lens',
  subheading: 'About Tanjim',
  bio: "With over a decade behind the lens, I've had the privilege of documenting love, light, and the quiet beauty of everyday moments. My work spans fine-art portraiture, editorial campaigns, and intimate wedding stories.\n\nI believe great photography is never about the camera — it's about trust, patience, and the willingness to wait for the light to speak.",
  stats: [
    { value: '12+', label: 'Years of Experience' },
    { value: '800+', label: 'Stories Captured' },
    { value: '15+', label: 'Countries' },
  ],
};

export default function About() {
  const { data: about } = useSiteSettings('about', defaultAbout);

  const { ref: imageRef, offset: imageOffset } = useParallax(0.1);
  const { ref: borderRef, offset: borderOffset } = useParallax(0.16);
  const { ref: textRef, offset: textOffset } = useParallax(0.05);

  const paragraphs = about.bio.split('\n\n').filter(Boolean);

  return (
    <section id="about" className="py-[var(--space-xl)] px-6 lg:px-8 bg-surface/50 overflow-hidden">
      <div className="max-w-[var(--max-width)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="reveal relative mx-auto lg:mx-0">
          <div
            ref={imageRef}
            className="relative w-full max-w-[460px] aspect-square rounded-[var(--radius-sm)] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] will-change-transform"
            style={{ transform: `translateY(${imageOffset}px)` }}
          >
            <img src={aboutImg} alt="Portrait of Tanjim Rahman" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div
            ref={borderRef}
            className="absolute top-5 left-5 w-full max-w-[460px] aspect-square border border-primary/20 rounded-[var(--radius-sm)] -z-10 will-change-transform"
            style={{ transform: `translateY(${borderOffset}px)` }}
          />
          <div className="absolute -bottom-4 -right-4 w-16 h-16 border border-primary/10 rounded-[var(--radius-sm)] hidden lg:block" />
        </div>

        <div
          ref={textRef}
          className="stagger visible flex flex-col gap-7 will-change-transform"
          style={{ transform: `translateY(${textOffset}px)` }}
        >
          <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-light italic text-warm-white leading-[1.15]">
            {about.heading}
          </h2>

          <div className="w-[60px] h-[1px] bg-primary/60" />

          {paragraphs.map((p: string, i: number) => (
            <p key={i} className="font-body text-[15px] font-light leading-[1.85] text-text-muted-warm">
              {p}
            </p>
          ))}

          <div className="flex gap-14 mt-6">
            {(about.stats || []).map((s: any) => (
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
