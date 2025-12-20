import Head from 'next/head';
import Link from 'next/link';

export default function LandingPage() {
  const capabilities = [
    {
      title: 'Hot Numbers',
      description: 'Leverage frequently drawn numbers from historical data'
    },
    {
      title: 'Cold Numbers',
      description: 'Identify overdue numbers ready for a comeback'
    },
    {
      title: 'Balanced Strategy',
      description: 'Strategic mix of hot, cold, high, and low numbers'
    },
    {
      title: 'AI Reasoning',
      description: 'OpenAI GPT analysis with strategic insights'
    },
    {
      title: 'Historical Analysis',
      description: '50+ real Powerball drawings analyzed'
    },
    {
      title: 'Quick Pick',
      description: 'Generate multiple sets instantly'
    }
  ];

  return (
    <>
      <Head>
        <title>Powerball Generator</title>
        <meta name="description" content="Strategic number generation using historical data and AI reasoning" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-40 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-hero mb-6" style={{ color: 'var(--color-text-primary)' }}>
              Powerball Generator
            </h1>

            <p className="text-subhead mb-12 max-w-lg mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Strategic number generation using historical data and AI reasoning.
            </p>

            <Link href="/generator">
              <button
                className="inline-block px-8 h-12 rounded-md text-body font-normal text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                Generate Numbers
              </button>
            </Link>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-24 px-4" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-label text-center mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
              Capabilities
            </p>

            <div className="grid md:grid-cols-3 gap-12">
              {capabilities.map((item, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-headline mb-6" style={{ color: 'var(--color-text-primary)' }}>
              Ready to generate your numbers?
            </h2>

            <Link href="/generator">
              <button
                className="inline-block px-8 h-12 rounded-md text-body font-normal text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                Start Generating
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
