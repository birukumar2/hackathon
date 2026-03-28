import { useState, useEffect } from 'react';
import { Search, FolderKanban, Palette, GraduationCap, Check, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

type ProcessingStage = 'research' | 'project' | 'content' | 'learning' | 'complete';

const stages = [
  { id: 'research', icon: Search, title: 'Deep Research', color: 'from-teal-500 to-cyan-500' },
  { id: 'project', icon: FolderKanban, title: 'Project Planning', color: 'from-cyan-500 to-blue-500' },
  { id: 'content', icon: Palette, title: 'Content Generation', color: 'from-blue-500 to-indigo-500' },
  { id: 'learning', icon: GraduationCap, title: 'Learning Path', color: 'from-indigo-500 to-purple-500' },
];

export default function ResultsDashboard3D({ ideaId, onReset }: { ideaId: string; onReset: () => void }) {
  const [currentStage, setCurrentStage] = useState<ProcessingStage>('research');
  const [completedStages, setCompletedStages] = useState<Set<string>>(new Set());
  const [idea, setIdea] = useState<any>(null);
  const [results, setResults] = useState<any>({});

  useEffect(() => {
    loadIdea();
    processIdea();
  }, [ideaId]);

  const loadIdea = async () => {
    const { data } = await supabase.from('ideas').select('*').eq('id', ideaId).maybeSingle();
    if (data) setIdea(data);
  };

  const processIdea = async () => {
    await simulateResearch();
    await simulateProjectPlan();
    await simulateContentGeneration();
    await simulateLearningPath();
    setCurrentStage('complete');
  };

  const simulateResearch = async () => {
    setCurrentStage('research');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockResearch = {
      content: `Comprehensive research analysis for your idea. We've analyzed market trends, competitor landscape, and identified key opportunities. Your concept shows strong potential in the ${idea?.category || 'target'} sector with multiple growth vectors.`,
      sources: [
        { title: 'Market Analysis Report', url: '#' },
        { title: 'Industry Trends 2024', url: '#' },
        { title: 'Competitive Landscape', url: '#' },
      ],
    };

    await supabase.from('research_results').insert({
      idea_id: ideaId,
      content: mockResearch.content,
      sources: mockResearch.sources,
    });

    setResults((prev: any) => ({ ...prev, research: mockResearch }));
    setCompletedStages((prev) => new Set(prev).add('research'));
  };

  const simulateProjectPlan = async () => {
    setCurrentStage('project');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockPlan = {
      phases: [
        {
          name: 'Foundation',
          tasks: ['Market research', 'Define MVP features', 'Technical stack selection'],
          duration: '2 weeks',
        },
        {
          name: 'Development',
          tasks: ['Build core features', 'User testing', 'Iterate based on feedback'],
          duration: '6 weeks',
        },
        {
          name: 'Launch',
          tasks: ['Marketing campaign', 'Beta launch', 'Collect user feedback'],
          duration: '2 weeks',
        },
      ],
    };

    await supabase.from('project_plans').insert({
      idea_id: ideaId,
      plan_data: mockPlan,
    });

    setResults((prev: any) => ({ ...prev, project: mockPlan }));
    setCompletedStages((prev) => new Set(prev).add('project'));
  };

  const simulateContentGeneration = async () => {
    setCurrentStage('content');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockContent = [
      {
        platform: 'linkedin',
        content: `🚀 Excited to share my latest project! \n\nBuilding ${idea?.title || 'an innovative solution'} to solve real-world problems. \n\nKey features:\n✨ AI-powered insights\n📊 Data-driven decisions\n🎯 User-centric design\n\n#Innovation #TechForGood #AI`,
      },
      {
        platform: 'instagram',
        content: `✨ New project alert! ✨\n\n${idea?.title || 'Building something amazing'}\n\n💡 Stay tuned for updates\n🚀 Launching soon\n\n#startup #innovation #tech`,
      },
    ];

    for (const content of mockContent) {
      await supabase.from('content_generated').insert({
        idea_id: ideaId,
        platform: content.platform,
        content: content.content,
      });
    }

    setResults((prev: any) => ({ ...prev, content: mockContent }));
    setCompletedStages((prev) => new Set(prev).add('content'));
  };

  const simulateLearningPath = async () => {
    setCurrentStage('learning');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockPath = {
      courses: [
        {
          title: 'Fundamentals',
          topics: ['Core concepts', 'Best practices', 'Industry standards'],
          duration: '4 weeks',
        },
        {
          title: 'Advanced Techniques',
          topics: ['Optimization', 'Scaling', 'Advanced patterns'],
          duration: '6 weeks',
        },
        {
          title: 'Mastery',
          topics: ['Expert strategies', 'Innovation', 'Leadership'],
          duration: '8 weeks',
        },
      ],
    };

    await supabase.from('learning_paths').insert({
      idea_id: ideaId,
      path_data: mockPath,
    });

    setResults((prev: any) => ({ ...prev, learning: mockPath }));
    setCompletedStages((prev) => new Set(prev).add('learning'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-teal-500/20 rounded-full mb-6 animate-pulse">
            <Sparkles className="w-12 h-12 text-teal-300" />
          </div>
          <h2 className="text-6xl font-black mb-4 bg-gradient-to-r from-teal-300 to-cyan-300 text-transparent bg-clip-text">
            AI Processing Results
          </h2>
          <p className="text-2xl text-slate-400">{idea?.title || 'Your Idea'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {stages.map((stage, index) => {
            const isActive = currentStage === stage.id;
            const isCompleted = completedStages.has(stage.id);

            return (
              <div
                key={stage.id}
                className={`relative p-8 rounded-3xl border-2 backdrop-blur-lg transform transition-all duration-500 ${
                  isActive
                    ? 'border-teal-400 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 scale-105'
                    : isCompleted
                    ? 'border-green-400 bg-gradient-to-br from-green-500/10 to-emerald-500/10'
                    : 'border-slate-700 bg-slate-800/50'
                }`}
                style={{
                  transform: isActive
                    ? 'perspective(1000px) rotateX(-5deg) scale(1.05)'
                    : 'perspective(1000px) rotateX(0deg)',
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`relative p-4 rounded-2xl bg-gradient-to-br ${stage.color} ${
                      isActive ? 'animate-pulse' : ''
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-8 h-8 text-white" />
                    ) : isActive ? (
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    ) : (
                      <stage.icon className="w-8 h-8 text-white" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{stage.title}</h3>
                    {isCompleted && results[stage.id] && (
                      <div className="mt-4 space-y-2">
                        {stage.id === 'research' && (
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {results.research.content}
                          </p>
                        )}
                        {stage.id === 'project' && (
                          <div className="space-y-2">
                            {results.project.phases.map((phase: any, i: number) => (
                              <div key={i} className="text-sm text-slate-300">
                                <span className="font-bold text-teal-300">{phase.name}:</span>{' '}
                                {phase.duration}
                              </div>
                            ))}
                          </div>
                        )}
                        {stage.id === 'content' && (
                          <div className="space-y-2">
                            {results.content.map((item: any, i: number) => (
                              <div key={i} className="text-sm">
                                <span className="font-bold text-blue-300 capitalize">
                                  {item.platform}:
                                </span>
                                <p className="text-slate-300 mt-1 whitespace-pre-line">
                                  {item.content}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                        {stage.id === 'learning' && (
                          <div className="space-y-2">
                            {results.learning.courses.map((course: any, i: number) => (
                              <div key={i} className="text-sm text-slate-300">
                                <span className="font-bold text-indigo-300">{course.title}:</span>{' '}
                                {course.duration}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {isActive && !isCompleted && (
                      <p className="text-slate-400 text-sm">Processing...</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {currentStage === 'complete' && (
          <div className="text-center animate-fade-in-up">
            <div className="inline-block p-8 rounded-3xl border-2 border-green-400 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg mb-8">
              <Check className="w-20 h-20 text-green-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">All Done!</h3>
              <p className="text-slate-300">Your idea has been fully processed</p>
            </div>

            <button
              onClick={onReset}
              className="px-12 py-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xl font-bold rounded-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-teal-500/50"
            >
              Start New Idea
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
