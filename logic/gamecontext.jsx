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

const initialState = {
  engineOff: false,
  secondsRemaining: BombRunDuration,
  activeTarget: 0,
  targets: [],
  dice: [...initialDice],
  rollsLeft: 3,
  targetsAllHit: false,
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
      const newTargets = matchTarget(newDice, state.targets, state.activeTarget);
      const newActiveTarget = newTargets[state.activeTarget].matched ? state.activeTarget + 1 : state.activeTarget;
      const targetsAllHit = state.engineOff && newActiveTarget >= newTargets.length

      return {
        ...state,
        dice: newDice,
        rollsLeft: state.rollsLeft - 1,
        targets: newTargets,
        activeTarget: newActiveTarget,
        targetsAllHit
      }

    case "cutEngine":
      return {
        ...state,
        engineOff: true,
        secondsRemaining: BombRunDuration,
        targets: generateTargets(3),
        activeTarget: 0,
        targetsAllHit: false
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