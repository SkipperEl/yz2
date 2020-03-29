import React, { useEffect, useContext, useRef } from "react";

import { GameContext } from "../logic/gamecontext";

const col = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
};

const bombRunButton = {
  width: "150px",
  height: "50px",
  backgroundColor: "#00cc33"
};

const secondsStyle = {
  marginTop: "15px",
  fontSize: 32,
  fontWeight: "700"
}

const targetStyle = {
  fontSize: 28,
  fontWeight: "500"
};

const BombRun = props => {
  const [state, dispatch] = useContext(GameContext);

  useEffect(() => {
    let interval = null;

    if (state.engineOff) {
      interval = window.setInterval(() => {
        dispatch({type: "secondElapsed"});
      }, 1000);
    } else {
      window.clearInterval(interval);
    }

    return () => window.clearInterval(interval);

  }, [state.engineOff]);

  const crashText = state.secondsRemaining > 0 ? `Crash in: ${state.secondsRemaining}s` : `CRASH!!`;
  const targetText = `To hit target: ${state.target.count} or more ${state.target.value}`;

  return (
    <div style={col}>
      <button
        style={bombRunButton}
        onClick={() => dispatch({type: state.engineOff ? "activateEngine" : "cutEngine"})}
      >
        {state.engineOff ? "Restart Engine" : "Start attack"}
      </button>

      {state.engineOff &&
        <span style={targetStyle}>
          {targetText}
        </span>
      }

      { state.engineOff &&
        <span style={secondsStyle}>
          {crashText}
        </span>
      }

      { state.targetMatched &&
        <span style={targetStyle}>
          YAY! YOU DID IT!
        </span>
      }


    </div>
  );


};

export default BombRun;