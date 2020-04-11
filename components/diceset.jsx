import SourceDie from "./sourceDie";

const rowStyle = {
  width: "600px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between"
};

const DiceSet = props => {
  const handleDrop = (i, dropResult) => {
    alert(`die ${i} => target ${dropResult.targetIndex} die ${dropResult.dieIndex}`);
  };

  return (
    <div style={rowStyle}>
      {props.diceState.map((v, i) => (
        <SourceDie
          value={v.value}
          key={i}
          onDrop={(dropResult) => handleDrop(i, dropResult)}
        />
      ))}
    </div>
  );
};

export default DiceSet;