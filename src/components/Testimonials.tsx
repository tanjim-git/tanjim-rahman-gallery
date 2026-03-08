const testimonials = [
  {
    quote: "Tanjim has a rare gift — he doesn't just take photos, he captures the feeling of a moment.",
    name: 'Ayesha Karim',
    role: 'Wedding Client',
  },
  {
    quote: 'Our brand editorial came out beyond expectations. Pure artistry combined with professionalism.',
    name: 'Rafi Islam',
    role: 'Creative Director',
  },
  {
    quote: 'The portrait session was so comfortable and the final images genuinely moved me to tears.',
    name: 'Sara Hossain',
    role: 'Portrait Client',
  },
];

export default function Testimonials() {
  return (
    <section className="py-[var(--space-xl)] px-6 bg-surface">
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="reveal text-center mb-16">
          <span className="font-body text-[11px] tracking-[3px] uppercase text-primary">Kind Words</span>
          <h2 className="font-display text-[clamp(36px,4vw,56px)] font-light text-warm-white mt-3">Testimonials</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="reveal bg-background p-8 rounded-[var(--radius-sm)] flex flex-col gap-4">
              <span className="font-display text-6xl text-primary/20 leading-none">"</span>
              <p className="font-display italic text-[19px] leading-relaxed text-warm-white -mt-6">
                {t.quote}
              </p>
              <div className="mt-auto pt-4 border-t border-border">
                <div className="font-body text-[13px] text-warm-white">{t.name}</div>
                <div className="font-body text-[11px] text-text-muted-warm tracking-[1px] uppercase">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
