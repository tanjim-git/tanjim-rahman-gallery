import { useState } from 'react';

const contactInfo = [
  { label: 'EMAIL', value: 'hello@tanjimrahman.com' },
  { label: 'PHONE', value: '+880 1XXX-XXXXXX' },
  { label: 'STUDIO', value: 'Gulshan 2, Dhaka, Bangladesh' },
  { label: 'INSTAGRAM', value: '@tanjimrahman.photo' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', date: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const inputClass =
    'w-full bg-surface border border-border rounded-[var(--radius-sm)] px-4 py-3 font-body text-[14px] text-foreground placeholder:text-text-muted-warm focus:outline-none focus:border-primary/40 transition-colors';

  return (
    <section id="contact" className="py-[var(--space-xl)] px-6">
      <div className="max-w-[var(--max-width)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left */}
        <div className="stagger visible flex flex-col gap-8">
          <h2 className="font-display text-[clamp(36px,4vw,56px)] font-light text-warm-white leading-[1.1]">
            Let's Create<br />Something<br />Beautiful.
          </h2>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 pulse-gold" />
            <span className="font-body text-[12px] tracking-[1px] text-text-muted-warm">
              Currently Accepting Bookings
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {contactInfo.map((c) => (
              <div key={c.label}>
                <span className="font-body text-[10px] tracking-[2px] text-text-muted-warm">{c.label}</span>
                <div className="font-body text-[14px] text-foreground mt-0.5">{c.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <form onSubmit={handleSubmit} className="reveal flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className={inputClass}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className={inputClass}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <select
            className={inputClass}
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          >
            <option value="">Select Service</option>
            <option value="portrait">Portrait Sessions</option>
            <option value="wedding">Wedding Stories</option>
            <option value="editorial">Editorial & Commercial</option>
          </select>
          <input
            type="date"
            placeholder="Preferred Date"
            className={inputClass}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className={inputClass + ' resize-none'}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-primary text-accent-foreground py-4 font-body text-[12px] font-medium tracking-[2px] uppercase rounded-[2px] hover:opacity-90 transition-opacity mt-2"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
