import { fillGrid } from "@/helpers/fillGrid";

const createGrid = (): HTMLDivElement => {
  const grid = document.createElement("div");
  document.body.appendChild(grid);
  return grid;
};

describe("fillGrid", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should append the given number of children to the container", () => {
      const grid = createGrid();
      fillGrid(grid, 5);
      expect(grid.children.length).toBe(5);
    });

    it("should create items with sequential IDs starting from gi-0", () => {
      const grid = createGrid();
      fillGrid(grid, 3);
      expect(grid.children[0]).toHaveAttribute("id", "gi-0");
      expect(grid.children[1]).toHaveAttribute("id", "gi-1");
      expect(grid.children[2]).toHaveAttribute("id", "gi-2");
    });

    it("should create items with class grid-item", () => {
      const grid = createGrid();
      fillGrid(grid, 2);
      expect(grid.children[0]).toHaveClass("grid-item");
      expect(grid.children[1]).toHaveClass("grid-item");
    });

    it("should create 25 items when called with 25", () => {
      const grid = createGrid();
      fillGrid(grid, 25);
      expect(grid.children.length).toBe(25);
    });
  });

  describe("replace children", () => {
    it("should replace existing children when container is not empty", () => {
      const grid = createGrid();
      fillGrid(grid, 10);
      fillGrid(grid, 3);
      expect(grid.children.length).toBe(3);
    });

    it("should reset IDs when replacing children", () => {
      const grid = createGrid();
      fillGrid(grid, 5);
      fillGrid(grid, 2);
      expect(grid.children[0]).toHaveAttribute("id", "gi-0");
      expect(grid.children[1]).toHaveAttribute("id", "gi-1");
    });
  });

  describe("edge cases", () => {
    it("should create no items when quantity is 0", () => {
      const grid = createGrid();
      fillGrid(grid, 0);
      expect(grid.children.length).toBe(0);
    });

    it("should create 1 item when quantity is 1", () => {
      const grid = createGrid();
      fillGrid(grid, 1);
      expect(grid.children.length).toBe(1);
      expect(grid.children[0]).toHaveAttribute("id", "gi-0");
    });
  });
});
