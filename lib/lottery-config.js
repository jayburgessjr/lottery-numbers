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

/**
 * Generation Strategies
 */

import { getHotNumbers, getColdNumbers } from './historical-data';

/**
 * Generate numbers using hot numbers strategy
 * Favors frequently drawn numbers
 */
export function generateHotNumbers() {
  const { mainNumbers: hotPool, powerballs: hotPBPool } = getHotNumbers(20);
  const numbers = [];

  // Pick 5 from hot numbers pool
  while (numbers.length < 5) {
    const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % hotPool.length;
    const num = hotPool[randomIndex];
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  numbers.sort((a, b) => a - b);

  // Pick powerball from hot powerballs
  const pbIndex = crypto.getRandomValues(new Uint32Array(1))[0] % hotPBPool.length;
  const powerball = hotPBPool[pbIndex];

  return { numbers, powerball, strategy: 'hot' };
}

/**
 * Generate numbers using cold numbers strategy
 * Favors overdue numbers
 */
export function generateColdNumbers() {
  const { mainNumbers: coldPool, powerballs: coldPBPool } = getColdNumbers(20);
  const numbers = [];

  // Pick 5 from cold numbers pool
  while (numbers.length < 5) {
    const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % coldPool.length;
    const num = coldPool[randomIndex];
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  numbers.sort((a, b) => a - b);

  // Pick powerball from cold powerballs
  const pbIndex = crypto.getRandomValues(new Uint32Array(1))[0] % coldPBPool.length;
  const powerball = coldPBPool[pbIndex];

  return { numbers, powerball, strategy: 'cold' };
}

/**
 * Generate balanced numbers
 * Mix of high/low, even/odd, hot/cold
 */
export function generateBalancedNumbers() {
  const numbers = [];
  const { mainNumbers: hotPool } = getHotNumbers(15);
  const { mainNumbers: coldPool } = getColdNumbers(15);

  // Get 2-3 hot numbers
  let hotCount = 0;
  while (hotCount < 2 && numbers.length < 5) {
    const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % hotPool.length;
    const num = hotPool[randomIndex];
    if (!numbers.includes(num)) {
      numbers.push(num);
      hotCount++;
    }
  }

  // Get 2-3 cold numbers
  let coldCount = 0;
  while (coldCount < 2 && numbers.length < 5) {
    const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % coldPool.length;
    const num = coldPool[randomIndex];
    if (!numbers.includes(num)) {
      numbers.push(num);
      coldCount++;
    }
  }

  // Fill remaining with random
  while (numbers.length < 5) {
    const randomValue = crypto.getRandomValues(new Uint32Array(1))[0];
    const num = (randomValue % POWERBALL.mainNumbers.max) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  numbers.sort((a, b) => a - b);

  // Random powerball
  const powerballValue = crypto.getRandomValues(new Uint32Array(1))[0];
  const powerball = (powerballValue % POWERBALL.powerball.max) + 1;

  return { numbers, powerball, strategy: 'balanced' };
}

/**
 * Generate numbers by strategy
 */
export function generateByStrategy(strategy = 'random') {
  switch (strategy) {
    case 'hot':
      return generateHotNumbers();
    case 'cold':
      return generateColdNumbers();
    case 'balanced':
      return generateBalancedNumbers();
    case 'random':
    default:
      const result = generateRandomPowerball();
      return { ...result, strategy: 'random' };
  }
}

/**
 * Generate multiple sets
 */
export function generateMultipleSets(count = 5, strategy = 'random') {
  const sets = [];
  const usedCombinations = new Set();

  while (sets.length < count) {
    const set = generateByStrategy(strategy);
    const key = `${set.numbers.join(',')}-${set.powerball}`;

    if (!usedCombinations.has(key)) {
      usedCombinations.add(key);
      sets.push({
        ...set,
        id: sets.length + 1,
      });
    }
  }

  return sets;
}
