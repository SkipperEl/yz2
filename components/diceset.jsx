import SourceDie from "./sourceDie";

const rowStyle = {
  width: "600px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between"
};

const DiceSet = props => {
  return (
    <div style={rowStyle}>
      {props.diceState.map((v, i) => (
        <SourceDie
          value={v.value}
          key={i}
          onDrop={(dropResult) => props.onDrop(i, dropResult.targetIndex, dropResult.dieIndex)}
        />
      ))}
    </div>
  );
};

export default DiceSet;