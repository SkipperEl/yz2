import React, { useReducer, createContext } from "react";

export const GameContext = createContext();

const bombRunDuration = 3;

const initialState = {
  engineOff: false,
  secondsRemaining: bombRunDuration,

  dice: [
    {value: 0, locked: false},
    {value: 0, locked: false},
    {value: 0, locked: false},
    {value: 0, locked: false},
    {value: 0, locked: false}
  ],
  rollsLeft: 3
};

const secondsDecrement = (seconds, engineOff) => {
  if (!engineOff ) {
    return bombRunDuration;
  }

  if (seconds <= 0) {
    return 0;
  }

  return seconds - 1;
};

const toggleLock = (dice, position) => {
  const newDice = [...dice];
  newDice[position].locked = !newDice[position].locked;

  return newDice;
};

const randomDie = () => {
  return 1 + Math.floor(Math.random() * 6);
}

const rollDice = (dice) => {
  return dice.map(v => {
    if (v.locked) {
      return v;
    } else {
      return {
        value: randomDie(),
        locked: false
      };
    }
  });
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return initialState;

    case 'roll':
      console.log("roll");
      return {
        ...state,
        dice: rollDice(state.dice),
        rollsLeft: state.rollsLeft - 1
      }

    case 'lockToggle':
      return {
        ...state,
        dice: toggleLock(state.dice, action.position)
      }

    case "cutEngine":
      return {
        ...state,
        engineOff: true,
        secondsRemaining: bombRunDuration
      };

    case "activateEngine":
      return {
        ...state,
        engineOff: false
      };

    case "secondElapsed": {
      return {
        ...state,
        secondsRemaining: secondsDecrement(state.secondsRemaining, state.engineOff)
      };
    }

    default:
      console.log("bad reducer!");
  }
};

export const GameContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={[state, dispatch]}>
      {props.children}
    </GameContext.Provider>
  );
};