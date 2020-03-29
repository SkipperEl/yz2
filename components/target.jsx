const targetStyle = {
  marginTop: "5px",
  fontSize: 28,
  fontWeight: "500"
};

const Target = props => {

  const targetText = `To hit target: ${props.target.count} or more ${props.target.value}`;
  const successText = `${props.target.matched ? "SUCCESS!" : '"'}`;

  return (
    <div style={targetStyle}>
      {`${targetText}  ${successText}`}
    </div>
  );
};

export default Target;