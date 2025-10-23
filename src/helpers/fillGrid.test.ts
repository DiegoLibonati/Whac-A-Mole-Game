import { fillGrid } from "@src/helpers/fillGrid";

describe("fillGrid.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = "<div class='game__grid'></div>";
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render a grid with the quantity of 25 items.", () => {
      const grid = document.querySelector<HTMLDivElement>(".game__grid");

      fillGrid(grid!, 25);

      expect(grid).toBeInTheDocument();
      expect(grid!.children).toHaveLength(25);
    });
  });
});
