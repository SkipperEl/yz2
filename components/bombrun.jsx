import React, { useEffect, useContext, useRef } from "react";

import { GameContext } from "../logic/gamecontext";
import { EnableCountdown } from "../logic/config";

import TargetSet from "./targetset";

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

const targetListStyle = {
  display: "flex",
  flexDirection: "column"
};

const targetSpacer = {
  marginBottom: "10px"
};

const BombRun = props => {
  const [state, dispatch] = useContext(GameContext);

  useEffect(() => {
    let interval = null;

    if (state.engineOff) {
      interval = window.setInterval(() => {
        if (EnableCountdown) {
          dispatch({type: "secondElapsed"});
        }
      }, 1000);
    } else {
      window.clearInterval(interval);
    }

    return () => window.clearInterval(interval);

  }, [state.engineOff]);

  const crashText = state.secondsRemaining > 0 ? `Crash in: ${state.secondsRemaining}s` : `CRASH!!`;

  return (
    <div style={col}>
      <button
        style={bombRunButton}
        onClick={() => dispatch({type: state.engineOff ? "activateEngine" : "cutEngine"})}
      >
        {state.engineOff ? "Restart Engine" : "Start attack"}
      </button>

      { state.engineOff &&
        <span style={secondsStyle}>
          {crashText}
        </span>
      }

      <div style={targetListStyle}>
        {state.targets.map((v, i) => (
          <div style={targetSpacer}>
            <TargetSet
              target={v}
              key={i}
            />
          </div>
        ))}
      </div>

    </div>
  );


};

export default BombRun;