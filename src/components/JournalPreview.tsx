import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  category: string;
  published_at: string | null;
}

export default function JournalPreview() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, cover_image_url, category, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(3);
      if (data) setPosts(data);
    };
    load();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-[var(--space-xl)] px-6 lg:px-8">
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="reveal text-center mb-16">
          <span className="font-body text-[10px] tracking-[4px] uppercase text-primary font-medium">Journal</span>
          <h2 className="font-display text-[clamp(36px,4vw,56px)] font-light text-warm-white mt-4">
            Stories & Reflections
          </h2>
          <p className="font-body text-[14px] text-text-muted-warm mt-4 max-w-md mx-auto leading-relaxed">
            Behind the lens — thoughts on craft, light, and the art of seeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/journal/${post.slug}`}
              className="reveal group block"
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
              <h3 className="font-display text-xl text-warm-white mt-2 group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h3>
              <p className="font-body text-[13px] text-text-muted-warm mt-2 leading-relaxed line-clamp-2">
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

        <div className="reveal flex justify-center mt-14">
          <Link
            to="/journal"
            className="border border-primary/25 text-primary px-12 py-[13px] font-body text-[10px] tracking-[2.5px] uppercase hover:bg-accent-dim hover:border-primary/40 transition-all duration-300 rounded-[2px]"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
