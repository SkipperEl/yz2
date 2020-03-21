import DiceSet from "../components/diceset";

export default function Index() {

  return (
    <DiceSet diceState={[
      {value: 1, locked: true},
      {value: 2, locked: false},
      {value: 3, locked: true},
      {value: 5, locked: true},
      {value: 6, locked: false}
    ]} />
  );
}