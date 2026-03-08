import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Submission {
  id: string;
  name: string;
  email: string;
  service: string | null;
  preferred_date: string | null;
  message: string;
  created_at: string;
}

export default function AdminInquiries() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) toast.error(error.message);
      else setItems(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="text-text-muted-warm font-body text-sm animate-pulse">Loading inquiries...</div>;

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="text-center text-text-muted-warm font-body text-sm py-12">
          No inquiries yet.
        </p>
      )}

      {items.map((s) => {
        const isExpanded = expandedId === s.id;
        const date = new Date(s.created_at);
        return (
          <div
            key={s.id}
            className="bg-surface border border-border/20 rounded-[var(--radius-sm)] overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => setExpandedId(isExpanded ? null : s.id)}
              className="w-full text-left px-5 py-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-body text-[13px] font-medium text-warm-white">{s.name}</span>
                  {s.service && (
                    <span className="font-body text-[9px] tracking-[1px] uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-sm">
                      {s.service}
                    </span>
                  )}
                </div>
                <span className="font-body text-[11px] text-text-muted-warm">{s.email}</span>
              </div>
              <span className="font-body text-[10px] text-text-muted-warm/60 shrink-0">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                className={`text-text-muted-warm transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
              >
                <polyline points="4 6 8 10 12 6" />
              </svg>
            </button>

            {isExpanded && (
              <div className="px-5 pb-5 pt-0 space-y-3 border-t border-border/10">
                {s.preferred_date && (
                  <div className="font-body text-[11px] text-text-muted-warm">
                    <span className="text-[9px] tracking-[2px] uppercase text-text-muted-warm/60">Preferred Date: </span>
                    {s.preferred_date}
                  </div>
                )}
                <p className="font-body text-[13px] text-warm-white/90 leading-relaxed whitespace-pre-wrap">
                  {s.message}
                </p>
                <a
                  href={`mailto:${s.email}`}
                  className="inline-block font-body text-[10px] tracking-[2px] uppercase text-primary hover:text-warm-white transition-colors"
                >
                  Reply via Email →
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
