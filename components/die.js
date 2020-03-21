
const containerStyle = {
  width: "75px",
  height: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const imgStyle = {
  width: "75px",
  height: "75px"
};

const lockStyle = {
  width: "35px",
  height: "35px",
  marginTop: "-18px"
};

const Die = props => (
  <div style={containerStyle}>
    <img
      src={`/die_${props.value}.png`}
      style={imgStyle}
      onClick={props.onClick}
    />
    <img
      src="/lock.png"
      style={lockStyle}
    />
  </div>
);

export default Die;