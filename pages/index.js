import { useState } from 'react';
import Head from 'next/head';
import NumberDisplay from '../components/NumberDisplay';
import GenerateButton from '../components/GenerateButton';
import AIReasoning from '../components/AIReasoning';
import HistoryList from '../components/HistoryList';
import StrategySelector from '../components/StrategySelector';
import QuickPickSettings from '../components/QuickPickSettings';
import MultipleSetsDisplay from '../components/MultipleSetsDisplay';
import StatsDashboard from '../components/StatsDashboard';

export default function Home() {
  const [numbers, setNumbers] = useState([]);
  const [powerball, setPowerball] = useState(null);
  const [reasoning, setReasoning] = useState('');
  const [strategy, setStrategy] = useState('random');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [historyKey, setHistoryKey] = useState(0);
  const [quickPickCount, setQuickPickCount] = useState(1);
  const [multipleSets, setMultipleSets] = useState(null);

  const generateNumbers = async () => {
    setIsLoading(true);
    setError(null);
    setMultipleSets(null);

    try {
      const response = await fetch('/api/generate-numbers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          strategy,
          count: quickPickCount,
          useAI: quickPickCount === 1
        })
      });

      const data = await response.json();

      if (data.success) {
        if (data.multiple) {
          // Multiple sets generated
          setMultipleSets(data.sets);
          setNumbers([]);
          setPowerball(null);
          setReasoning('');

          // Save all sets to history
          data.sets.forEach(set => {
            saveToHistory({
              numbers: set.numbers,
              powerball: set.powerball,
              strategy: data.strategy,
              timestamp: data.timestamp,
            });
          });
        } else {
          // Single set generated
          setNumbers(data.numbers);
          setPowerball(data.powerball);
          setReasoning(data.reasoning);
          setMultipleSets(null);

          // Save to localStorage
          saveToHistory({
            numbers: data.numbers,
            powerball: data.powerball,
            reasoning: data.reasoning,
            strategy: data.strategy,
            timestamp: data.timestamp,
          });
        }

        // Force history list to re-render
        setHistoryKey(prev => prev + 1);
      } else {
        setError(data.error || 'Failed to generate numbers');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToHistory = (generation) => {
    try {
      const history = JSON.parse(localStorage.getItem('powerball_history') || '[]');
      history.unshift(generation);

      // Keep only last 50 generations
      const trimmedHistory = history.slice(0, 50);
      localStorage.setItem('powerball_history', JSON.stringify(trimmedHistory));
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  };

  return (
    <>
      <Head>
        <title>AI Powerball Generator</title>
        <meta name="description" content="Generate AI-powered Powerball lottery numbers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-50 py-8 px-4 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl mb-4 shadow-lg">
              <span className="text-3xl">🎲</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2 tracking-tight">
              Powerball Generator Pro
            </h1>
            <p className="text-slate-600 text-base sm:text-lg font-medium">
              Data-driven strategies • Historical insights • AI-powered analysis
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-6 sm:mb-8">
            {/* Strategy Selector */}
            <StrategySelector
              selectedStrategy={strategy}
              onStrategyChange={setStrategy}
            />

            {/* Quick Pick Settings */}
            <div className="mb-6">
              <QuickPickSettings
                count={quickPickCount}
                onCountChange={setQuickPickCount}
                isLoading={isLoading}
              />
            </div>

            {/* Generate Button */}
            <div className="mb-8">
              <GenerateButton onClick={generateNumbers} isLoading={isLoading} />
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                {error}
              </div>
            )}

            {/* Results - Either single or multiple sets */}
            {multipleSets ? (
              <MultipleSetsDisplay sets={multipleSets} strategy={strategy} />
            ) : (
              <>
                <NumberDisplay
                  numbers={numbers}
                  powerball={powerball}
                  isLoading={isLoading}
                />
                <div className="mt-6">
                  <AIReasoning reasoning={reasoning} isLoading={isLoading} />
                </div>
              </>
            )}
          </div>

          {/* Statistics Dashboard */}
          <div className="mb-8">
            <StatsDashboard />
          </div>

          {/* History */}
          <HistoryList key={historyKey} />

          {/* Footer */}
          <div className="text-center mt-8 sm:mt-12 text-slate-500 text-sm max-w-2xl mx-auto">
            <p className="font-medium">Generated numbers use AI and historical analysis for entertainment purposes only.</p>
            <p className="mt-2 text-slate-400">Lottery drawings are random. Past results don't predict future outcomes. Play responsibly.</p>
          </div>
        </div>
      </main>
    </>
  );
}
