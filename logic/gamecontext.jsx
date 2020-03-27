import React, { useReducer, createContext } from "react";

export const GameContext = createContext();

import { BombRunDuration } from "./config";
import { secondsDecrement, toggleLock, randomDie, rollDice } from "./logichelp";

const initialState = {
  engineOff: false,
  secondsRemaining: BombRunDuration,

  dice: [
    {value: 0, locked: false},
    {value: 0, locked: false},
    {value: 0, locked: false},
    {value: 0, locked: false},
    {value: 0, locked: false}
  ],
  rollsLeft: 3
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