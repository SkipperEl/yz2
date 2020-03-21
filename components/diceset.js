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
    {props.values.map((val, i) => (
      <Die
        value={val}
        key={i}
        onClick={()=>console.log(val)}
      />
    ))}
  </div>
);

export default DiceSet;