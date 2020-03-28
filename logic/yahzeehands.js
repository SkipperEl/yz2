const countOccurrences = (dice) => {
  const count = {};
  count[1] = 0;
  count[2] = 0;
  count[3] = 0;
  count[4] = 0;
  count[5] = 0;
  count[6] = 0;

  return dice.reduce((acc, cur) => {
    acc[cur] += 1;
    return acc;
  }, count);
};

console.log(countOccurrences([1, 1, 2,6, 6, 6,  3, 4, 6]));