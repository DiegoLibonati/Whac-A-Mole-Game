import { fillGrid } from "@/helpers/fillGrid";

describe("fillGrid", () => {
  let gridContainer: HTMLDivElement;

  beforeEach(() => {
    gridContainer = document.createElement("div");
    gridContainer.className = "game__grid";
    document.body.appendChild(gridContainer);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Basic Functionality", () => {
    it("should fill grid with specified quantity of items", () => {
      fillGrid(gridContainer, 10);

      expect(gridContainer.children).toHaveLength(10);
    });

    it("should create grid items with correct ids", () => {
      fillGrid(gridContainer, 5);

      for (let i = 0; i < 5; i++) {
        const gridItem = gridContainer.querySelector(`#gi-${i}`);
        expect(gridItem).toBeInTheDocument();
        expect(gridItem?.id).toBe(`gi-${i}`);
      }
    });

    it("should create grid items with correct class", () => {
      fillGrid(gridContainer, 3);

      const gridItems = gridContainer.querySelectorAll(".grid-item");

      expect(gridItems).toHaveLength(3);
      gridItems.forEach((item) => {
        expect(item).toHaveClass("grid-item");
      });
    });

    it("should append items to the grid container", () => {
      fillGrid(gridContainer, 5);

      const firstItem = gridContainer.children[0];
      const lastItem = gridContainer.children[4];

      expect(firstItem?.parentElement).toBe(gridContainer);
      expect(lastItem?.parentElement).toBe(gridContainer);
    });
  });

  describe("Different Quantities", () => {
    it("should handle single item", () => {
      fillGrid(gridContainer, 1);

      expect(gridContainer.children).toHaveLength(1);
      expect(gridContainer.querySelector("#gi-0")).toBeInTheDocument();
    });

    it("should handle zero items", () => {
      fillGrid(gridContainer, 0);

      expect(gridContainer.children).toHaveLength(0);
      expect(gridContainer.innerHTML).toBe("");
    });

    it("should handle large quantity", () => {
      fillGrid(gridContainer, 100);

      expect(gridContainer.children).toHaveLength(100);
      expect(gridContainer.querySelector("#gi-0")).toBeInTheDocument();
      expect(gridContainer.querySelector("#gi-99")).toBeInTheDocument();
    });

    it("should create 25 items for standard game grid", () => {
      fillGrid(gridContainer, 25);

      expect(gridContainer.children).toHaveLength(25);

      for (let i = 0; i < 25; i++) {
        expect(gridContainer.querySelector(`#gi-${i}`)).toBeInTheDocument();
      }
    });
  });

  describe("Replace Children Functionality", () => {
    it("should clear existing children before filling", () => {
      const initialDiv1 = document.createElement("div");
      const initialDiv2 = document.createElement("div");
      gridContainer.appendChild(initialDiv1);
      gridContainer.appendChild(initialDiv2);

      expect(gridContainer.children).toHaveLength(2);

      fillGrid(gridContainer, 5);

      expect(gridContainer.children).toHaveLength(5);
      expect(gridContainer.contains(initialDiv1)).toBe(false);
      expect(gridContainer.contains(initialDiv2)).toBe(false);
    });

    it("should replace old grid items with new ones", () => {
      fillGrid(gridContainer, 3);

      const firstItem = gridContainer.querySelector("#gi-0");
      const secondItem = gridContainer.querySelector("#gi-1");

      fillGrid(gridContainer, 3);

      const newFirstItem = gridContainer.querySelector("#gi-0");
      const newSecondItem = gridContainer.querySelector("#gi-1");

      expect(newFirstItem).toBeInTheDocument();
      expect(newSecondItem).toBeInTheDocument();
      expect(newFirstItem).not.toBe(firstItem);
      expect(newSecondItem).not.toBe(secondItem);
    });

    it("should only call replaceChildren if grid has existing children", () => {
      const replaceChildrenSpy = jest.spyOn(gridContainer, "replaceChildren");

      fillGrid(gridContainer, 5);

      expect(replaceChildrenSpy).not.toHaveBeenCalled();

      fillGrid(gridContainer, 3);

      expect(replaceChildrenSpy).toHaveBeenCalledTimes(1);
    });

    it("should handle refilling with different quantity", () => {
      fillGrid(gridContainer, 10);
      expect(gridContainer.children).toHaveLength(10);

      fillGrid(gridContainer, 5);
      expect(gridContainer.children).toHaveLength(5);

      fillGrid(gridContainer, 20);
      expect(gridContainer.children).toHaveLength(20);
    });
  });

  describe("Grid Item Properties", () => {
    it("should create div elements", () => {
      fillGrid(gridContainer, 5);

      const gridItems = gridContainer.querySelectorAll(".grid-item");

      gridItems.forEach((item) => {
        expect(item.tagName).toBe("DIV");
        expect(item).toBeInstanceOf(HTMLDivElement);
      });
    });

    it("should have sequential ids starting from 0", () => {
      fillGrid(gridContainer, 10);

      for (let i = 0; i < 10; i++) {
        const item = gridContainer.children[i];
        expect(item?.id).toBe(`gi-${i}`);
      }
    });

    it("should create empty grid items", () => {
      fillGrid(gridContainer, 5);

      const gridItems = gridContainer.querySelectorAll(".grid-item");

      gridItems.forEach((item) => {
        expect(item.children).toHaveLength(0);
        expect(item.innerHTML).toBe("");
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle negative quantity gracefully", () => {
      fillGrid(gridContainer, -5);

      expect(gridContainer.children).toHaveLength(0);
    });

    it("should handle very large numbers", () => {
      fillGrid(gridContainer, 1000);

      expect(gridContainer.children).toHaveLength(1000);
      expect(gridContainer.querySelector("#gi-0")).toBeInTheDocument();
      expect(gridContainer.querySelector("#gi-999")).toBeInTheDocument();
    });

    it("should work with grid that has inline styles", () => {
      gridContainer.style.display = "grid";
      gridContainer.style.gridTemplateColumns = "repeat(5, 1fr)";

      fillGrid(gridContainer, 25);

      expect(gridContainer.children).toHaveLength(25);
      expect(gridContainer.style.display).toBe("grid");
    });

    it("should work with grid that has data attributes", () => {
      gridContainer.setAttribute("data-game", "whac-a-mole");

      fillGrid(gridContainer, 5);

      expect(gridContainer.children).toHaveLength(5);
      expect(gridContainer.getAttribute("data-game")).toBe("whac-a-mole");
    });
  });

  describe("Multiple Calls", () => {
    it("should handle multiple sequential fills", () => {
      fillGrid(gridContainer, 5);
      expect(gridContainer.children).toHaveLength(5);

      fillGrid(gridContainer, 10);
      expect(gridContainer.children).toHaveLength(10);

      fillGrid(gridContainer, 3);
      expect(gridContainer.children).toHaveLength(3);
    });

    it("should reset ids on each fill", () => {
      fillGrid(gridContainer, 3);
      expect(gridContainer.querySelector("#gi-0")).toBeInTheDocument();
      expect(gridContainer.querySelector("#gi-2")).toBeInTheDocument();

      fillGrid(gridContainer, 5);
      expect(gridContainer.querySelector("#gi-0")).toBeInTheDocument();
      expect(gridContainer.querySelector("#gi-4")).toBeInTheDocument();
    });

    it("should maintain grid container reference", () => {
      const originalContainer = gridContainer;

      fillGrid(gridContainer, 5);
      fillGrid(gridContainer, 10);
      fillGrid(gridContainer, 3);

      expect(gridContainer).toBe(originalContainer);
      expect(gridContainer.children).toHaveLength(3);
    });
  });

  describe("Integration", () => {
    it("should create grid items that can be queried individually", () => {
      fillGrid(gridContainer, 25);

      const item0 = document.getElementById("gi-0");
      const item12 = document.getElementById("gi-12");
      const item24 = document.getElementById("gi-24");

      expect(item0).toBeInTheDocument();
      expect(item12).toBeInTheDocument();
      expect(item24).toBeInTheDocument();
    });

    it("should allow adding content to grid items after creation", () => {
      fillGrid(gridContainer, 5);

      const firstItem = gridContainer.querySelector("#gi-0");
      const img = document.createElement("img");
      img.src = "test.png";

      firstItem?.appendChild(img);

      expect(firstItem?.children).toHaveLength(1);
      expect(firstItem?.querySelector("img")).toBeInTheDocument();
    });

    it("should work with querySelector selectors", () => {
      fillGrid(gridContainer, 10);

      const allItems = gridContainer.querySelectorAll(".grid-item");
      const firstItem = gridContainer.querySelector("#gi-0");
      const lastItem = gridContainer.querySelector("#gi-9");

      expect(allItems).toHaveLength(10);
      expect(firstItem).toBeInTheDocument();
      expect(lastItem).toBeInTheDocument();
    });
  });
});
