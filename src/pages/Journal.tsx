import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  category: string;
  published_at: string | null;
}

export default function Journal() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, cover_image_url, category, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false });
      if (data) setPosts(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="h-[var(--nav-height)] flex items-center px-6 lg:px-8 max-w-[var(--max-width)] mx-auto">
        <Link to="/" className="font-display text-[20px] tracking-[3px] text-warm-white hover:text-primary transition-colors">
          T·R
        </Link>
        <span className="ml-4 font-body text-[9px] tracking-[2px] uppercase text-text-muted-warm">Journal</span>
      </nav>

      <div className="max-w-[var(--max-width)] mx-auto px-6 lg:px-8 pb-24">
        <div className="text-center mb-20 pt-12">
          <span className="font-body text-[10px] tracking-[4px] uppercase text-primary font-medium">Journal</span>
          <h1 className="font-display text-[clamp(36px,5vw,64px)] font-light text-warm-white mt-4">
            Stories & Reflections
          </h1>
          <p className="font-body text-[14px] text-text-muted-warm mt-4 max-w-md mx-auto leading-relaxed">
            Behind the lens — thoughts on craft, light, and the art of seeing.
          </p>
        </div>

        {loading && (
          <p className="text-center text-text-muted-warm font-body text-sm animate-pulse">Loading posts...</p>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-center text-text-muted-warm font-body text-sm py-12">
            No posts yet. Check back soon.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/journal/${post.slug}`}
              className="group block"
            >
              {post.cover_image_url && (
                <div className="relative overflow-hidden rounded-[var(--radius-sm)] mb-5 aspect-[4/3]">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
              )}
              <span className="font-body text-[9px] tracking-[3px] uppercase text-primary font-medium">
                {post.category}
              </span>
              <h2 className="font-display text-2xl text-warm-white mt-2 group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h2>
              <p className="font-body text-[13px] text-text-muted-warm mt-2 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              {post.published_at && (
                <span className="font-body text-[10px] text-text-muted-warm/60 mt-3 block">
                  {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
