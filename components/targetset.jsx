import DropTarget from "./droptarget";

const itemRow = {
  display: "flex",
  flexDirection: "row"
};

const itemStyle = {
  marginRight: "5px"
};

const TargetSet = props => {
  return (
    <div style={itemRow}>
      {props.target.dice.map( (v, i) => (
        <div style={itemStyle}>
          <DropTarget
            targetValue={props.target.value}
            value={v}
            dieIndex={i}
            targetIndex={props.targetIndex}
            key={i}
          />
        </div>
      ))}
    </div>
  );
};

export default TargetSet;