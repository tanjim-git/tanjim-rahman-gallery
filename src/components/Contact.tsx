import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const defaultContact = {
  heading: "Let's Create Together",
  subheading: 'Get in Touch',
  description: "Whether it's a portrait session, a wedding, or a creative collaboration — I'd love to hear your story.",
  email: 'hello@tanjimrahman.com',
  phone: '+880 1XXX-XXXXXX',
  studio: 'Gulshan 2, Dhaka, Bangladesh',
  instagram: '@tanjimrahman.photo',
  instagram_url: 'https://instagram.com/tanjimrahman.photo',
};

export default function Contact() {
  const { data: contact } = useSiteSettings('contact', defaultContact);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', date: '', message: '' });
  const [sending, setSending] = useState(false);

  const contactInfo = [
    { label: 'EMAIL', value: contact.email, href: `mailto:${contact.email}` },
    { label: 'PHONE', value: contact.phone, href: `tel:${contact.phone?.replace(/\s/g, '')}` },
    { label: 'STUDIO', value: contact.studio, href: null },
    { label: 'INSTAGRAM', value: contact.instagram, href: contact.instagram_url },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) { toast.error('Please fill in all required fields.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error('Please enter a valid email address.'); return; }

    setSending(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name, email,
        service: formData.service || null,
        preferred_date: formData.date || null,
        message,
      });
      if (error) throw error;
      toast.success('Thank you! Your inquiry has been sent.');
      setFormData({ name: '', email: '', service: '', date: '', message: '' });
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally { setSending(false); }
  };

  const inputClass =
    'w-full bg-surface/80 border border-border/40 rounded-[var(--radius-sm)] px-5 py-[14px] font-body text-[13px] text-foreground placeholder:text-text-muted-warm/60 focus:outline-none focus:border-primary/40 focus:bg-surface transition-all duration-300';

  return (
    <section id="contact" className="py-[var(--space-xl)] px-6 lg:px-8">
      <div className="max-w-[var(--max-width)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div className="stagger visible flex flex-col gap-8">
          <div>
            <span className="font-body text-[10px] tracking-[4px] uppercase text-primary font-medium">{contact.subheading}</span>
            <h2 className="font-display text-[clamp(36px,4vw,56px)] font-light text-warm-white leading-[1.1] mt-4">
              {contact.heading?.split(' ').map((word: string, i: number) => (
                <span key={i}>{i === contact.heading.split(' ').length - 1 ? <><br /><span className="italic">{word}</span></> : word + ' '}</span>
              ))}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-[6px] h-[6px] rounded-full bg-emerald-500 pulse-gold" />
            <span className="font-body text-[12px] tracking-[1.5px] text-text-muted-warm">Currently Accepting Bookings</span>
          </div>

          <div className="flex flex-col gap-5 mt-2">
            {contactInfo.map((c) => (
              <div key={c.label}>
                <span className="font-body text-[9px] tracking-[3px] text-text-muted-warm/60 uppercase">{c.label}</span>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block font-body text-[14px] text-foreground mt-1 hover:text-primary transition-colors duration-300">{c.value}</a>
                ) : (
                  <div className="font-body text-[14px] text-foreground mt-1">{c.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="reveal flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name *" className={inputClass} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} maxLength={100} />
            <input type="email" placeholder="Email *" className={inputClass} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} maxLength={255} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select className={inputClass + (formData.service ? '' : ' text-text-muted-warm/60')} value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
              <option value="">Select Service</option>
              <option value="portrait">Portrait Sessions</option>
              <option value="wedding">Wedding Stories</option>
              <option value="editorial">Editorial & Commercial</option>
            </select>
            <input type="date" placeholder="Preferred Date" className={inputClass + (!formData.date ? ' text-text-muted-warm/60' : '')} value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          </div>
          <textarea placeholder="Your Message *" rows={6} className={inputClass + ' resize-none'} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} maxLength={1000} />
          <button type="submit" disabled={sending}
            className="w-full bg-primary text-accent-foreground py-[15px] font-body text-[11px] font-medium tracking-[2.5px] uppercase rounded-[2px] hover:shadow-[0_8px_30px_-8px_hsl(37_46%_61%_/_0.35)] transition-all duration-300 mt-2 disabled:opacity-60">
            {sending ? 'Sending...' : 'Send Inquiry'}
          </button>
          <p className="font-body text-[11px] text-text-muted-warm/50 text-center mt-1">I typically respond within 24 hours.</p>
        </form>
      </div>
    </section>
  );
}
