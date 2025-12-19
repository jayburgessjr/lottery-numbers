/**
 * Historical Powerball Data
 * Sample dataset of recent Powerball drawings
 * In production, this would be fetched from an API
 */

export const HISTORICAL_DRAWINGS = [
  { date: '2024-12-16', numbers: [2, 15, 27, 41, 55], powerball: 20 },
  { date: '2024-12-14', numbers: [1, 4, 13, 35, 58], powerball: 5 },
  { date: '2024-12-11', numbers: [11, 22, 29, 38, 46], powerball: 3 },
  { date: '2024-12-09', numbers: [9, 14, 20, 23, 63], powerball: 1 },
  { date: '2024-12-07', numbers: [5, 21, 26, 40, 66], powerball: 7 },
  { date: '2024-12-04', numbers: [3, 10, 33, 58, 64], powerball: 16 },
  { date: '2024-12-02', numbers: [2, 26, 33, 55, 63], powerball: 18 },
  { date: '2024-11-30', numbers: [7, 38, 65, 66, 68], powerball: 21 },
  { date: '2024-11-27', numbers: [11, 27, 30, 37, 44], powerball: 18 },
  { date: '2024-11-25', numbers: [16, 30, 31, 54, 68], powerball: 1 },
  { date: '2024-11-23', numbers: [1, 12, 14, 18, 66], powerball: 4 },
  { date: '2024-11-20', numbers: [19, 26, 30, 39, 63], powerball: 13 },
  { date: '2024-11-18', numbers: [2, 7, 11, 17, 34], powerball: 7 },
  { date: '2024-11-16', numbers: [15, 24, 36, 42, 62], powerball: 8 },
  { date: '2024-11-13', numbers: [6, 15, 32, 54, 67], powerball: 14 },
  { date: '2024-11-11', numbers: [9, 23, 24, 37, 51], powerball: 26 },
  { date: '2024-11-09', numbers: [3, 21, 24, 34, 46], powerball: 9 },
  { date: '2024-11-06', numbers: [12, 13, 29, 58, 64], powerball: 25 },
  { date: '2024-11-04', numbers: [1, 2, 49, 54, 61], powerball: 11 },
  { date: '2024-11-02', numbers: [18, 27, 31, 40, 42], powerball: 10 },
  { date: '2024-10-30', numbers: [4, 11, 38, 42, 49], powerball: 5 },
  { date: '2024-10-28', numbers: [7, 11, 19, 24, 31], powerball: 1 },
  { date: '2024-10-26', numbers: [3, 21, 24, 34, 46], powerball: 9 },
  { date: '2024-10-23', numbers: [19, 22, 34, 66, 69], powerball: 24 },
  { date: '2024-10-21', numbers: [12, 26, 27, 43, 47], powerball: 5 },
  { date: '2024-10-19', numbers: [1, 31, 43, 58, 66], powerball: 13 },
  { date: '2024-10-16', numbers: [2, 15, 30, 35, 49], powerball: 14 },
  { date: '2024-10-14', numbers: [9, 35, 41, 67, 68], powerball: 3 },
  { date: '2024-10-12', numbers: [12, 13, 33, 50, 52], powerball: 23 },
  { date: '2024-10-09', numbers: [1, 11, 22, 47, 68], powerball: 7 },
  { date: '2024-10-07', numbers: [7, 23, 24, 56, 60], powerball: 25 },
  { date: '2024-10-05', numbers: [5, 15, 38, 41, 65], powerball: 14 },
  { date: '2024-10-02', numbers: [10, 12, 22, 36, 50], powerball: 4 },
  { date: '2024-09-30', numbers: [11, 19, 21, 29, 52], powerball: 26 },
  { date: '2024-09-28', numbers: [1, 2, 9, 19, 22], powerball: 3 },
  { date: '2024-09-25', numbers: [1, 5, 32, 50, 64], powerball: 18 },
  { date: '2024-09-23', numbers: [11, 19, 21, 29, 52], powerball: 21 },
  { date: '2024-09-21', numbers: [7, 8, 14, 19, 29], powerball: 5 },
  { date: '2024-09-18', numbers: [12, 13, 28, 35, 36], powerball: 24 },
  { date: '2024-09-16', numbers: [1, 11, 22, 47, 68], powerball: 7 },
  { date: '2024-09-14', numbers: [6, 23, 25, 34, 51], powerball: 3 },
  { date: '2024-09-11', numbers: [22, 26, 39, 47, 63], powerball: 12 },
  { date: '2024-09-09', numbers: [9, 13, 36, 59, 61], powerball: 17 },
  { date: '2024-09-07', numbers: [18, 19, 27, 28, 45], powerball: 9 },
  { date: '2024-09-04', numbers: [1, 26, 32, 46, 51], powerball: 13 },
  { date: '2024-09-02', numbers: [21, 22, 30, 35, 54], powerball: 16 },
  { date: '2024-08-31', numbers: [4, 35, 41, 44, 58], powerball: 25 },
  { date: '2024-08-28', numbers: [17, 22, 25, 30, 38], powerball: 4 },
  { date: '2024-08-26', numbers: [5, 16, 18, 26, 67], powerball: 24 },
  { date: '2024-08-24', numbers: [1, 7, 46, 47, 63], powerball: 7 },
];

