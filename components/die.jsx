const imgStyle = {
  width: "75px",
  height: "75px"
};

const dieImage = n =>
  [1, 2, 3, 4, 5, 6].includes(n) ? `/die_${n}.png` : "/die_null.png";

const Die = props => {
  return (
    <img
      src={dieImage(props.value)}
      style={imgStyle}
    />
  );
}

export default Die;