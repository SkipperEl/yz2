import React, { useReducer, createContext } from "react";

export const GameContext = createContext();

import { BombRunDuration } from "./config";
import { secondsDecrement, toggleLock, randomDie, rollDice } from "./logichelp";
import { matchTarget, updateTargetMatching } from "./yahzeehands";

const initialDice = [
  {value: 0, locked: false, available: true},
  {value: 0, locked: false, available: true},
  {value: 0, locked: false, available: true},
  {value: 0, locked: false, available: true},
  {value: 0, locked: false, available: true}
];

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

const initialState = {
  dice: [...initialDice],
  rollsLeft: 3,

  engineOff: false,
  secondsRemaining: BombRunDuration,

  targets: mockTargets
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

    case 'dropDie':
      //console.log(action.srcDieIndex, action.targetIndex, action.targetDieIndex);

      // check if the die can be moved
      const srcDieValue = state.dice[action.srcDieIndex].value;
      if (
        state.dice[action.srcDieIndex].available &&
        srcDieValue >= state.targets[action.targetIndex].dice[action.targetDieIndex] &&
        srcDieValue >= state.targets[action.targetIndex].value)
      {
        // move the die
        const newDice = [...state.dice];
        newDice[action.srcDieIndex].value = 0;
        newDice[action.srcDieIndex].available = false;

        const newTargets = [...state.targets];
        newTargets[action.targetIndex].dice[action.targetDieIndex] = srcDieValue;

        // Update target completion
        updateTargetMatching(newTargets);

        return {
          ...state,
          dice: newDice,
          targets: newTargets
        };
      }

      return {
        ...state
      };

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