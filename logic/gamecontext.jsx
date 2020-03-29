import React, { useReducer, createContext } from "react";

export const GameContext = createContext();

import { BombRunDuration } from "./config";
import { secondsDecrement, toggleLock, randomDie, rollDice } from "./logichelp";
import { isTargetMatched, generateTarget } from "./yahzeehands";

const initialDice = [
  {value: 0, locked: false},
  {value: 0, locked: false},
  {value: 0, locked: false},
  {value: 0, locked: false},
  {value: 0, locked: false}
];

const initialState = {
  engineOff: false,
  secondsRemaining: BombRunDuration,
  target: {
    type: "", // XOfAKind",
    value: 0, // 1-6
    count: 0  // 2-5
  },
  targetMatched: false,

  dice: [...initialDice],
  rollsLeft: 3
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
      return {
        ...state,
        dice: rollDice(state.dice),
        rollsLeft: state.rollsLeft - 1,
        targetMatched: isTargetMatched(stage.dice, state.target)
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
        secondsRemaining: BombRunDuration,
        target: generateTarget()
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