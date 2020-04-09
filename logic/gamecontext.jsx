import React, { useReducer, createContext } from "react";

export const GameContext = createContext();

import { BombRunDuration } from "./config";
import { secondsDecrement, toggleLock, randomDie, rollDice } from "./logichelp";
import { matchTarget, generateTargets } from "./yahzeehands";

const initialDice = [
  {value: 0, locked: false},
  {value: 0, locked: false},
  {value: 0, locked: false},
  {value: 0, locked: false},
  {value: 0, locked: false}
];

const mockTargets = [
  {
    type: "XOfAKind",
    value: 3,
    count: 3,
    dice: [4, 4, 0]
  },
  {
    type: "XOfAKind",
    value: 2,
    count: 3,
    dice: [2, 0, 0]
  }
];

const initialState = {
  dice: [...initialDice],
  rollsLeft: 3,

  engineOff: false,
  secondsRemaining: BombRunDuration,

  targets = mockTargets
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return initialState;

    case 'resetDice':
      return {
        ...state,
        dice: [...initialDice],
        rollsLeft: 3
      }

    case 'roll':
      const newDice = rollDice(state.dice);

      return {
        ...state,
        dice: newDice,
        rollsLeft: state.rollsLeft - 1
      }

    case "cutEngine":
      return {
        ...state,
        engineOff: true,
        secondsRemaining: BombRunDuration
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