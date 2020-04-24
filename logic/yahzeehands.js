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

const hasXOfAKindOrHigher = (dice, value, count) => {
  const countMap = generateCountMap(dice);

  for( let i=value; i<= 6; i+=1) {
    if (countMap[i] >= count) {
      return true;
    }
  }

  return false;
};

const isTargetMatched = (target) => {
  if (target.type === "XOfAKindOrHigher") {
    return hasXOfAKindOrHigher(target.dice, target.value, target.count);
  }

  return false;
};

export const updateTargetMatching = (targets) => {
  let score = 0;
  let newTargets = [];
  let addTargets = 0;

  targets.forEach(target => {
    if (isTargetMatched(target)) {
      score += target.score;
      addTargets += 1;
    } else {
      newTargets.push(target);
    }
  });

  if (score > 0) {
    newTargets.push(generateTarget());
  }

  return {
    newTargets,
    score
  };
};

const generateTarget = () => {
  const value = randomDie();
  const count = 2 + Math.floor(Math.random() * 2);
  const score = 5 + value * count;

  return {
    type: "XOfAKindOrHigher",
    value,
    count,
    score,
    dice: Array(count).fill(0),
    complete: false
  };
}

export const generateTargets = n => {
  const targets = [];
  for (let i = 0; i < n; i++) {
    targets.push(generateTarget());
  }

  return targets;
};

/*
const mockTargets = [
  {
    type: "XOfAKindOrHigher",
    value: 3,
    count: 3,
    dice: [4, 4, 0],
    complete: false
  },
  {
    type: "XOfAKindOrHigher",
    value: 2,
    count: 3,
    dice: [2, 0, 0],
    complete: false
  }
];
*/

//const testDice = [1, 1, 2, 3, 4, 5, 5, 5, 5, 6];
//console.log(hasOfAKind(testDice, 1, 2));
//console.log(hasOfAKind(testDice, 1, 3));
//console.log(hasOfAKind(testDice, 5, 4));
//console.log(hasOfAKind(testDice, 3, 4));
