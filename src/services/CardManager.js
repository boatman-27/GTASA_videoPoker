import { returnTableData } from "./ReturnTableData.js";
const SUITS = { 1: "C", 2: "H", 3: "D", 4: "S" };
const VALUES = ["", "", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const VALUESMAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const LEVELS = {
  1: "firstLevel",
  2: "secondLevel",
  3: "thirdLevel",
  4: "fourthLevel",
  5: "fifthLevel",
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function chooseCards() {
  const cards = [];
  const selectedCards = new Set();

  while (cards.length < 5) {
    const randomSuit = SUITS[getRandomInt(4) + 1];
    const randomValue = VALUES[getRandomInt(13) + 2];

    const cardKey = `${randomValue}-${randomSuit}`;

    if (!selectedCards.has(cardKey)) {
      selectedCards.add(cardKey);
      cards.push({
        value: randomValue,
        suite: randomSuit,
        index: cards.length,
      });
    }
  }
  return cards;
}

function extractSuitesAndValues(cards) {
  const suites = [];
  const values = [];
  for (const card of cards) {
    suites.push(card.suite);
    values.push(VALUESMAP[card.value]);
  }
  return { suites, values };
}

export function determineHandRank(cards) {
  const { suites, values } = extractSuitesAndValues(cards);

  // Sort values in descending order
  const sortedValues = values.slice().sort((a, b) => b - a);

  // Check for Flush
  const isFlush = new Set(suites).size === 1;

  // Check for Straight
  const isStraight = sortedValues.every(
    (value, index) => index === 0 || sortedValues[index - 1] === value + 1
  );

  // Count the occurrences of each value
  const valueCounts = {};
  for (const value of values) {
    valueCounts[value] = (valueCounts[value] || 0) + 1;
  }

  // Convert valueCounts to an array of frequencies for example [4,1]
  const countArray = Object.values(valueCounts).sort((a, b) => b - a);

  // Determine hand ranking
  if (isFlush && isStraight && Math.max(...values) === 14) {
    return "Royal Flush";
  } else if (isStraight && isFlush) {
    return "Straight Flush";
  } else if (JSON.stringify(countArray) === JSON.stringify([4, 1])) {
    return "Four of a Kind";
  } else if (JSON.stringify(countArray) === JSON.stringify([3, 2])) {
    return "Full House";
  } else if (isFlush) {
    return "Flush";
  } else if (isStraight) {
    return "Straight";
  } else if (JSON.stringify(countArray) === JSON.stringify([3, 1, 1])) {
    return "Three of a Kind";
  } else if (JSON.stringify(countArray) === JSON.stringify([2, 2, 1])) {
    return "Two Pair";
  } else if (
    countArray.includes(2) &&
    sortedValues.some((value) => value >= 11)
  ) {
    return "Jacks or Better";
  } else {
    return "No Winning Hand";
  }
}

export function calculateWinnings(handRank, wager, level) {
  let totalWinnings = 0;
  for (const item of returnTableData) {
    if (item.hand === handRank) {
      const levelKey = LEVELS[level];
      const winnings = item[levelKey];
      totalWinnings = winnings * wager;
    }
  }
  return totalWinnings;
}
