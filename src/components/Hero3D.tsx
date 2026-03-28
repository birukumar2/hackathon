import { useState, useEffect } from 'react';
import { Sparkles, Zap, Rocket } from 'lucide-react';

export default function Hero3D({ onStartJourney }: { onStartJourney: () => void }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-teal-400 opacity-20 animate-float"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's',
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
          }}
        >
          <div className="mb-8 inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-400 blur-3xl opacity-50 animate-pulse" />
              <Sparkles className="relative w-24 h-24 text-teal-300 animate-spin-slow" />
            </div>
          </div>

          <h1 className="text-7xl md:text-8xl font-black mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400 text-transparent bg-clip-text animate-gradient">
              AI Student
            </span>
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-teal-300 text-transparent bg-clip-text animate-gradient">
              Productivity
            </span>
          </h1>

          <p className="text-3xl md:text-4xl text-teal-200 font-light mb-4 animate-fade-in-up">
            Search Less. Solve More.
          </p>

          <p className="text-xl text-teal-300/80 max-w-2xl mx-auto mb-12 animate-fade-in-up-delayed">
            Transform your ideas into reality with AI-powered research, project planning, content generation, and personalized learning paths.
          </p>

          <button
            onClick={onStartJourney}
            className="group relative px-12 py-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xl font-bold rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-teal-500/50 animate-fade-in-up-delayed-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-3">
              Start Your Journey
              <Rocket className="w-6 h-6 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
            </span>
          </button>

          <div className="mt-16 flex gap-8 justify-center items-center">
            {[
              { icon: Sparkles, text: 'Deep Research', delay: '0s' },
              { icon: Zap, text: 'Smart Planning', delay: '0.2s' },
              { icon: Rocket, text: 'Fast Results', delay: '0.4s' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 transform hover:scale-110 transition-all duration-300"
                style={{ animationDelay: item.delay }}
              >
                <div className="p-4 bg-teal-500/20 backdrop-blur-lg rounded-2xl border border-teal-400/30 hover:bg-teal-500/30 transition-all duration-300">
                  <item.icon className="w-8 h-8 text-teal-300" />
                </div>
                <span className="text-sm text-teal-200 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-teal-300/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-teal-300 rounded-full animate-scroll" />
        </div>
      </div>
    </div>
  );
}
