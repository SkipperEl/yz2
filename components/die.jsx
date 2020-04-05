import React from "react";
import { useDrag } from "react-dnd";

const containerStyle = {
  width: "75px",
  height: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const imgStyle = {
  width: "75px",
  height: "75px"
};

const lockStyle = {
  width: "35px",
  height: "35px",
  marginTop: "-12px"
};

const dieImage = n =>
  [1, 2, 3, 4, 5, 6].includes(n) ? `/die_${n}.png` : "/die_null.png";

const Die = props => {
  const [{isDragging }, drag] = useDrag({
    item: { name: "die", type: "atype" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        alert("yayyy");
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div style={containerStyle} ref={drag}>
      <img
        src={dieImage(props.value)}
        style={imgStyle}
        onClick={props.onClick}
      />
      {props.locked && <img
        src="/lock.png"
        style={lockStyle}
      />}
    </div>
  );
}

export default Die;