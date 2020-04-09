import SourceDie from "./sourceDie";

const rowStyle = {
  width: "600px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between"
};

const DiceSet = props => (
  <div style={rowStyle}>
    {props.diceState.map((v, i) => (
      <SourceDie
        value={v.value}
        index={i}
        key={i}
      />
    ))}
  </div>
);

export default DiceSet;