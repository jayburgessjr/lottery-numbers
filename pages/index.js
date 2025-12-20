import Head from 'next/head';
import Link from 'next/link';

export default function LandingPage() {
  const features = [
    {
      icon: '🔥',
      title: 'Hot Numbers',
      description: 'Leverage frequently drawn numbers from historical data'
    },
    {
      icon: '❄️',
      title: 'Cold Numbers',
      description: 'Identify overdue numbers ready for a comeback'
    },
    {
      icon: '⚖️',
      title: 'Balanced Strategy',
      description: 'Smart mix of hot, cold, and random selections'
    },
    {
      icon: '🤖',
      title: 'AI-Powered',
      description: 'OpenAI GPT analysis with strategic reasoning'
    },
    {
      icon: '📊',
      title: 'Historical Data',
      description: '50+ real Powerball drawings analyzed'
    },
    {
      icon: '⚡',
      title: 'Quick Pick',
      description: 'Generate multiple sets instantly (1, 3, 5, or 10)'
    }
  ];

  const stats = [
    { value: '50+', label: 'Drawings Analyzed' },
    { value: '4', label: 'Smart Strategies' },
    { value: '10', label: 'Sets per Click' }
  ];

  return (
    <>
      <Head>
        <title>Powerball Generator Pro - AI-Powered Lottery Number Analysis</title>
        <meta name="description" content="Generate strategic Powerball numbers using AI and historical data analysis. Hot numbers, cold numbers, balanced picks, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-32">
            <div className="text-center">
              {/* Logo/Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-8 shadow-xl">
                <span className="text-4xl">🎲</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                Powerball Generator
                <span className="block text-slate-300 mt-2">Powered by AI</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl sm:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Strategic lottery number generation using historical data analysis,
                AI reasoning, and proven statistical patterns.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/generator">
                  <button className="group px-8 py-4 bg-white text-slate-900 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Start Generating Numbers
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
                <a href="#features">
                  <button className="px-8 py-4 border-2 border-white/30 text-white text-lg font-semibold rounded-lg hover:bg-white/10 transition-all duration-200">
                    Learn More
                  </button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate-700 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-32">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                Smart Features
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Advanced strategies and AI-powered analysis for intelligent number selection
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 border border-slate-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-32 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Three simple steps to generate your strategic lottery numbers
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 text-white rounded-full text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Choose Strategy
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Select from Random, Hot Numbers, Cold Numbers, or Balanced approach based on your preference
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 text-white rounded-full text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Set Quantity
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Choose to generate 1, 3, 5, or 10 sets of numbers at once with Quick Pick
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 text-white rounded-full text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Get Numbers
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Receive AI-analyzed numbers with strategic reasoning and save them to your history
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Generate Your Numbers?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Start using data-driven strategies and AI analysis to pick your Powerball numbers
            </p>
            <Link href="/generator">
              <button className="group px-8 py-4 bg-white text-slate-900 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 flex items-center gap-3 mx-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Launch Generator
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-50 border-t border-slate-200 py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 rounded-xl mb-4">
              <span className="text-2xl">🎲</span>
            </div>
            <p className="text-slate-600 mb-2">Powerball Generator Pro</p>
            <p className="text-sm text-slate-500">
              Generated numbers use AI and historical analysis for entertainment purposes only.
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Lottery drawings are random. Past results don't predict future outcomes. Play responsibly.
            </p>
          </div>
        </footer>
      </main>

      <style jsx>{`
        .bg-grid-pattern {
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </>
  );
}
