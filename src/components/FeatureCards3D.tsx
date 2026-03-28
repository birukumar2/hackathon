import { useState } from 'react';
import { Search, FolderKanban, Palette, GraduationCap, Target } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Deep Research',
    description: 'Auto-research any topic in seconds with AI-powered insights',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
  },
  {
    icon: FolderKanban,
    title: 'Project Creation',
    description: 'Scaffold complete project plans with structured phases',
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
  },
  {
    icon: Palette,
    title: 'Content Generation',
    description: 'Generate engaging posts for LinkedIn, Instagram, and more',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    icon: GraduationCap,
    title: 'Learning Path',
    description: 'Personalized course roadmap tailored to your goals',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
  },
  {
    icon: Target,
    title: 'Project Management',
    description: 'Plan and execute projects with AI-powered guidance',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
];

export default function FeatureCards3D() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-teal-300 to-cyan-300 text-transparent bg-clip-text">
            Powerful Features
          </h2>
          <p className="text-2xl text-slate-400">
            Everything you need to boost your productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`relative h-full p-8 rounded-3xl border ${feature.borderColor} ${feature.bgColor} backdrop-blur-lg transform transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl ${
                  hoveredIndex === index ? 'scale-105' : ''
                }`}
                style={{
                  transform:
                    hoveredIndex === index
                      ? 'perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.05)'
                      : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-300 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-slate-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>

                  <div className="mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-500 rounded-full" />
                </div>

                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
