import React, { useReducer } from "react";

import DiceSet from "../components/diceset";

const initialState = {
  dice: [
    {value: 0, locked: false},
    {value: 0, locked: false},
    {value: 0, locked: false},
    {value: 0, locked: false},
    {value: 0, locked: false}
  ],
  rollsLeft: 3
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

    default:
      console.log("bad reducer!");
  }
};

const rollButtonStyle = {
  width: "100px",
  height: "50px",

  backgroundColor: "#00aaaa"
};

const row = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
};

const rollsLeft = {
  marginLeft: "20px",
  marginRight: "20px"
};

export default function Index() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={row}>

      <DiceSet
        diceState={state.dice}
        onClick={(i) => dispatch({type: "lockToggle", position: i})}
      />

      <div style={rollsLeft}>{`Rolls: ${state.rollsLeft}`}</div>

      {state.rollsLeft > 0 ? (
        <button
          style={rollButtonStyle}
          onClick={() => dispatch({type: "roll"})}
        >
          ROLL
        </button>
      ) : (
        <button
          style={rollButtonStyle}
          onClick={() => dispatch({type: "reset"})}
        >
          Reset
        </button>
      )}

    </div>
  );
}