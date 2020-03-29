// target types: XOfAKind
// value: 1-6  (dice face value)
// count: 2-6 (count of dice face value)

import { randomDie } from "./logichelp";

const generateCountMap = dice =>
  dice.reduce((acc, cur) => {
    acc[cur] += 1;
    return acc;
  }, {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
  });

const hasOfAKind = (dice, value, count) => {
  const countMap = generateCountMap(dice);

  return countMap[value] >= count;
}

export const isTargetMatched = (dice, target) => {
  if (target.type === "XOfAKind") {
    return hasOfAKind(dice, target.value, target.count);
  }

  return false;
};

export const generateTarget = () => {
  return {
    type: "XOfAKind",
    value: randomDie(),
    count: 2 + Math.floor(Math.random() * 2)
  };
}

//const testDice = [1, 1, 2, 3, 4, 5, 5, 5, 5, 6];
//console.log(hasOfAKind(testDice, 1, 2));
//console.log(hasOfAKind(testDice, 1, 3));
//console.log(hasOfAKind(testDice, 5, 4));
//console.log(hasOfAKind(testDice, 3, 4));
