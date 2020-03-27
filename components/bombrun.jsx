import React, { useEffect, useContext, useRef } from "react";

const row = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
};

const bombRunButton = {
  width: "150px",
  height: "50px",
  backgroundColor: "#00cc33"
};

const secondsStyle = {
  marginLeft: "15px",
  fontSize: 32,
  fontWeight: "700"
}

const BombRun = props => {
  const [state, dispatch] = useContext(ContactContext);

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

  return (
    <div style={row}>
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



    </div>
  );


};

export default BombRun;