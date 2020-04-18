// target types: XOfAKind
// value: 1-6  (dice face value)
// count: 2-6 (count of dice face value)

import { randomDie } from "./logichelp";

const generateCountMap = dice =>
  dice.reduce((acc, cur) => {
    acc[cur.value] += 1;
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

const isTargetMatched = (dice, target) => {
  if (target.type === "XOfAKindOrHigher") {
    return hasXOfAKindOrHigher(target.dice, target.value, target.count);
  }

  return false;
};

export const updateTargetMatching = (targets) => {
  targets.forEach(target => {
    target.complete = isTargetMatched(target);
  });
}

const generateTarget = () => {
  return {
    matched: false,
    type: "XOfAKind",
    value: randomDie(),
    count: 2 + Math.floor(Math.random() * 2)
  };
}

export const generateTargets = n => {
  console.log("generateTargets", n);

  const targets = [];
  for (let i = 0; i < n; i++) {
    targets.push(generateTarget());
  }

  console.log("targets: ", targets);

  return targets;
};

//const testDice = [1, 1, 2, 3, 4, 5, 5, 5, 5, 6];
//console.log(hasOfAKind(testDice, 1, 2));
//console.log(hasOfAKind(testDice, 1, 3));
//console.log(hasOfAKind(testDice, 5, 4));
//console.log(hasOfAKind(testDice, 3, 4));
