import React from "react";

import { GameContextProvider } from "../logic/gamecontext";

import DiceRoller from "../components/diceroller";
import BombRun from "../components/bombrun";

export default function Index() {
  return (
    <GameContextProvider>
      <h1>Don't say I don't love you, Rich</h1>
      <DiceRoller />
      <BombRun />

      <h6>Build 0012</h6>
    </GameContextProvider>
  );
}