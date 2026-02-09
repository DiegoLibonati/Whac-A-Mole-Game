import type { GridItemComponent } from "@/types/components";

import { GridItem } from "@/components/GridItem/GridItem";

const renderComponent = (id: string): GridItemComponent => {
  const container = GridItem({ id });
  document.body.appendChild(container);
  return container;
};

describe("GridItem", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Render", () => {
    it("should create a div element", () => {
      const container = renderComponent("item-1");

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.tagName).toBe("DIV");
    });

    it("should have correct CSS class", () => {
      const container = renderComponent("item-1");

      expect(container).toHaveClass("grid-item");
    });

    it("should set correct id", () => {
      const container = renderComponent("item-1");

      expect(container.id).toBe("item-1");
      expect(container).toHaveAttribute("id", "item-1");
    });
  });

  describe("Props", () => {
    it("should handle different id values", () => {
      const ids = ["item-1", "item-2", "item-3", "grid-cell-5"];

      ids.forEach((id) => {
        document.body.innerHTML = "";
        const container = renderComponent(id);

        expect(container.id).toBe(id);
      });
    });

    it("should handle numeric-like id strings", () => {
      const container = renderComponent("123");

      expect(container.id).toBe("123");
    });

    it("should handle hyphenated ids", () => {
      const container = renderComponent("grid-item-1-a");

      expect(container.id).toBe("grid-item-1-a");
    });

    it("should handle camelCase ids", () => {
      const container = renderComponent("gridItem1");

      expect(container.id).toBe("gridItem1");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty string id", () => {
      const container = renderComponent("");

      expect(container.id).toBe("");
    });

    it("should handle id with spaces", () => {
      const container = renderComponent("item 1");

      expect(container.id).toBe("item 1");
    });

    it("should handle id with special characters", () => {
      const container = renderComponent("item_1@test");

      expect(container.id).toBe("item_1@test");
    });

    it("should handle very long id", () => {
      const longId = "grid-item-" + "a".repeat(100);
      const container = renderComponent(longId);

      expect(container.id).toBe(longId);
    });
  });

  describe("Multiple GridItems", () => {
    it("should render multiple grid items independently", () => {
      renderComponent("item-1");
      renderComponent("item-2");
      renderComponent("item-3");

      const item1 = document.getElementById("item-1");
      const item2 = document.getElementById("item-2");
      const item3 = document.getElementById("item-3");

      expect(item1).toBeInTheDocument();
      expect(item2).toBeInTheDocument();
      expect(item3).toBeInTheDocument();
    });

    it("should have unique ids for each grid item", () => {
      const item1 = renderComponent("item-1");
      const item2 = renderComponent("item-2");

      expect(item1.id).not.toBe(item2.id);
      expect(item1.id).toBe("item-1");
      expect(item2.id).toBe("item-2");
    });

    it("should all have the same CSS class", () => {
      renderComponent("item-1");
      renderComponent("item-2");
      renderComponent("item-3");

      const gridItems = document.querySelectorAll(".grid-item");

      expect(gridItems).toHaveLength(3);
      gridItems.forEach((item) => {
        expect(item).toHaveClass("grid-item");
      });
    });
  });

  describe("DOM Structure", () => {
    it("should be a standalone element", () => {
      const container = renderComponent("item-1");

      expect(container.children).toHaveLength(0);
    });

    it("should have no text content", () => {
      const container = renderComponent("item-1");

      expect(container).toHaveTextContent("");
    });

    it("should have no inner HTML", () => {
      const container = renderComponent("item-1");

      expect(container.innerHTML).toBe("");
    });
  });

  describe("Accessibility", () => {
    it("should be queryable by id", () => {
      renderComponent("test-item");

      const element = document.getElementById("test-item");

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass("grid-item");
    });

    it("should be queryable by class", () => {
      renderComponent("item-1");

      const element = document.querySelector(".grid-item");

      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("id", "item-1");
    });
  });

  describe("Return Type", () => {
    it("should return GridItemComponent type", () => {
      const container = renderComponent("item-1");

      expect(container).toBeDefined();
      expect(container).toBeInstanceOf(HTMLDivElement);
    });

    it("should be appendable to DOM", () => {
      const container = GridItem({ id: "item-1" });

      expect(() => {
        document.body.appendChild(container);
      }).not.toThrow();

      expect(document.getElementById("item-1")).toBeInTheDocument();
    });
  });
});
