export const GAME_TITLE = "WORDLE";

export const WIN_MESSAGES: string[] = [
  "¡Gran Trabajo!",
  "Increíble",
  "¡Bien Hecho!",
];
export const NOT_ENOUGH_LETTERS_MESSAGE: string = "No hay suficientes letras";
export const WORD_NOT_FOUND_MESSAGE: string = "Palabra no encontrada";
export const HARD_MODE_ALERT_MESSAGE: string =
  "El Modo Difícil solo se puede habilitar al principio.";
export const HARD_MODE_DESCRIPTION: string =
  "Cualquier pista revelada debe ser utilizada en intentos subsiguientes";
export const HIGH_CONTRAST_MODE_DESCRIPTION: string =
  "Para mejorar la visión de colores";
export const CORRECT_WORD_MESSAGE: (solution: string) => string = (solution) =>
  `La palabra era ${solution}`;
export const WRONG_SPOT_MESSAGE: (guess: string, position: number) => string = (
  guess,
  position
) => `Debes usar ${guess} en la posición ${position}`;
export const NOT_CONTAINED_MESSAGE: (letter: string) => string = (letter) =>
  `La suposición debe contener ${letter}`;
export const ENTER_TEXT: string = "ENTER";
export const STATISTICS_TITLE: string = "Estadísticas";
export const GUESS_DISTRIBUTION_TEXT: string = "Distribución de Suposiciones";
export const NEW_WORD_TEXT: string = "Siguiente palabra en";
export const SHARE_TEXT: string = "Compartir";
export const TOTAL_TRIES_TEXT: string = "Jugadas";
export const SUCCESS_RATE_TEXT: string = "Tasa de éxito";
export const CURRENT_STREAK_TEXT: string = "Victorias";
export const BEST_STREAK_TEXT: string = "Mejor racha";

export const ACCEPT_TEXT: string = "Aceptar";
