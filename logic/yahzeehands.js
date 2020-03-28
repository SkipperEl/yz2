const countOccurrences = dice =>
  dice.reduce((acc, cur) => {
    acc[cur] += 1;
    return acc;
  }, {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
  });

export const hasOfAKind = (dice, value, targetCount) => {
  const counts = countOccurrences(dice);

  return counts[value] >= targetCount;
}

//const testDice = [1, 1, 2, 3, 4, 5, 5, 5, 5, 6];
//console.log(hasOfAKind(testDice, 1, 2));
//console.log(hasOfAKind(testDice, 1, 3));
//console.log(hasOfAKind(testDice, 5, 4));
//console.log(hasOfAKind(testDice, 3, 4));
