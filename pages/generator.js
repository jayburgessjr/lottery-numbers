import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import NumberDisplay from '../components/NumberDisplay';
import GenerateButton from '../components/GenerateButton';
import AIReasoning from '../components/AIReasoning';
import HistoryList from '../components/HistoryList';
import StrategySelector from '../components/StrategySelector';
import QuickPickSettings from '../components/QuickPickSettings';
import MultipleSetsDisplay from '../components/MultipleSetsDisplay';
import StatsDashboard from '../components/StatsDashboard';

export default function Generator() {
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
          setMultipleSets(data.sets);
          setNumbers([]);
          setPowerball(null);
          setReasoning('');

          data.sets.forEach(set => {
            saveToHistory({
              numbers: set.numbers,
              powerball: set.powerball,
              strategy: data.strategy,
              timestamp: data.timestamp,
            });
          });
        } else {
          setNumbers(data.numbers);
          setPowerball(data.powerball);
          setReasoning(data.reasoning);
          setMultipleSets(null);

          saveToHistory({
            numbers: data.numbers,
            powerball: data.powerball,
            reasoning: data.reasoning,
            strategy: data.strategy,
            timestamp: data.timestamp,
          });
        }

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
      const trimmedHistory = history.slice(0, 50);
      localStorage.setItem('powerball_history', JSON.stringify(trimmedHistory));
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Generator - Powerball</title>
        <meta name="description" content="Generate strategic Powerball numbers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b px-4 h-16 flex items-center" style={{ borderColor: 'var(--color-border)' }}>
          <Link href="/">
            <button className="text-body transition-opacity hover:opacity-70" style={{ color: 'var(--color-text-secondary)' }}>
              ← Back
            </button>
          </Link>
        </header>

        {/* Main Generator */}
        <div className="max-w-2xl mx-auto px-4 py-24">
          {/* Strategy Selector */}
          <div className="mb-12">
            <StrategySelector
              selectedStrategy={strategy}
              onStrategyChange={setStrategy}
            />
          </div>

          {/* Quick Pick Settings */}
          <div className="mb-12">
            <QuickPickSettings
              count={quickPickCount}
              onCountChange={setQuickPickCount}
              isLoading={isLoading}
            />
          </div>

          {/* Generate Button */}
          <div className="mb-12">
            <GenerateButton onClick={generateNumbers} isLoading={isLoading} />
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-12 p-4 text-center text-body" style={{
              backgroundColor: '#FEF2F2',
              color: '#991B1B',
              border: '1px solid #FCA5A5'
            }}>
              {error}
            </div>
          )}

          {/* Results */}
          {multipleSets ? (
            <MultipleSetsDisplay sets={multipleSets} strategy={strategy} />
          ) : (
            <>
              <NumberDisplay
                numbers={numbers}
                powerball={powerball}
                isLoading={isLoading}
              />
              {reasoning && (
                <div className="mt-8">
                  <AIReasoning reasoning={reasoning} isLoading={isLoading} />
                </div>
              )}
            </>
          )}
        </div>

        {/* Statistics Dashboard */}
        <div className="border-t py-24" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-4xl mx-auto px-4">
            <StatsDashboard />
          </div>
        </div>

        {/* History */}
        <div className="border-t py-24" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-2xl mx-auto px-4">
            <HistoryList key={historyKey} />
          </div>
        </div>
      </main>
    </>
  );
}
