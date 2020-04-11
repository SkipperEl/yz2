import React from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import { GameContextProvider } from "../logic/gamecontext";

import DiceRoller from "../components/diceroller";
import BombRun from "../components/bombrun";
import DropTarget from "../components/droptarget";

export default function Index() {
  return (
    <DndProvider backend={Backend}>
      <GameContextProvider>
        <h1>Don't say I don't love you, Rich</h1>
        <DiceRoller />
        <BombRun />

        <h6>Build 0014</h6>
      </GameContextProvider>
    </DndProvider>
  );
}