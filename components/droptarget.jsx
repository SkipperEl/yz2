import React from "react";
import { useDrop } from "react-dnd";

const containerStyle = {
  backgroundColor: "#cccccc",
  width: "350px",
  height: "150px",
  marginTop: "100px"
};

const DropTarget = props => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "atype",
    drop: () => ({ name: "droptarget", thing: 2 }),
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
    <div ref={drop} style={{...containerStyle, backgroundColor}} />
  );
};

export default DropTarget;