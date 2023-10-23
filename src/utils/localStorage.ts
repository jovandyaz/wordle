const gameStateKey = "gameState";
const archiveGameStateKey = "archiveGameState";
const highContrastKey = "highContrast";

export type StoredGameState = {
  guesses: string[];
  solution: string;
};

export const saveGameStateToLocalStorage = (
  isLatestGame: boolean,
  gameState: StoredGameState
) => {
  const key = isLatestGame ? gameStateKey : archiveGameStateKey;
  if (typeof window === "undefined") {
    return null;
  }
  localStorage.setItem(key, JSON.stringify(gameState));
};

export const loadGameStateFromLocalStorage = (isLatestGame: boolean) => {
  const key = isLatestGame ? gameStateKey : archiveGameStateKey;
  const state =
    typeof window !== "undefined" ? localStorage.getItem(key) : null;
  return state ? (JSON.parse(state) as StoredGameState) : null;
};

const gameStatKey = "gameStats";

export type GameStats = {
  winDistribution: number[];
  gamesFailed: number;
  currentStreak: number;
  bestStreak: number;
  totalGames: number;
  successRate: number;
};

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  if (typeof window === "undefined") {
    return null;
  }
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats));
};

export const loadStatsFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const stats = localStorage.getItem(gameStatKey);
  return stats ? (JSON.parse(stats) as GameStats) : null;
};

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (typeof window === "undefined") {
    return false;
  }
  if (isHighContrast) {
    localStorage.setItem(highContrastKey, "1");
  } else {
    localStorage.removeItem(highContrastKey);
  }
};

export const getStoredIsHighContrastMode = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const highContrast = localStorage.getItem(highContrastKey);
  return highContrast === "1";
};
