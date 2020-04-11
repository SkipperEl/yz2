import DropTarget from "./droptarget";

const itemRow = {
  display: "flex",
  flexDirection: "row"
};

const itemStyle = {
  marginRight: "25px"
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
    </div>
  );
};

export default TargetSet;