"use client";

import { default as GraphemeSplitter } from "grapheme-splitter";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { AlertContainer } from "../../components/alerts/AlertContainer";
import { Grid } from "../../components/grid/Grid";
import { Keyboard } from "../../components/keyboard/Keyboard";
import { InfoModal } from "../../components/modals/InfoModal";
import { StatsModal } from "../../components/modals/StatsModal";
import { Navbar } from "../../components/navbar/Navbar";
import { HiOutlineClock } from "react-icons/hi2";
import {
  LIMIT_TIME_MS,
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  WELCOME_INFO_MODAL_MS,
} from "../../globals/constants/settings";
import {
  CORRECT_WORD_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WIN_MESSAGES,
  WORD_NOT_FOUND_MESSAGE,
} from "../../globals/constants/strings";
import { useAlert } from "../../context/AlertContext";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from "../../utils/localStorage";
import { addStatsForCompletedGame, loadStats } from "../../utils/stats";
import {
  getIsLatestGame,
  isWinningWord,
  isWordInWordList,
  solution,
  startedTime,
  unicodeLength,
} from "../../utils/words";
import { localStorageFns } from "@/utils/localStorageFns";
import { formattedTime } from "@/utils/dateutils";

export const Home = () => {
  const isLatestGame = getIsLatestGame();
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert();
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [currentRowClass, setCurrentRowClass] = useState("");
  const [isGameLost, setIsGameLost] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorageFns.get("theme")
      ? localStorageFns.get("theme") === "dark"
      : !!prefersDarkMode
  );
  const [isRevealing, setIsRevealing] = useState(false);
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage(isLatestGame);
    if (loaded?.solution !== solution) {
      return [];
    }
    const gameWasWon = loaded.guesses.includes(solution);
    if (gameWasWon) {
      setIsGameWon(true);
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true);
      showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
        persist: true,
      });
    }
    return loaded.guesses;
  });

  const [stats, setStats] = useState(() => loadStats());

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorageFns.set("theme", isDark ? "dark" : "light");
  };

  const clearCurrentRowClass = () => {
    setCurrentRowClass("");
  };

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= solution.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join("")
    );
  };

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return;
    }

    if (unicodeLength(currentGuess) !== solution.length) {
      setCurrentRowClass("jiggle");
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      });
    }

    if (!isWordInWordList(currentGuess)) {
      setCurrentRowClass("jiggle");
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        onClose: clearCurrentRowClass,
      });
    }

    setIsRevealing(true);
    setTimeout(() => {
      setIsRevealing(false);
    }, REVEAL_TIME_MS * solution.length);

    const winningWord = isWinningWord(currentGuess);

    if (
      unicodeLength(currentGuess) === solution.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (winningWord) {
        if (isLatestGame) {
          setStats(addStatsForCompletedGame(stats, guesses.length));
        }
        return setIsGameWon(true);
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        if (isLatestGame) {
          setStats(addStatsForCompletedGame(stats, guesses.length + 1));
        }
        setIsGameLost(true);
        showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
          delayMs: REVEAL_TIME_MS * solution.length + 1,
        });
      }
    }
  };

  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setPrefersDarkMode(darkModeQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersDarkMode(e.matches);
    };
    darkModeQuery.addEventListener("change", handleChange);

    return () => {
      darkModeQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!loadGameStateFromLocalStorage(true)) {
      setTimeout(() => {
        setIsInfoModalOpen(true);
      }, WELCOME_INFO_MODAL_MS);
    }
  });

  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
    }, LIMIT_TIME_MS);
  });

  useEffect(() => {
    saveGameStateToLocalStorage(getIsLatestGame(), { guesses, solution });
  }, [guesses]);

  useEffect(() => {
    if (isGameWon) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)];
      const delayMs = REVEAL_TIME_MS * solution.length;

      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      });
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true);
      }, (solution.length + 1) * REVEAL_TIME_MS);
    }
  }, [isGameWon, isGameLost, showSuccessAlert]);

  return (
    <div className="flex w-full h-screen flex-col justify-center items-center">
      <Navbar
        enabled={isDarkMode}
        onToggle={handleDarkMode}
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
      />

      {!isStatsModalOpen && (
        <div className="flex items-center justify-center">
          <HiOutlineClock className="h-6 w-6 stroke-gray-600 dark:stroke-gray-300" />
          <p className="text-base text-gray-600 dark:text-gray-300">
            {
              <Countdown
                className="text-base text-gray-600 dark:text-gray-300"
                date={startedTime + LIMIT_TIME_MS}
                renderer={({ days, hours, minutes, seconds }) =>
                  formattedTime({ days, hours, minutes, seconds })
                }
                daysInHours={true}
              />
            }
          </p>
        </div>
      )}

      <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
        <div className="flex grow flex-col justify-center pb-6 short:pb-2">
          <Grid
            solution={solution}
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            currentRowClassName={currentRowClass}
          />
        </div>
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          solution={solution}
          guesses={guesses}
          isRevealing={isRevealing}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          solution={solution}
          guesses={guesses}
          gameStats={stats}
          isLatestGame={isLatestGame}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          isDarkMode={isDarkMode}
          numberOfGuessesMade={guesses.length}
        />
        <AlertContainer />
      </div>
    </div>
  );
};
