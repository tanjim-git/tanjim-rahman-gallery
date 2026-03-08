import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AdminPortfolio from '@/components/admin/AdminPortfolio';
import AdminTestimonials from '@/components/admin/AdminTestimonials';
import AdminInquiries from '@/components/admin/AdminInquiries';
import AdminBlog from '@/components/admin/AdminBlog';

const tabs = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'blog', label: 'Blog' },
  { id: 'inquiries', label: 'Inquiries' },
] as const;

type TabId = typeof tabs[number]['id'];

export default function Admin() {
  const [activeTab, setActiveTab] = useState<TabId>('portfolio');
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-surface/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="font-display text-lg text-warm-white tracking-[3px] hover:text-primary transition-colors"
            >
              T·R
            </button>
            <span className="font-body text-[9px] tracking-[2px] uppercase text-text-muted-warm">Dashboard</span>
          </div>
          <button
            onClick={handleSignOut}
            className="font-body text-[10px] tracking-[2px] uppercase text-text-muted-warm hover:text-primary transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border/20">
        <div className="max-w-6xl mx-auto px-6 flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-body text-[11px] tracking-[2px] uppercase py-4 border-b-[1.5px] transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-primary border-primary'
                  : 'text-text-muted-warm border-transparent hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {activeTab === 'portfolio' && <AdminPortfolio />}
        {activeTab === 'testimonials' && <AdminTestimonials />}
        {activeTab === 'blog' && <AdminBlog />}
        {activeTab === 'inquiries' && <AdminInquiries />}
      </div>
    </div>
  );
}
