import { score } from "../constants/elements";
import { moleState } from "../state";

export const scoreUpdate = (): void => {
  score.textContent = String(moleState.counter);
};
