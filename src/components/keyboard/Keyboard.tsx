import { useEffect } from "react";

import { ENTER_TEXT } from "../../globals/constants/strings";
import { getStatuses } from "../../utils/statuses";
import { Key } from "./Key";
import { RiDeleteBack2Line } from "react-icons/ri";

interface KeyboardProps {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  solution: string;
  guesses: string[];
  isRevealing?: boolean;
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  solution,
  guesses,
  isRevealing,
}: KeyboardProps) => {
  const charStatuses = getStatuses(solution, guesses);

  const onClick = (value: string) => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "DELETE") {
      onDelete();
    } else {
      onChar(value);
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace") {
        onDelete();
      } else {
        const key = e.key.toUpperCase();
        if ((key.length === 1 && key >= "A" && key <= "Z") || key === "Ñ") {
          onChar(key);
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onEnter, onDelete, onChar]);

  return (
    <div>
      <div className="mb-1 flex justify-center">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="mb-1 flex justify-center">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick}>
          <RiDeleteBack2Line size={20} />
        </Key>
      </div>
    </div>
  );
};
