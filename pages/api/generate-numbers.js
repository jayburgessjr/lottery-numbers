import { generateRandomPowerball, validatePowerballNumbers } from '../../lib/lottery-config';
import { generateAILotteryNumbers } from '../../lib/openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Step 1: Generate base random numbers
    const { numbers: baseNumbers, powerball: basePowerball } = generateRandomPowerball();

    // Step 2: Get AI-enhanced numbers and reasoning
    const { numbers, powerball, reasoning } = await generateAILotteryNumbers(
      baseNumbers,
      basePowerball
    );

    // Step 3: Validate the AI-generated numbers
    const validation = validatePowerballNumbers(numbers, powerball);
    if (!validation.valid) {
      // If AI returned invalid numbers, fall back to base random numbers
      console.warn('AI generated invalid numbers, using base random:', validation.error);
      return res.status(200).json({
        success: true,
        numbers: baseNumbers,
        powerball: basePowerball,
        reasoning: 'These randomly selected numbers offer a balanced distribution across the range.',
        timestamp: new Date().toISOString()
      });
    }

    // Step 4: Return successful result
    return res.status(200).json({
      success: true,
      numbers,
      powerball,
      reasoning,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating lottery numbers:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate lottery numbers. Please try again.'
    });
  }
}
