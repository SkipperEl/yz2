const targetStyle = {
  marginTop: "5px",
  fontSize: 28,
  fontWeight: "500"
};

const Target = props => {

  const targetText = `To hit target: ${props.target.count} or more ${props.target.value}`;
  const successText = `${props.target.matched ? "SUCCESS!" : ''}`;

  return (
    <span style={targetStyle}>
      {`${targetText}  ${successText}`}
    </span>
  );
};

export default Target;