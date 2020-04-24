import React, { useContext } from "react";

import { GameContext } from "../logic/gamecontext";

const row = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
};

const scoreStyle = {
  fontSize: 28,
  fontWeight: "700"
};

const StatusBar = () => {
  const [state, dispatch] = useContext(GameContext);

  return (
    <div style={row}>
      <span style={scoreStyle}>
        Score: {state.score}
      </span>
    </div>
  );
};

export default StatusBar;