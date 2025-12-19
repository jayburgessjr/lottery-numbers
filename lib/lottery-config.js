export const POWERBALL = {
  name: 'Powerball',
  mainNumbers: {
    count: 5,
    min: 1,
    max: 69
  },
  powerball: {
    min: 1,
    max: 26
  }
};

/**
 * Generate cryptographically secure random Powerball numbers
 * @returns {{numbers: number[], powerball: number}}
 */
export function generateRandomPowerball() {
  const numbers = [];

  // Generate 5 unique main numbers (1-69)
  while (numbers.length < POWERBALL.mainNumbers.count) {
    const randomValue = crypto.getRandomValues(new Uint32Array(1))[0];
    const num = (randomValue % POWERBALL.mainNumbers.max) + 1;

    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  // Sort numbers in ascending order
  numbers.sort((a, b) => a - b);

  // Generate powerball number (1-26)
  const powerballValue = crypto.getRandomValues(new Uint32Array(1))[0];
  const powerball = (powerballValue % POWERBALL.powerball.max) + 1;

  return { numbers, powerball };
}

/**
 * Validate if numbers are within Powerball rules
 * @param {number[]} numbers - Main numbers array
 * @param {number} powerball - Powerball number
 * @returns {{valid: boolean, error?: string}}
 */
export function validatePowerballNumbers(numbers, powerball) {
  if (!Array.isArray(numbers) || numbers.length !== POWERBALL.mainNumbers.count) {
    return {
      valid: false,
      error: `Must have exactly ${POWERBALL.mainNumbers.count} main numbers`
    };
  }

  // Check for duplicates
  const uniqueNumbers = new Set(numbers);
  if (uniqueNumbers.size !== numbers.length) {
    return {
      valid: false,
      error: 'Numbers must be unique'
    };
  }

  // Check range for main numbers
  for (const num of numbers) {
    if (num < POWERBALL.mainNumbers.min || num > POWERBALL.mainNumbers.max) {
      return {
        valid: false,
        error: `Main numbers must be between ${POWERBALL.mainNumbers.min} and ${POWERBALL.mainNumbers.max}`
      };
    }
  }

  // Check powerball range
  if (powerball < POWERBALL.powerball.min || powerball > POWERBALL.powerball.max) {
    return {
      valid: false,
      error: `Powerball must be between ${POWERBALL.powerball.min} and ${POWERBALL.powerball.max}`
    };
  }

  return { valid: true };
}
