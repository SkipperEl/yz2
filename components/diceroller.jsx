import React, { useContext } from "react";

import { GameContext } from "../logic/gamecontext";

import DiceSet from "../components/diceset";

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
  const [state, dispatch] = useContext(GameContext);

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