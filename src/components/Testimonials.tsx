import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const fallbackTestimonials = [
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

type Testimonial = { name: string; role: string; quote: string };

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('name, role, quote')
        .order('display_order', { ascending: true });
      if (data && data.length > 0) setTestimonials(data);
    };
    load();
  }, []);

  return (
    <section className="py-[var(--space-xl)] px-6 lg:px-8 bg-surface/40">
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="reveal text-center mb-16">
          <span className="font-body text-[10px] tracking-[4px] uppercase text-primary font-medium">Kind Words</span>
          <h2 className="font-display text-[clamp(36px,4vw,56px)] font-light text-warm-white mt-4">Testimonials</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="reveal group bg-background border border-border/30 p-8 lg:p-10 rounded-[var(--radius-sm)] flex flex-col gap-5 hover:border-primary/15 transition-all duration-500"
            >
              <span className="font-display text-[72px] text-primary/15 leading-none select-none">"</span>
              <p className="font-display italic text-[18px] leading-[1.7] text-warm-white -mt-10">
                {t.quote}
              </p>
              <div className="mt-auto pt-6 border-t border-border/30">
                <div className="font-body text-[13px] font-medium text-warm-white tracking-wide">{t.name}</div>
                <div className="font-body text-[10px] text-text-muted-warm tracking-[2px] uppercase mt-1">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
