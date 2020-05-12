import React, { useEffect, useContext, useRef } from "react";

import { GameContext, GameSteps } from "../logic/gamecontext";
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

const StartStep = props => {
  const [state, dispatch] = useContext(GameContext);

  return (
    <div style={col}>
      <button
        style={bombRunButton}
        onClick={() => dispatch({type: "beginBombing"})}
      >
        Start attack
      </button>
    </div>
  );
};

const BombingStep = props => {
  const [state, dispatch] = useContext(GameContext);

  return (
    <div style={col}>
      <button
        style={bombRunButton}
        onClick={() => dispatch({type: "restartEngine" })}
      >
        Restart Engine
      </button>

      <span style={secondsStyle}>
        {`Crash in: ${state.secondsRemaining}s`}
      </span>

      <div style={targetListStyle}>
        {state.targets.map((v, i) => (
          <div style={targetSpacer} key={i}>
            <TargetSet
              target={v}
              targetIndex={i}
            />
          </div>
        ))}
      </div>

    </div>
  );

};

const RestartingEngineStep = props => {
  const [state, dispatch] = useContext(GameContext);

  return (
    <div style={col}>
      <span style={secondsStyle}>
        {`Crash in: ${state.secondsRemaining}s`}
      </span>

      <div style={targetListStyle}>
        {state.targets.map((v, i) => (
          <div style={targetSpacer} key={i}>
            <TargetSet
              target={v}
              targetIndex={i}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

const OverStep = props => {
  return (
    <h1>
      CRASHED! Bummer.
    </h1>
  );
};

const BombRun = props => {
  const [state, dispatch] = useContext(GameContext);

  useEffect(() => {
    let interval = null;

    if (state.gameStep === GameSteps.bombing || state.gameStep === GameSteps.restartingEngine) {
      interval = window.setInterval(() => {
        if (EnableCountdown) {
          dispatch({type: "secondElapsed"});
        }
      }, 1000);
    } else if (state.gameStep === GameSteps.over || state.gameStep === GameSteps.start) {
      window.clearInterval(interval);
    }

    return () => window.clearInterval(interval);

  }, [state.gameStep]);

  if ( state.gameStep === GameSteps.start) {
    return (<StartStep />);
  }
  if (state.gameStep === GameSteps.bombing) {
    return (<BombingStep />);
  }
  if (state.gameStep === GameSteps.restartingEngine) {
    return (<RestartingEngineStep />);
  }
  if (state.gameStep === GameSteps.over) {
    return (<OverStep />);
  }

  return null;
};

export default BombRun;