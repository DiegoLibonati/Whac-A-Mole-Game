import { gridDisplay } from "../constants/elements";

export const spawnRandom = (): number => {
  const random = Math.floor(Math.random() * gridDisplay.children.length);
  return random;
};
