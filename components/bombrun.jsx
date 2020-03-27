import React, { useEffect, useReducer, useRef } from "react";

const bombRunDuration = 10;

const initialState = {
  engineOff: false,
  secondsRemaining: bombRunDuration
};

const secondsDecrement = (seconds, engineOff) => {
  if (!engineOff ) {
    return bombRunDuration;
  }

  if (seconds <= 0) {
    return 0;
  }

  return seconds - 1;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "cutEngine":
      return {
        ...state,
        engineOff: true,
        secondsRemaining: bombRunDuration
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
  }
};

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
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const timer = window.setInterval(() => {
      dispatch({type: "secondElapsed"});
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };

  }, []);

  return (
    <div style={row}>
      <button
        style={bombRunButton}
        onClick={() => dispatch({type: state.engineOff ? "activateEngine" : "cutEngine"})}
      >
        {state.engineOff ? "Restart Engine" : "Cut Engine"}
      </button>

      { state.engineOff &&
        <span style={secondsStyle}>
          {`Crash in: ${state.secondsRemaining}s`}
        </span>
      }

    </div>
  );


};

export default BombRun;