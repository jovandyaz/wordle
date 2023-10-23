import { getGuessStatuses } from "../../utils/statuses";
import { unicodeSplit } from "../../utils/words";
import { Cell } from "./Cell";

interface CompleteRowProps {
  solution: string;
  guess: string;
  isRevealing?: boolean;
}

export const CompletedRow = ({
  solution,
  guess,
  isRevealing,
}: CompleteRowProps) => {
  const statuses = getGuessStatuses(solution, guess);
  const splitGuess = unicodeSplit(guess);

  return (
    <div className="mb-1 flex justify-center">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  );
};
