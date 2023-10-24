import { default as GraphemeSplitter } from "grapheme-splitter";
import queryString from "query-string";

import {
  NOT_CONTAINED_MESSAGE,
  WRONG_SPOT_MESSAGE,
} from "../globals/constants/strings";
import { WORDS } from "../globals/constants/es";
import { getGuessStatuses } from "./statuses";

export const isWordInWordList = (word: string) => {
  return WORDS.includes(word.toLowerCase());
};

export const isWinningWord = (word: string) => {
  return solution === word;
};

export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false;
  }

  const lettersLeftArray = new Array<string>();
  const guess = guesses[guesses.length - 1];
  const statuses = getGuessStatuses(solution, guess);
  const splitWord = unicodeSplit(word);
  const splitGuess = unicodeSplit(guess);

  for (let i = 0; i < splitGuess.length; i++) {
    if (statuses[i] === "correct" || statuses[i] === "present") {
      lettersLeftArray.push(splitGuess[i]);
    }
    if (statuses[i] === "correct" && splitWord[i] !== splitGuess[i]) {
      return WRONG_SPOT_MESSAGE(splitGuess[i], i + 1);
    }
  }

  let n;
  for (const letter of splitWord) {
    n = lettersLeftArray.indexOf(letter);
    if (n !== -1) {
      lettersLeftArray.splice(n, 1);
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0]);
  }
  return false;
};

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word);
};

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length;
};

export const getSolution = () => {
  const index = Math.floor(Math.random() * WORDS.length);
  return {
    solution: WORDS[index % WORDS.length].toUpperCase(),
    solutionIndex: index,
    startedTime: new Date().valueOf(),
  };
};

export const getIsLatestGame = () => {
  if (typeof window === "undefined") return false;
  const parsed = queryString.parse(window.location.search);
  return !parsed?.d;
};

export const { solution, solutionIndex, startedTime } = getSolution();
