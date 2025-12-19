import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate AI-enhanced lottery numbers with reasoning
 * @param {number[]} baseNumbers - Initial random numbers
 * @param {number} basePowerball - Initial random powerball
 * @returns {Promise<{numbers: number[], powerball: number, reasoning: string}>}
 */
export async function generateAILotteryNumbers(baseNumbers, basePowerball) {
  const systemPrompt = `You are an AI lottery number advisor. Given a set of randomly generated Powerball numbers, provide creative reasoning for why these numbers are lucky or strategic.

Consider:
- Number distribution across the 1-69 range
- Balance between high and low numbers
- Patterns or sequences
- Numerology concepts

Keep your reasoning concise (2-3 sentences) and engaging.`;

  const userPrompt = `I randomly generated these Powerball numbers: [${baseNumbers.join(', ')}] with Powerball: ${basePowerball}

Provide brief, creative reasoning for why these are good picks. You may suggest adjusting 1-2 numbers if you have strong reasoning.

Respond in JSON format:
{
  "numbers": [array of 5 numbers from 1-69],
  "powerball": number from 1-26,
  "reasoning": "string"
}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 300,
    });

    const result = JSON.parse(response.choices[0].message.content);

    return {
      numbers: result.numbers,
      powerball: result.powerball,
      reasoning: result.reasoning
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate AI lottery numbers');
  }
}
