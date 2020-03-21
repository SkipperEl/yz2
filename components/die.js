const imgStyle = {
  width: "75px",
  height: "75px"
};

const Die = props => (
  <img
    src={`/die_${props.value}.png`}
    style={imgStyle}
    onClick={props.onClick}
  />
);

export default Die;