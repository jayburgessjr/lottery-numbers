import {
  generateByStrategy,
  generateMultipleSets,
  validatePowerballNumbers
} from '../../lib/lottery-config';
import { generateAILotteryNumbers } from '../../lib/openai';
import { getStatistics } from '../../lib/historical-data';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { strategy = 'random', count = 1, useAI = true } = req.body;

    // If generating multiple sets, don't use AI (would be too slow/expensive)
    if (count > 1) {
      const sets = generateMultipleSets(count, strategy);
      return res.status(200).json({
        success: true,
        multiple: true,
        sets,
        strategy,
        timestamp: new Date().toISOString()
      });
    }

    // Step 1: Generate numbers using selected strategy
    const { numbers: baseNumbers, powerball: basePowerball, strategy: usedStrategy } = generateByStrategy(strategy);

    // Step 2: Get AI-enhanced numbers and reasoning if enabled
    if (useAI) {
      try {
        const stats = getStatistics();
        const { numbers, powerball, reasoning } = await generateAILotteryNumbers(
          baseNumbers,
          basePowerball,
          usedStrategy,
          stats
        );

        // Step 3: Validate the AI-generated numbers
        const validation = validatePowerballNumbers(numbers, powerball);
        if (!validation.valid) {
          // If AI returned invalid numbers, fall back to base numbers
          console.warn('AI generated invalid numbers, using base:', validation.error);
          return res.status(200).json({
            success: true,
            numbers: baseNumbers,
            powerball: basePowerball,
            strategy: usedStrategy,
            reasoning: `These ${usedStrategy} numbers offer a strategic selection based on historical patterns.`,
            timestamp: new Date().toISOString()
          });
        }

        // Step 4: Return successful result with AI enhancement
        return res.status(200).json({
          success: true,
          numbers,
          powerball,
          strategy: usedStrategy,
          reasoning,
          timestamp: new Date().toISOString()
        });
      } catch (aiError) {
        console.error('AI error, falling back to non-AI:', aiError);
        // Fall through to non-AI response
      }
    }

    // Non-AI response
    const strategyDescriptions = {
      hot: 'These numbers are frequently drawn based on recent history.',
      cold: 'These numbers are overdue and may be ready for a comeback.',
      balanced: 'A strategic mix of hot, cold, high, and low numbers.',
      random: 'Pure random selection for maximum unpredictability.'
    };

    return res.status(200).json({
      success: true,
      numbers: baseNumbers,
      powerball: basePowerball,
      strategy: usedStrategy,
      reasoning: strategyDescriptions[usedStrategy] || strategyDescriptions.random,
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
