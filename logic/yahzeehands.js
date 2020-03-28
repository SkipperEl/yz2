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

console.log(countOccurrences([1, 1, 2, 6, 6, 6,4,  3, 4, 6]));