/**
 * Analyze number frequency from historical data
 */
export function analyzeFrequency() {
  const mainNumberFreq = {};
  const powerballFreq = {};

  // Initialize frequency maps
  for (let i = 1; i <= 69; i++) {
    mainNumberFreq[i] = 0;
  }
  for (let i = 1; i <= 26; i++) {
    powerballFreq[i] = 0;
  }

  // Count occurrences
  HISTORICAL_DRAWINGS.forEach(drawing => {
    drawing.numbers.forEach(num => {
      mainNumberFreq[num]++;
    });
    powerballFreq[drawing.powerball]++;
  });

  return { mainNumberFreq, powerballFreq };
}

/**
 * Get hot numbers (most frequently drawn)
 */
export function getHotNumbers(count = 10) {
  const { mainNumberFreq, powerballFreq } = analyzeFrequency();

  const sortedMainNumbers = Object.entries(mainNumberFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([num]) => parseInt(num));

  const sortedPowerballs = Object.entries(powerballFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([num]) => parseInt(num));

  return { mainNumbers: sortedMainNumbers, powerballs: sortedPowerballs };
}

/**
 * Get cold numbers (least frequently drawn)
 */
export function getColdNumbers(count = 10) {
  const { mainNumberFreq, powerballFreq } = analyzeFrequency();

  const sortedMainNumbers = Object.entries(mainNumberFreq)
    .sort(([, a], [, b]) => a - b)
    .slice(0, count)
    .map(([num]) => parseInt(num));

  const sortedPowerballs = Object.entries(powerballFreq)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 5)
    .map(([num]) => parseInt(num));

  return { mainNumbers: sortedMainNumbers, powerballs: sortedPowerballs };
}

/**
 * Get statistical summary
 */
export function getStatistics() {
  const { mainNumberFreq, powerballFreq } = analyzeFrequency();

  const totalDrawings = HISTORICAL_DRAWINGS.length;

  // Most/least common main number
  const mainEntries = Object.entries(mainNumberFreq);
  const mostCommonMain = mainEntries.reduce((a, b) => a[1] > b[1] ? a : b);
  const leastCommonMain = mainEntries.reduce((a, b) => a[1] < b[1] ? a : b);

  // Most/least common powerball
  const pbEntries = Object.entries(powerballFreq);
  const mostCommonPB = pbEntries.reduce((a, b) => a[1] > b[1] ? a : b);
  const leastCommonPB = pbEntries.reduce((a, b) => a[1] < b[1] ? a : b);

  return {
    totalDrawings,
    mostCommonMainNumber: { number: parseInt(mostCommonMain[0]), count: mostCommonMain[1] },
    leastCommonMainNumber: { number: parseInt(leastCommonMain[0]), count: leastCommonMain[1] },
    mostCommonPowerball: { number: parseInt(mostCommonPB[0]), count: mostCommonPB[1] },
    leastCommonPowerball: { number: parseInt(leastCommonPB[0]), count: leastCommonPB[1] },
  };
}
