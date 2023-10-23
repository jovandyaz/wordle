import Countdown from "react-countdown";
import {
  ACCEPT_TEXT,
  GUESS_DISTRIBUTION_TEXT,
  NEW_WORD_TEXT,
  STATISTICS_TITLE,
} from "../../globals/constants/strings";
import { GameStats } from "../../utils/localStorage";
import { Histogram } from "../stats/Histogram";
import { StatBar } from "../stats/StatBar";
import { BaseModal } from "./BaseModal";
import { tomorrow } from "@/utils/words";

interface StatsModalProps {
  isOpen: boolean;
  handleClose: () => void;
  solution: string;
  guesses: string[];
  gameStats: GameStats;
  isLatestGame: boolean;
  isGameLost: boolean;
  isGameWon: boolean;
  isHardMode: boolean;
  isDarkMode: boolean;
  isHighContrastMode: boolean;
  numberOfGuessesMade: number;
}

export const StatsModal = ({
  isOpen,
  handleClose,
  gameStats,
  isLatestGame,
  isGameLost,
  isGameWon,
  numberOfGuessesMade,
}: StatsModalProps) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    );
  }
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
        {GUESS_DISTRIBUTION_TEXT}
      </h4>
      <Histogram
        isLatestGame={isLatestGame}
        gameStats={gameStats}
        isGameWon={isGameWon}
        numberOfGuessesMade={numberOfGuessesMade}
      />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 columns-2 items-stretch justify-center text-center dark:text-white sm:mt-6">
          <div className="inline-block w-full text-left">
            {isLatestGame && (
              <div>
                <h5>{NEW_WORD_TEXT}</h5>
                <Countdown
                  className="text-lg font-medium text-gray-900 dark:text-gray-100"
                  date={tomorrow}
                  daysInHours={true}
                />
              </div>
            )}
          </div>
          <div>
            <button
              type="button"
              className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-base"
              onClick={handleClose}
            >
              {ACCEPT_TEXT}
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  );
};
