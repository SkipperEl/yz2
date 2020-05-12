import React from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import { GameContextProvider } from "../logic/gamecontext";

import StatusBar from "../components/statusbar";
import DiceRoller from "../components/diceroller";
import BombRun from "../components/bombrun";
import DropTarget from "../components/droptarget";

export default function Index() {
  return (
    <DndProvider backend={Backend}>
      <GameContextProvider>
        <h1>Happy Birthday, old coot</h1>
        <StatusBar />
        <DiceRoller />
        <BombRun />

        <h6>Build 0024</h6>
      </GameContextProvider>
    </DndProvider>
  );
}