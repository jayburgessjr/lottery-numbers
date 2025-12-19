import { useState } from 'react';
import Head from 'next/head';
import NumberDisplay from '../components/NumberDisplay';
import GenerateButton from '../components/GenerateButton';
import AIReasoning from '../components/AIReasoning';
import HistoryList from '../components/HistoryList';

export default function Home() {
  const [numbers, setNumbers] = useState([]);
  const [powerball, setPowerball] = useState(null);
  const [reasoning, setReasoning] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [historyKey, setHistoryKey] = useState(0);

  const generateNumbers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-numbers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setNumbers(data.numbers);
        setPowerball(data.powerball);
        setReasoning(data.reasoning);

        // Save to localStorage
        saveToHistory({
          numbers: data.numbers,
          powerball: data.powerball,
          reasoning: data.reasoning,
          timestamp: data.timestamp,
        });

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

      <main className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-3">
              🎲 AI Powerball Generator
            </h1>
            <p className="text-gray-600 text-lg">
              Let AI pick your lucky numbers
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <NumberDisplay
              numbers={numbers}
              powerball={powerball}
              isLoading={isLoading}
            />

            <div className="mt-8 mb-8">
              <GenerateButton onClick={generateNumbers} isLoading={isLoading} />
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                {error}
              </div>
            )}

            <AIReasoning reasoning={reasoning} isLoading={isLoading} />
          </div>

          {/* History */}
          <HistoryList key={historyKey} />

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Generated numbers are AI-enhanced random selections.</p>
            <p className="mt-1">Play responsibly.</p>
          </div>
        </div>
      </main>
    </>
  );
}
