import React from "react";
import { useDrag } from "react-dnd";

import Die from "./die";

const containerStyle = {
  width: "75px",
  height: "75px",
};

const SourceDie = props => {
  const [{isDragging }, drag] = useDrag({
    item: { name: "die", type: "atype" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        props.onDrop(dropResult)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div style={containerStyle} ref={drag}>
      <Die value={props.value} />
    </div>
  );
}

export default SourceDie;