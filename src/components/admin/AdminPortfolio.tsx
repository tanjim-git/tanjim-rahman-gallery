import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Photo {
  id: string;
  title: string;
  category: string;
  image_url: string;
  display_order: number;
}

const categories = ['Portraits', 'Weddings', 'Editorial', 'Landscapes'];

export default function AdminPortfolio() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Portraits');

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from('portfolio_photos')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) toast.error(error.message);
    else setPhotos(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPhotos(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !title.trim()) {
      toast.error('Please enter a title and select an image');
      return;
    }

    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(path, file);

    if (uploadError) {
      toast.error(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('portfolio')
      .getPublicUrl(path);

    const { error: insertError } = await supabase
      .from('portfolio_photos')
      .insert({
        title: title.trim(),
        category,
        image_url: urlData.publicUrl,
        display_order: photos.length,
      });

    if (insertError) toast.error(insertError.message);
    else {
      toast.success('Photo added');
      setTitle('');
      e.target.value = '';
      fetchPhotos();
    }
    setUploading(false);
  };

  const handleDelete = async (photo: Photo) => {
    // Extract file path from URL
    const urlParts = photo.image_url.split('/portfolio/');
    const filePath = urlParts[urlParts.length - 1];

    await supabase.storage.from('portfolio').remove([filePath]);
    const { error } = await supabase
      .from('portfolio_photos')
      .delete()
      .eq('id', photo.id);

    if (error) toast.error(error.message);
    else {
      toast.success('Photo deleted');
      fetchPhotos();
    }
  };

  if (loading) return <div className="text-text-muted-warm font-body text-sm animate-pulse">Loading portfolio...</div>;

  return (
    <div className="space-y-8">
      {/* Upload form */}
      <div className="bg-surface border border-border/30 rounded-[var(--radius-sm)] p-6">
        <h3 className="font-body text-[11px] tracking-[2px] uppercase text-warm-white mb-5">Add New Photo</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Photo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-background border border-border/50 text-warm-white font-body text-sm px-4 py-2.5 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-background border border-border/50 text-warm-white font-body text-sm px-4 py-2.5 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <label className={`flex items-center justify-center border border-dashed border-primary/30 text-primary font-body text-[10px] tracking-[2px] uppercase py-2.5 rounded-[var(--radius-sm)] cursor-pointer hover:bg-accent-dim transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
            {uploading ? 'Uploading...' : 'Choose Image'}
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
        </div>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative rounded-[var(--radius-sm)] overflow-hidden bg-surface-2 aspect-[3/4]">
            <img src={photo.image_url} alt={photo.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-3">
              <span className="font-body text-[10px] tracking-[1px] text-warm-white text-center">{photo.title}</span>
              <span className="font-body text-[9px] tracking-[2px] uppercase text-primary">{photo.category}</span>
              <button
                onClick={() => handleDelete(photo)}
                className="mt-2 font-body text-[9px] tracking-[1px] uppercase text-red-400 hover:text-red-300 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <p className="text-center text-text-muted-warm font-body text-sm py-12">
          No portfolio photos yet. Upload your first one above.
        </p>
      )}
    </div>
  );
}
