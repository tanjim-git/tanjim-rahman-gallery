import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  display_order: number;
}

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) toast.error(error.message);
    else setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    if (!name.trim() || !quote.trim()) {
      toast.error('Name and quote are required');
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from('testimonials')
        .update({ name: name.trim(), role: role.trim(), quote: quote.trim() })
        .eq('id', editingId);
      if (error) toast.error(error.message);
      else toast.success('Testimonial updated');
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert({
          name: name.trim(),
          role: role.trim(),
          quote: quote.trim(),
          display_order: items.length,
        });
      if (error) toast.error(error.message);
      else toast.success('Testimonial added');
    }

    setName('');
    setRole('');
    setQuote('');
    setEditingId(null);
    fetchItems();
  };

  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setName(t.name);
    setRole(t.role);
    setQuote(t.quote);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) toast.error(error.message);
    else {
      toast.success('Testimonial deleted');
      fetchItems();
    }
  };

  if (loading) return <div className="text-text-muted-warm font-body text-sm animate-pulse">Loading testimonials...</div>;

  return (
    <div className="space-y-8">
      {/* Add/Edit form */}
      <div className="bg-surface border border-border/30 rounded-[var(--radius-sm)] p-6 space-y-4">
        <h3 className="font-body text-[11px] tracking-[2px] uppercase text-warm-white">
          {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            placeholder="Client name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background border border-border/50 text-warm-white font-body text-sm px-4 py-2.5 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none"
          />
          <input
            placeholder="Role / title (e.g., Wedding Client)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-background border border-border/50 text-warm-white font-body text-sm px-4 py-2.5 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none"
          />
        </div>
        <textarea
          placeholder="Testimonial quote..."
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          rows={3}
          className="w-full bg-background border border-border/50 text-warm-white font-body text-sm px-4 py-2.5 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none resize-none"
        />
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="bg-primary text-primary-foreground font-body text-[10px] tracking-[2px] uppercase px-6 py-2.5 rounded-[2px] hover:bg-primary/90 transition-colors"
          >
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button
              onClick={() => { setEditingId(null); setName(''); setRole(''); setQuote(''); }}
              className="font-body text-[10px] tracking-[2px] uppercase text-text-muted-warm hover:text-warm-white transition-colors px-4"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="bg-surface border border-border/20 rounded-[var(--radius-sm)] p-5 flex gap-4 items-start">
            <div className="flex-1 min-w-0">
              <p className="font-display italic text-warm-white text-[15px] leading-relaxed">"{t.quote}"</p>
              <p className="font-body text-[12px] text-text-muted-warm mt-2">
                {t.name}{t.role ? ` · ${t.role}` : ''}
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => handleEdit(t)} className="font-body text-[9px] tracking-[1px] uppercase text-primary hover:text-warm-white transition-colors">
                Edit
              </button>
              <button onClick={() => handleDelete(t.id)} className="font-body text-[9px] tracking-[1px] uppercase text-red-400 hover:text-red-300 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-center text-text-muted-warm font-body text-sm py-12">
          No testimonials yet. Add your first one above.
        </p>
      )}
    </div>
  );
}
