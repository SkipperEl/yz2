import React, { useReducer } from "react";

import DiceSet from "../components/diceset";

const initialState = {
  dice: [
    {value: 1, locked: false},
    {value: 1, locked: false},
    {value: 1, locked: false},
    {value: 1, locked: false},
    {value: 1, locked: false}
  ]
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
    case 'roll':
      console.log("roll");
      return {
        ...state,
        dice: rollDice(state.dice)
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
  width: "200px",
  height: "25px",
  marginTop: "20px",
  backgroundColor: "#00aaaa"
};

export default function Index() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <DiceSet
        diceState={state.dice}
        onClick={(i) => dispatch({type: "lockToggle", position: i})}
      />
      <div
        style={rollButtonStyle}
        onClick={() => dispatch({type: "roll"})}
      >
        <p>ROLL</p>
      </div>
    </>
  );
}