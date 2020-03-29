const targetStyle = {
  display: "flex",
  marginTop: "5px",
  flexDirection: "row"
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