const services = [
  {
    num: 'I',
    name: 'Portrait Sessions',
    desc: 'Intimate one-on-one portrait sessions for individuals, families, and professionals. Studio or outdoor.',
    price: 'Starting at ৳8,000',
  },
  {
    num: 'II',
    name: 'Wedding Stories',
    desc: 'Full-day wedding coverage capturing candid moments, the ceremony, and all the emotions in between.',
    price: 'Starting at ৳45,000',
  },
  {
    num: 'III',
    name: 'Editorial & Commercial',
    desc: 'Brand campaigns, magazine editorials, and product photography tailored to your creative vision.',
    price: 'Starting at ৳25,000',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-[var(--space-xl)] px-6 lg:px-8">
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="reveal text-center mb-16">
          <span className="font-body text-[10px] tracking-[4px] uppercase text-primary font-medium">What I Offer</span>
          <h2 className="font-display text-[clamp(36px,4vw,56px)] font-light text-warm-white mt-4">Services</h2>
          <p className="font-body text-[14px] text-text-muted-warm mt-4 max-w-md mx-auto leading-relaxed">
            Every session is crafted with intention — tailored to your story, your vision, your moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-border/30 rounded-[var(--radius-sm)] overflow-hidden">
          {services.map((s) => (
            <div
              key={s.num}
              className="reveal group bg-background p-10 lg:p-12 flex flex-col gap-6 relative overflow-hidden hover:bg-surface/80 transition-all duration-500"
            >
              {/* Gold left border on hover */}
              <div className="absolute left-0 top-0 w-[2px] h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />

              <span className="font-display text-[18px] text-text-muted-warm/50 tracking-wider">{s.num}</span>
              <h3 className="font-display italic text-[28px] text-warm-white leading-tight">{s.name}</h3>
              <p className="font-body text-[14px] font-light leading-[1.8] text-text-muted-warm flex-1">
                {s.desc}
              </p>
              <div className="pt-4 border-t border-border/30">
                <span className="font-body text-[13px] tracking-[1px] text-primary">{s.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
