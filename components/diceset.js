import Die from "./die";

const setStyle = {

};

const DiceSet = props => (
  props.values.map(val => (
    <Die value={val} />
  ))
);

export default DiceSet;