import React, { useState } from "react";

import DiceSet from "../components/diceset";

export default function Index() {
  const [diceState, setDiceState] = useState([
    {value: 1, locked: true},
    {value: 1, locked: false},
    {value: 1, locked: true},
    {value: 2, locked: true},
    {value: 5, locked: false}
  ]);

  return (
    <DiceSet diceState={diceState} />
  );
}