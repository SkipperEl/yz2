import Die from "./die";

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
      <Die
        value={v.value}
        key={i}
      />
    ))}
  </div>
);

export default DiceSet;