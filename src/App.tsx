import { useState } from 'react';
import Hero3D from './components/Hero3D';
import FeatureCards3D from './components/FeatureCards3D';
import Workflow3D from './components/Workflow3D';
import IdeaInput3D from './components/IdeaInput3D';
import ResultsDashboard3D from './components/ResultsDashboard3D';

type AppState = 'landing' | 'input' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [currentIdeaId, setCurrentIdeaId] = useState<string | null>(null);

  const handleStartJourney = () => {
    setAppState('input');
  };

  const handleIdeaSubmit = (ideaId: string) => {
    setCurrentIdeaId(ideaId);
    setAppState('results');
  };

  const handleReset = () => {
    setCurrentIdeaId(null);
    setAppState('landing');
  };

  return (
    <div className="min-h-screen">
      {appState === 'landing' && (
        <div className="animate-fade-in">
          <Hero3D onStartJourney={handleStartJourney} />
          <FeatureCards3D />
          <Workflow3D />
          <div className="bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 py-20 text-center">
            <button
              onClick={handleStartJourney}
              className="px-12 py-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xl font-bold rounded-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-teal-500/50"
            >
              Get Started Now
            </button>
          </div>
        </div>
      )}

      {appState === 'input' && (
        <div className="animate-slide-in-right">
          <IdeaInput3D onIdeaSubmit={handleIdeaSubmit} />
        </div>
      )}

      {appState === 'results' && currentIdeaId && (
        <div className="animate-slide-in-left">
          <ResultsDashboard3D ideaId={currentIdeaId} onReset={handleReset} />
        </div>
      )}
    </div>
  );
}

export default App;
