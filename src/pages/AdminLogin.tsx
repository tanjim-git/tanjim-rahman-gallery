import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success('Check your email to confirm your account');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // Check admin role
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .eq('role', 'admin');

          if (!roles || roles.length === 0) {
            await supabase.auth.signOut();
            toast.error('Access denied. Admin privileges required.');
            setLoading(false);
            return;
          }
        }
        navigate('/admin');
      }
    } catch (err: any) {
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl text-warm-white tracking-[3px]">T·R</h1>
          <p className="font-body text-[10px] tracking-[3px] uppercase text-text-muted-warm mt-3">
            Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-body text-[10px] tracking-[2px] uppercase text-text-muted-warm block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-surface border border-border/50 text-warm-white font-body text-sm px-4 py-3 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="font-body text-[10px] tracking-[2px] uppercase text-text-muted-warm block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-surface border border-border/50 text-warm-white font-body text-sm px-4 py-3 rounded-[var(--radius-sm)] focus:border-primary/50 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-body text-[11px] tracking-[2px] uppercase py-3 rounded-[2px] hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-center mt-5 font-body text-[11px] text-text-muted-warm hover:text-primary transition-colors"
        >
          {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full text-center mt-3 font-body text-[10px] tracking-[1px] text-text-muted-warm/60 hover:text-primary transition-colors"
        >
          ← Back to site
        </button>
      </div>
    </div>
  );
}
