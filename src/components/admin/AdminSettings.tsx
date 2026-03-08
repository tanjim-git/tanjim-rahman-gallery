import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { invalidateSettingsCache } from '@/hooks/useSiteSettings';

interface Settings {
  [key: string]: any;
}

const sections = [
  { key: 'hero', label: 'Hero Section' },
  { key: 'about', label: 'About Section' },
  { key: 'services', label: 'Pricing' },
  { key: 'contact', label: 'Contact Info' },
  { key: 'footer', label: 'Footer' },
];

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState('hero');
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('site_settings').select('*');
      if (data) {
        const map: Settings = {};
        data.forEach((row: any) => { map[row.key] = row.value; });
        setSettings(map);
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async (key: string) => {
    setSaving(true);
    const { error } = await supabase
      .from('site_settings')
      .update({ value: settings[key], updated_at: new Date().toISOString() })
      .eq('key', key);
    if (error) toast.error(error.message);
    else {
      invalidateSettingsCache(key);
      toast.success('Settings saved! Refresh the site to see changes.');
    }
    setSaving(false);
  };

  const updateField = (section: string, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const updateStatField = (index: number, field: string, value: string) => {
    setSettings((prev) => {
      const stats = [...(prev.about?.stats || [])];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, about: { ...prev.about, stats } };
    });
  };

  // Services helpers
  const updatePackageField = (pkgIdx: number, field: string, value: string) => {
    setSettings((prev) => {
      const packages = [...(prev.services?.packages || [])];
      packages[pkgIdx] = { ...packages[pkgIdx], [field]: value };
      return { ...prev, services: { ...prev.services, packages } };
    });
  };

  const updateTierField = (pkgIdx: number, tierIdx: number, field: string, value: any) => {
    setSettings((prev) => {
      const packages = [...(prev.services?.packages || [])];
      const tiers = [...(packages[pkgIdx]?.tiers || [])];
      tiers[tierIdx] = { ...tiers[tierIdx], [field]: value };
      packages[pkgIdx] = { ...packages[pkgIdx], tiers };
      return { ...prev, services: { ...prev.services, packages } };
    });
  };

  const updateTierFeature = (pkgIdx: number, tierIdx: number, featureIdx: number, value: string) => {
    setSettings((prev) => {
      const packages = [...(prev.services?.packages || [])];
      const tiers = [...(packages[pkgIdx]?.tiers || [])];
      const features = [...(tiers[tierIdx]?.features || [])];
      features[featureIdx] = value;
      tiers[tierIdx] = { ...tiers[tierIdx], features };
      packages[pkgIdx] = { ...packages[pkgIdx], tiers };
      return { ...prev, services: { ...prev.services, packages } };
    });
  };

  const addTierFeature = (pkgIdx: number, tierIdx: number) => {
    setSettings((prev) => {
      const packages = [...(prev.services?.packages || [])];
      const tiers = [...(packages[pkgIdx]?.tiers || [])];
      const features = [...(tiers[tierIdx]?.features || []), ''];
      tiers[tierIdx] = { ...tiers[tierIdx], features };
      packages[pkgIdx] = { ...packages[pkgIdx], tiers };
      return { ...prev, services: { ...prev.services, packages } };
    });
  };

  const removeTierFeature = (pkgIdx: number, tierIdx: number, featureIdx: number) => {
    setSettings((prev) => {
      const packages = [...(prev.services?.packages || [])];
      const tiers = [...(packages[pkgIdx]?.tiers || [])];
      const features = (tiers[tierIdx]?.features || []).filter((_: any, i: number) => i !== featureIdx);
      tiers[tierIdx] = { ...tiers[tierIdx], features };
      packages[pkgIdx] = { ...packages[pkgIdx], tiers };
      return { ...prev, services: { ...prev.services, packages } };
    });
  };

  const togglePopular = (pkgIdx: number, tierIdx: number) => {
    setSettings((prev) => {
      const packages = [...(prev.services?.packages || [])];
      const tiers = [...(packages[pkgIdx]?.tiers || [])];
      tiers[tierIdx] = { ...tiers[tierIdx], popular: !tiers[tierIdx].popular };
      packages[pkgIdx] = { ...packages[pkgIdx], tiers };
      return { ...prev, services: { ...prev.services, packages } };
    });
  };

  if (loading) return <div className="text-text-muted-warm font-body text-sm animate-pulse">Loading settings...</div>;

  const current = settings[activeSection] || {};

  return (
    <div className="space-y-6">
      {/* Section tabs */}
      <div className="flex gap-4 flex-wrap">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`font-body text-[10px] tracking-[2px] uppercase pb-1 border-b-[1.5px] transition-all duration-300 ${
              activeSection === s.key ? 'text-primary border-primary' : 'text-text-muted-warm border-transparent hover:text-foreground'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-surface border border-border/30 rounded-[var(--radius-sm)] p-6 space-y-5">
        {activeSection === 'hero' && (
          <>
            <Field label="Name" value={current.name || ''} onChange={(v) => updateField('hero', 'name', v)} />
            <Field label="Tagline" value={current.tagline || ''} onChange={(v) => updateField('hero', 'tagline', v)} />
            <TextArea label="Description" value={current.description || ''} onChange={(v) => updateField('hero', 'description', v)} />
            <Field label="CTA Button Text" value={current.cta_text || ''} onChange={(v) => updateField('hero', 'cta_text', v)} />
            <Field label="Secondary CTA Text" value={current.cta2_text || ''} onChange={(v) => updateField('hero', 'cta2_text', v)} />
            <Field label="Availability Text" value={current.available_text || ''} onChange={(v) => updateField('hero', 'available_text', v)} />
          </>
        )}

        {activeSection === 'about' && (
          <>
            <Field label="Section Heading" value={current.heading || ''} onChange={(v) => updateField('about', 'heading', v)} />
            <Field label="Subheading" value={current.subheading || ''} onChange={(v) => updateField('about', 'subheading', v)} />
            <TextArea label="Bio" value={current.bio || ''} onChange={(v) => updateField('about', 'bio', v)} rows={6} />
            <div className="space-y-3">
              <label className="font-body text-[10px] tracking-[2px] uppercase text-text-muted-warm block">Stats</label>
              {(current.stats || []).map((stat: any, i: number) => (
                <div key={i} className="grid grid-cols-2 gap-3">
                  <input
                    value={stat.value}
                    onChange={(e) => updateStatField(i, 'value', e.target.value)}
                    placeholder="Value (e.g., 12+)"
                    className="bg-background border border-border/50 text-warm-white font-body text-sm px-4 py-2 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none"
                  />
                  <input
                    value={stat.label}
                    onChange={(e) => updateStatField(i, 'label', e.target.value)}
                    placeholder="Label"
                    className="bg-background border border-border/50 text-warm-white font-body text-sm px-4 py-2 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {activeSection === 'services' && (
          <div className="space-y-8">
            {(current.packages || []).map((pkg: any, pkgIdx: number) => (
              <div key={pkgIdx} className="space-y-4">
                <div className="border-b border-border/20 pb-2">
                  <span className="font-body text-[10px] tracking-[2px] uppercase text-primary">Package {pkg.num}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Name" value={pkg.name || ''} onChange={(v) => updatePackageField(pkgIdx, 'name', v)} />
                  <Field label="Tagline" value={pkg.tagline || ''} onChange={(v) => updatePackageField(pkgIdx, 'tagline', v)} />
                </div>

                {(pkg.tiers || []).map((tier: any, tierIdx: number) => (
                  <div key={tierIdx} className="bg-background/50 border border-border/20 rounded-[var(--radius-sm)] p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-[10px] tracking-[2px] uppercase text-text-muted-warm">{tier.tier} Tier</span>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!tier.popular}
                          onChange={() => togglePopular(pkgIdx, tierIdx)}
                          className="accent-[hsl(var(--primary))]"
                        />
                        <span className="font-body text-[10px] text-text-muted-warm">Popular</span>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Tier Name" value={tier.tier || ''} onChange={(v) => updateTierField(pkgIdx, tierIdx, 'tier', v)} />
                      <Field label="Price" value={tier.price || ''} onChange={(v) => updateTierField(pkgIdx, tierIdx, 'price', v)} />
                    </div>
                    <div className="space-y-2">
                      <label className="font-body text-[10px] tracking-[2px] uppercase text-text-muted-warm block">Features</label>
                      {(tier.features || []).map((f: string, fIdx: number) => (
                        <div key={fIdx} className="flex gap-2">
                          <input
                            value={f}
                            onChange={(e) => updateTierFeature(pkgIdx, tierIdx, fIdx, e.target.value)}
                            className="flex-1 bg-background border border-border/50 text-warm-white font-body text-sm px-4 py-2 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none"
                          />
                          <button
                            onClick={() => removeTierFeature(pkgIdx, tierIdx, fIdx)}
                            className="text-text-muted-warm hover:text-red-400 transition-colors px-2 text-sm"
                            title="Remove feature"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addTierFeature(pkgIdx, tierIdx)}
                        className="font-body text-[10px] tracking-[1px] text-primary hover:text-warm-white transition-colors"
                      >
                        + Add Feature
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeSection === 'contact' && (
          <>
            <Field label="Section Heading" value={current.heading || ''} onChange={(v) => updateField('contact', 'heading', v)} />
            <Field label="Subheading" value={current.subheading || ''} onChange={(v) => updateField('contact', 'subheading', v)} />
            <TextArea label="Description" value={current.description || ''} onChange={(v) => updateField('contact', 'description', v)} />
            <Field label="Email" value={current.email || ''} onChange={(v) => updateField('contact', 'email', v)} />
            <Field label="Phone" value={current.phone || ''} onChange={(v) => updateField('contact', 'phone', v)} />
            <Field label="Studio Address" value={current.studio || ''} onChange={(v) => updateField('contact', 'studio', v)} />
            <Field label="Instagram Handle" value={current.instagram || ''} onChange={(v) => updateField('contact', 'instagram', v)} />
            <Field label="Instagram URL" value={current.instagram_url || ''} onChange={(v) => updateField('contact', 'instagram_url', v)} />
          </>
        )}

        {activeSection === 'footer' && (
          <>
            <Field label="Tagline" value={current.tagline || ''} onChange={(v) => updateField('footer', 'tagline', v)} />
            <Field label="Copyright Name" value={current.copyright || ''} onChange={(v) => updateField('footer', 'copyright', v)} />
          </>
        )}

        <button
          onClick={() => handleSave(activeSection)}
          disabled={saving}
          className="bg-primary text-primary-foreground font-body text-[10px] tracking-[2px] uppercase px-8 py-2.5 rounded-[2px] hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="font-body text-[10px] tracking-[2px] uppercase text-text-muted-warm block mb-2">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-border/50 text-warm-white font-body text-sm px-4 py-2.5 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="font-body text-[10px] tracking-[2px] uppercase text-text-muted-warm block mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full bg-background border border-border/50 text-warm-white font-body text-sm px-4 py-2.5 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none resize-y"
      />
    </div>
  );
}
