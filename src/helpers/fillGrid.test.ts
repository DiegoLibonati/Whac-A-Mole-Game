import { fillGrid } from "./fillGrid";

import { OFFICIAL_BODY } from "../tests/jest.setup";

beforeEach(() => {
  document.body.innerHTML = OFFICIAL_BODY;
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render a grid with the quantity of 25 items.", () => {
  const grid = document.querySelector(".grid") as HTMLDivElement;

  fillGrid(grid, 25);

  expect(grid).toBeInTheDocument();
  expect(grid.children).toHaveLength(25);
});
