const targetStyle = {
  marginTop: "5px",
  fontSize: 28,
  fontWeight: "500"
};

const Target = props => {

  const targetText = `To hit target: ${props.target.count} or more ${props.target.value}`;
  const successText = `${props.target.matched ? "HIT" : ""}`;
  const activeText = `${props.isActive ? "<--" : ""}`

  return (
    <span style={targetStyle}>
      {`${targetText}  ${successText} ${activeText}`}
    </span>
  );
};

export default Target;