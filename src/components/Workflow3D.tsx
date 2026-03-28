import { useState, useEffect } from 'react';
import { MessageSquare, Search, FolderKanban, Palette, GraduationCap, Package } from 'lucide-react';

const workflowSteps = [
  { icon: MessageSquare, title: 'User Input Idea', color: 'from-teal-500 to-cyan-500', bgColor: 'bg-teal-500' },
  { icon: Search, title: 'Deep Research', color: 'from-cyan-500 to-blue-500', bgColor: 'bg-cyan-500' },
  { icon: FolderKanban, title: 'Project Plan', color: 'from-blue-500 to-indigo-500', bgColor: 'bg-blue-500' },
  { icon: Palette, title: 'Content Creation', color: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-500' },
  { icon: GraduationCap, title: 'Learning Path', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-500' },
  { icon: Package, title: 'Final Output', color: 'from-pink-500 to-teal-500', bgColor: 'bg-pink-500' },
];

export default function Workflow3D() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-teal-500 to-transparent"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 text-transparent bg-clip-text">
            How It Works
          </h2>
          <p className="text-2xl text-slate-400">
            Your idea to reality in 6 simple steps
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-purple-500 transform -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {workflowSteps.map((step, index) => (
              <div
                key={index}
                className={`relative transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`relative group cursor-pointer ${
                    activeStep === index ? 'scale-110' : 'scale-100'
                  } transition-transform duration-500`}
                  onClick={() => setActiveStep(index)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-500 blur-xl`}
                  />

                  <div
                    className={`relative p-8 rounded-3xl border-2 ${
                      activeStep === index
                        ? 'border-teal-400 bg-gradient-to-br from-teal-500/20 to-cyan-500/20'
                        : 'border-slate-700 bg-slate-800/50'
                    } backdrop-blur-lg transform transition-all duration-500 hover:-translate-y-2`}
                    style={{
                      transform:
                        activeStep === index
                          ? 'perspective(1000px) rotateX(-5deg) scale(1.05)'
                          : 'perspective(1000px) rotateX(0deg)',
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`relative mb-6 transform transition-all duration-500 ${
                          activeStep === index ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
                        }`}
                      >
                        <div
                          className={`absolute inset-0 ${step.bgColor} blur-2xl opacity-50 ${
                            activeStep === index ? 'animate-pulse' : ''
                          }`}
                        />
                        <div
                          className={`relative p-6 rounded-2xl bg-gradient-to-br ${step.color}`}
                        >
                          <step.icon className="w-12 h-12 text-white" />
                        </div>
                      </div>

                      <div
                        className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                          activeStep === index ? 'text-teal-300' : 'text-white'
                        }`}
                      >
                        {index + 1}
                      </div>

                      <h3
                        className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                          activeStep === index ? 'text-white' : 'text-slate-300'
                        }`}
                      >
                        {step.title}
                      </h3>

                      <div
                        className={`h-1 w-0 ${
                          activeStep === index ? 'w-full' : 'group-hover:w-full'
                        } bg-gradient-to-r ${step.color} transition-all duration-500 rounded-full`}
                      />
                    </div>
                  </div>
                </div>

                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                    <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-teal-400 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
