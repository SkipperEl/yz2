import React, { useContext } from "react";

import { GameContext } from "../logic/gamecontext";

const row = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end"
};

const scoreStyle = {
  fontSize: 32,
  fontWeight: "700"
};

const StatusBar = () => {
  const [state, dispatch] = useContext(GameContext);

  return (
    <div style={row}>
      <span style={scoreStyle}>
        {state.score}
      </span>
    </div>
  );
};

export default StatusBar;