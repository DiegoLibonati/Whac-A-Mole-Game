import { gridDisplay } from "../constants/elements";

export const createGrid = (): void => {
  for (let i = 0; i < 25; i++) {
    const grid = document.createElement("div");
    grid.setAttribute("id", String(i));
    gridDisplay.append(grid);
  }
};
