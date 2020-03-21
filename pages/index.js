import Die from "../components/die";
import DiceSet from "../components/diceset";

export default function Index() {
  return (
    <div>
      <p>Hello Next.js</p>
      <Die value={1}/>
      <DiceSet values={[1, 2, 3, 4, 5, 6]} />
    </div>
  );
}