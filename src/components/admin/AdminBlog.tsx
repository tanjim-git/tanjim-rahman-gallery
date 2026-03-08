import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  category: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

const categories = ['Journal', 'Behind the Lens', 'Photography Tips', 'Client Stories'];

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', category: 'Journal', cover_image_url: '' });
  const [uploading, setUploading] = useState(false);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast.error(error.message);
    else setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: editing ? f.slug : generateSlug(title),
    }));
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from('portfolio').upload(path, file);
    if (error) { toast.error(error.message); setUploading(false); return; }

    const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(path);
    setForm((f) => ({ ...f, cover_image_url: urlData.publicUrl }));
    setUploading(false);
    toast.success('Cover image uploaded');
  };

  const handleSave = async (publish: boolean) => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim() || generateSlug(form.title),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      category: form.category,
      cover_image_url: form.cover_image_url || null,
      published: publish,
      published_at: publish ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    if (editing) {
      const { error } = await supabase.from('blog_posts').update(payload).eq('id', editing.id);
      if (error) toast.error(error.message);
      else toast.success('Post updated');
    } else {
      const { error } = await supabase.from('blog_posts').insert(payload);
      if (error) toast.error(error.message);
      else toast.success(publish ? 'Post published' : 'Draft saved');
    }

    resetForm();
    fetchPosts();
  };

  const handleEdit = (post: Post) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      cover_image_url: post.cover_image_url || '',
    });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) toast.error(error.message);
    else { toast.success('Post deleted'); fetchPosts(); }
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ title: '', slug: '', excerpt: '', content: '', category: 'Journal', cover_image_url: '' });
  };

  if (loading) return <div className="text-text-muted-warm font-body text-sm animate-pulse">Loading posts...</div>;

  return (
    <div className="space-y-8">
      {/* Editor */}
      <div className="bg-surface border border-border/30 rounded-[var(--radius-sm)] p-6 space-y-4">
        <h3 className="font-body text-[11px] tracking-[2px] uppercase text-warm-white">
          {editing ? 'Edit Post' : 'New Post'}
        </h3>

        <input
          placeholder="Post title"
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full bg-background border border-border/50 text-warm-white font-display text-xl px-4 py-3 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            placeholder="slug-url"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="bg-background border border-border/50 text-warm-white font-body text-sm px-4 py-2.5 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none"
          />
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="bg-background border border-border/50 text-warm-white font-body text-sm px-4 py-2.5 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none"
          >
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <textarea
          placeholder="Excerpt (short preview text)"
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          rows={2}
          className="w-full bg-background border border-border/50 text-warm-white font-body text-sm px-4 py-2.5 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none resize-none"
        />

        <textarea
          placeholder="Post content... (use double newlines for paragraphs)"
          value={form.content}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          rows={10}
          className="w-full bg-background border border-border/50 text-warm-white font-body text-sm px-4 py-3 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none resize-y"
        />

        {/* Cover image */}
        <div className="flex items-center gap-4">
          <label className={`flex items-center justify-center border border-dashed border-primary/30 text-primary font-body text-[10px] tracking-[2px] uppercase px-5 py-2.5 rounded-[var(--radius-sm)] cursor-pointer hover:bg-accent-dim transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
            {uploading ? 'Uploading...' : form.cover_image_url ? 'Change Cover' : 'Add Cover Image'}
            <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
          </label>
          {form.cover_image_url && (
            <img src={form.cover_image_url} alt="Cover" className="h-12 w-20 object-cover rounded-sm" />
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => handleSave(true)}
            className="bg-primary text-primary-foreground font-body text-[10px] tracking-[2px] uppercase px-6 py-2.5 rounded-[2px] hover:bg-primary/90 transition-colors"
          >
            {editing ? 'Update & Publish' : 'Publish'}
          </button>
          <button
            onClick={() => handleSave(false)}
            className="border border-border/50 text-text-muted-warm font-body text-[10px] tracking-[2px] uppercase px-6 py-2.5 rounded-[2px] hover:text-warm-white transition-colors"
          >
            Save Draft
          </button>
          {editing && (
            <button
              onClick={resetForm}
              className="font-body text-[10px] tracking-[2px] uppercase text-text-muted-warm hover:text-warm-white transition-colors px-4"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Posts list */}
      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-surface border border-border/20 rounded-[var(--radius-sm)] p-5 flex gap-4 items-start">
            {post.cover_image_url && (
              <img src={post.cover_image_url} alt="" className="w-16 h-12 object-cover rounded-sm shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-display text-warm-white text-[16px] truncate">{post.title}</h4>
                <span className={`font-body text-[8px] tracking-[1px] uppercase px-2 py-0.5 rounded-sm shrink-0 ${
                  post.published ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'
                }`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="font-body text-[11px] text-text-muted-warm mt-1 truncate">{post.excerpt || 'No excerpt'}</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => handleEdit(post)} className="font-body text-[9px] tracking-[1px] uppercase text-primary hover:text-warm-white transition-colors">
                Edit
              </button>
              <button onClick={() => handleDelete(post.id)} className="font-body text-[9px] tracking-[1px] uppercase text-red-400 hover:text-red-300 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-text-muted-warm font-body text-sm py-12">
          No blog posts yet. Write your first one above.
        </p>
      )}
    </div>
  );
}
