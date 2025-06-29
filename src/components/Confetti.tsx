import Confetti from "react-confetti";

export default function Celebration() {
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      recycle={false} // Para que solo se muestre una vez
      numberOfPieces={500}
    />
  );
}
