import React, { useReducer, createContext } from "react";

export const GameContext = createContext();

import { BombRunDuration } from "./config";
import { secondsDecrement, toggleLock, randomDie, rollDice } from "./logichelp";
import { matchTarget, updateTargetMatching, generateTargets } from "./yahzeehands";

const initialDice = [
  {value: 0, locked: false, available: true},
  {value: 0, locked: false, available: true},
  {value: 0, locked: false, available: true},
  {value: 0, locked: false, available: true},
  {value: 0, locked: false, available: true}
];

export const GameSteps = {
  start: "start",
  bombing: "bombing",
  restartingEngine: "restartingEngine",
  over: "over"
};

const initialState = {
  gameStep: "start",

  dice: [...initialDice],
  rollsLeft: 3,

  engineOff: false,
  secondsRemaining: BombRunDuration,

  targets: [],

  score: 0,
  health: 5
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
        srcDieValue >= state.targets[action.targetIndex].value)
      {
        // move the die
        const newDice = [...state.dice];
        newDice[action.srcDieIndex].value = 0;
        newDice[action.srcDieIndex].available = false;

        const updatedTargets = [...state.targets];
        updatedTargets[action.targetIndex].dice[action.targetDieIndex] = srcDieValue;

        // Update target completion. Only replenish in bombing step.
        const newStuff = updateTargetMatching(updatedTargets, state.gameStep === GameSteps.bombing);

        // If there are no targets, transition to start step
        const nextStep = newStuff.newTargets.length === 0 ? GameSteps.start : state.gameStep;

        return {
          ...state,
          gameStep: nextStep,
          dice: newDice,
          targets: newStuff.newTargets,
          score: state.score + newStuff.score
        };
      }

      return {
        ...state
      };

    case "beginBombing":
      return {
        ...state,
        gameStep: GameSteps.bombing,
        secondsRemaining: BombRunDuration,
        targets: generateTargets(2)
      };

    case "restartEngine":
      return {
        ...state,
        gameStep: GameSteps.restartingEngine,
        targets: generateTargets(1)
      };

    case "secondElapsed": {
      let newSeconds = state.secondsRemaining;
      if (state.gameStep === GameSteps.bombing || state.gameStep === GameSteps.restartingEngine) {
        newSeconds -= 1;
        if (newSeconds < 0) {
          newSeconds = 0;
          newGameStep = GameSteps.over;
        }
      } else {
        newSeconds = BombRunDuration;
      }

      return {
        ...state,
        secondsRemaining: newSeconds,
        gameStep: newGameStep
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