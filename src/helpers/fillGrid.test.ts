import { fillGrid } from "./fillGrid";

const INITIAL_HTML: string = `
    <main>
        <div class="grid"></div>
    </main>
`;

beforeEach(() => {
  const body = INITIAL_HTML;

  document.body.innerHTML = body;
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
