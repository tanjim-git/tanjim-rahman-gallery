import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  category: string;
  published_at: string | null;
}

export default function JournalPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();
      setPost(data);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="font-body text-sm text-text-muted-warm animate-pulse">Loading...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <span className="font-body text-sm text-text-muted-warm">Post not found.</span>
        <Link to="/journal" className="font-body text-[11px] text-primary hover:text-warm-white transition-colors">
          ← Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="h-[var(--nav-height)] flex items-center px-6 lg:px-8 max-w-[var(--max-width)] mx-auto">
        <Link to="/" className="font-display text-[20px] tracking-[3px] text-warm-white hover:text-primary transition-colors">
          T·R
        </Link>
        <Link to="/journal" className="ml-4 font-body text-[9px] tracking-[2px] uppercase text-text-muted-warm hover:text-primary transition-colors">
          Journal
        </Link>
      </nav>

      {/* Cover image */}
      {post.cover_image_url && (
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="relative overflow-hidden rounded-[var(--radius-sm)] aspect-[21/9]">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Post content */}
      <article className="max-w-2xl mx-auto px-6 pb-24">
        <div className="mb-10">
          <span className="font-body text-[9px] tracking-[3px] uppercase text-primary font-medium">
            {post.category}
          </span>
          <h1 className="font-display text-[clamp(32px,4vw,48px)] font-light text-warm-white mt-3 leading-[1.2]">
            {post.title}
          </h1>
          {post.published_at && (
            <span className="font-body text-[11px] text-text-muted-warm/60 mt-4 block">
              {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </div>

        {/* Render content as paragraphs */}
        <div className="space-y-6">
          {post.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="font-body text-[15px] text-warm-white/85 leading-[1.9]">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border/20">
          <Link
            to="/journal"
            className="font-body text-[11px] tracking-[2px] uppercase text-primary hover:text-warm-white transition-colors"
          >
            ← All Posts
          </Link>
        </div>
      </article>
    </div>
  );
}
