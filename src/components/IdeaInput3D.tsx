import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const categories = [
  { id: 'research', label: 'Student Research', icon: '🔍' },
  { id: 'startup', label: 'Startup Validation', icon: '🚀' },
  { id: 'content', label: 'Content Creator', icon: '🎨' },
  { id: 'learning', label: 'Learning Roadmap', icon: '🎓' },
  { id: 'project', label: 'Project Management', icon: '📋' },
];

type Category = 'research' | 'startup' | 'content' | 'learning' | 'project';

export default function IdeaInput3D({ onIdeaSubmit }: { onIdeaSubmit: (ideaId: string) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('research');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('ideas')
        .insert({
          title,
          description,
          category,
          status: 'pending',
        })
        .select()
        .maybeSingle();

      if (error) throw error;
      if (data) {
        onIdeaSubmit(data.id);
      }
    } catch (error) {
      console.error('Error submitting idea:', error);
      alert('Failed to submit idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 py-20 px-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-teal-500/20 rounded-full mb-6 animate-pulse">
            <Sparkles className="w-12 h-12 text-teal-300" />
          </div>
          <h2 className="text-6xl font-black mb-4 bg-gradient-to-r from-teal-300 to-cyan-300 text-transparent bg-clip-text">
            Share Your Idea
          </h2>
          <p className="text-2xl text-slate-400">
            Let AI transform your vision into reality
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div
            className="relative p-8 rounded-3xl border border-teal-500/30 bg-slate-800/50 backdrop-blur-lg transform transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/20"
            style={{
              transform: 'perspective(1000px) rotateX(2deg)',
            }}
          >
            <label className="block text-xl font-bold text-white mb-4">
              What's your idea?
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Build an AI-powered study assistant"
              className="w-full px-6 py-4 bg-slate-900/80 border border-teal-500/30 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 transition-all duration-300 text-lg"
              required
            />
          </div>

          <div
            className="relative p-8 rounded-3xl border border-cyan-500/30 bg-slate-800/50 backdrop-blur-lg transform transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20"
            style={{
              transform: 'perspective(1000px) rotateX(2deg)',
            }}
          >
            <label className="block text-xl font-bold text-white mb-4">
              Describe it in detail
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us more about your idea, goals, and what you want to achieve..."
              rows={6}
              className="w-full px-6 py-4 bg-slate-900/80 border border-cyan-500/30 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 text-lg resize-none"
              required
            />
          </div>

          <div className="space-y-4">
            <label className="block text-xl font-bold text-white text-center">
              Choose your category
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as Category)}
                  onMouseEnter={() => setHoveredCategory(cat.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 transform ${
                    category === cat.id
                      ? 'border-teal-400 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 scale-105 shadow-xl shadow-teal-500/30'
                      : 'border-slate-700 bg-slate-800/50 hover:border-teal-500/50 hover:scale-105'
                  }`}
                  style={{
                    transform:
                      hoveredCategory === cat.id || category === cat.id
                        ? 'perspective(1000px) rotateX(-5deg) scale(1.05)'
                        : 'perspective(1000px) rotateX(0deg)',
                  }}
                >
                  <div className="text-4xl mb-2">{cat.icon}</div>
                  <div
                    className={`text-sm font-bold transition-colors duration-300 ${
                      category === cat.id ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    {cat.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !description.trim()}
              className="group relative px-12 py-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xl font-bold rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-3">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Start AI Processing
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
