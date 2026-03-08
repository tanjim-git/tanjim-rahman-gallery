import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const cache: Record<string, any> = {};

export function useSiteSettings<T = any>(key: string, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(cache[key] ?? fallback);
  const [loading, setLoading] = useState(!cache[key]);

  useEffect(() => {
    if (cache[key]) return;
    const load = async () => {
      const { data: row } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .maybeSingle();
      if (row?.value) {
        cache[key] = row.value as T;
        setData(row.value as T);
      }
      setLoading(false);
    };
    load();
  }, [key]);

  return { data, loading };
}

export function invalidateSettingsCache(key?: string) {
  if (key) delete cache[key];
  else Object.keys(cache).forEach((k) => delete cache[k]);
}
