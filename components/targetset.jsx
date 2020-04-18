import DropTarget from "./droptarget";

const itemRow = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
};

const itemStyle = {
  marginRight: "25px"
};

const checkStyle = {
  width: "50px",
  height: "50px",
  marginTop: "175px"
};

const TargetSet = props => {
  return (
    <div style={itemRow}>
      {props.target.dice.map( (v, i) => (
        <div style={itemStyle} key={i}>
          <DropTarget
            targetValue={props.target.value}
            value={v}
            dieIndex={i}
            targetIndex={props.targetIndex}
          />
        </div>
      ))}

      { props.target.complete && (
        <img
          src="/check.png"
          style={checkStyle}
        />
      )}

    </div>
  );
};

export default TargetSet;