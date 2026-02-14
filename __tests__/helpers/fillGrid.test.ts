import { fillGrid } from "@/helpers/fillGrid";

describe("fillGrid", () => {
  let grid: HTMLDivElement;

  beforeEach(() => {
    grid = document.createElement("div");
    document.body.appendChild(grid);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should fill grid with specified quantity of items", () => {
    fillGrid(grid, 5);

    const items = grid.querySelectorAll<HTMLDivElement>(".grid-item");
    expect(items).toHaveLength(5);
  });

  it("should create grid items with sequential ids", () => {
    fillGrid(grid, 3);

    const item0 = grid.querySelector<HTMLDivElement>("#gi-0");
    const item1 = grid.querySelector<HTMLDivElement>("#gi-1");
    const item2 = grid.querySelector<HTMLDivElement>("#gi-2");

    expect(item0).toBeInTheDocument();
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it("should clear existing children before filling", () => {
    fillGrid(grid, 3);
    expect(grid.children).toHaveLength(3);

    fillGrid(grid, 5);
    expect(grid.children).toHaveLength(5);
  });

  it("should create empty grid when quantity is 0", () => {
    fillGrid(grid, 0);

    expect(grid.children).toHaveLength(0);
  });
});
