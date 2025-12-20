import OpenAI from 'openai';

// Initialize OpenAI client only if API key is available
let openai = null;

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return openai;
}

/**
 * Generate AI-enhanced lottery numbers with reasoning
 * @param {number[]} baseNumbers - Initial random numbers
 * @param {number} basePowerball - Initial random powerball
 * @param {string} strategy - Generation strategy used
 * @param {object} stats - Historical statistics
 * @returns {Promise<{numbers: number[], powerball: number, reasoning: string}>}
 */
export async function generateAILotteryNumbers(baseNumbers, basePowerball, strategy = 'random', stats = null) {
  const strategyContext = {
    hot: 'These numbers were selected from frequently drawn numbers in recent history.',
    cold: 'These numbers are overdue and haven\'t been drawn recently.',
    balanced: 'This is a balanced mix of hot, cold, high, and low numbers.',
    random: 'These are purely random numbers.'
  };

  let statsContext = '';
  if (stats) {
    statsContext = `\n\nHistorical context:
- Most common main number: ${stats.mostCommonMainNumber.number} (drawn ${stats.mostCommonMainNumber.count} times)
- Least common main number: ${stats.leastCommonMainNumber.number} (drawn ${stats.leastCommonMainNumber.count} times)
- Most common Powerball: ${stats.mostCommonPowerball.number} (drawn ${stats.mostCommonPowerball.count} times)
- Based on last ${stats.totalDrawings} drawings`;
  }

  const systemPrompt = `You are an AI lottery number advisor with knowledge of Powerball history and statistics. Provide creative, engaging reasoning for lottery numbers that acknowledges the strategy used while being honest about randomness.

Consider:
- The generation strategy (hot/cold/balanced/random)
- Number distribution and patterns
- Historical frequency (when relevant)
- Numerology and luck factors
- Balance between being strategic and acknowledging true randomness

Keep your reasoning concise (3-4 sentences), engaging, and entertaining. Be honest that lottery is random, but make it fun!`;

  const userPrompt = `Strategy: ${strategy}
${strategyContext[strategy] || strategyContext.random}
${statsContext}

Generated Powerball numbers: [${baseNumbers.join(', ')}] with Powerball: ${basePowerball}

Provide engaging reasoning for why these are interesting picks. You may suggest adjusting 1-2 numbers if you have strong reasoning based on the strategy or historical patterns.

Respond in JSON format:
{
  "numbers": [array of 5 numbers from 1-69],
  "powerball": number from 1-26,
  "reasoning": "string (3-4 sentences, engaging and strategic)"
}`;

  try {
    const client = getOpenAIClient();

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.85,
      max_tokens: 400,
    });

    const result = JSON.parse(response.choices[0].message.content);

    return {
      numbers: result.numbers,
      powerball: result.powerball,
      reasoning: result.reasoning
    };
  } catch (error) {
    console.error('OpenAI API error:', error);

    // Provide more specific error message
    if (error.message.includes('OPENAI_API_KEY')) {
      throw new Error('OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable.');
    }

    throw new Error('Failed to generate AI lottery numbers');
  }
}
