import React from "react";
import { useDrop } from "react-dnd";

import Die from "./Die";

const containerStyle = {
  backgroundColor: "#cccccc",
  width: "75px",
  height: "150px",
  marginTop: "100px"
};

const DropTarget = props => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "atype",
    drop: () => ({
      name: "droptarget",
      targetIndex: props.targetIndex,
      dieIndex: props.dieIndex
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  let backgroundColor = "#888888";
  if (isOver) {
    if (canDrop) {
      backgroundColor = "#66ff66";
    } else {
      backgroundColor = "#aaaaaa";
    }
  }

  return (
    <div ref={drop} style={{...containerStyle, backgroundColor}}>
      <Die value={props.targetValue} />
      <Die value={props.value} />
    </div>
  );
};

export default DropTarget;