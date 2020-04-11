import { BombRunDuration } from "./config";

export const secondsDecrement = (seconds, engineOff) => {
  if (!engineOff ) {
    return BombRunDuration;
  }

  if (seconds <= 0) {
    return 0;
  }

  return seconds - 1;
};

export const toggleLock = (dice, position) => {
  const newDice = [...dice];
  newDice[position].locked = !newDice[position].locked;

  return newDice;
};

export const randomDie = () => {
  return 1 + Math.floor(Math.random() * 6);
}

export const rollDice = (dice) => {
  return dice.map(v => {
    if (v.locked || !v.available) {
      return {...v};
    } else {
      return {
        value: randomDie(),
        locked: false,
        available: true
      };
    }
  });
};