import type { GridItemComponent } from "@/types/components";
import type { GridItemProps } from "@/types/props";

import { GridItem } from "@/components/GridItem/GridItem";

const renderComponent = (props: GridItemProps): GridItemComponent => {
  const { id } = props;
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
      const container = renderComponent({ id: "item-1" });

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.tagName).toBe("DIV");
    });

    it("should have correct CSS class", () => {
      const container = renderComponent({ id: "item-1" });

      expect(container).toHaveClass("grid-item");
    });

    it("should set correct id", () => {
      const container = renderComponent({ id: "item-1" });

      expect(container.id).toBe("item-1");
      expect(container).toHaveAttribute("id", "item-1");
    });
  });

  describe("Props", () => {
    it("should handle different id values", () => {
      const ids = ["item-1", "item-2", "item-3", "grid-cell-5"];

      ids.forEach((id) => {
        document.body.innerHTML = "";
        const container = renderComponent({ id: id });

        expect(container.id).toBe(id);
      });
    });

    it("should handle numeric-like id strings", () => {
      const container = renderComponent({ id: "123" });

      expect(container.id).toBe("123");
    });

    it("should handle hyphenated ids", () => {
      const container = renderComponent({ id: "grid-item-1-a" });

      expect(container.id).toBe("grid-item-1-a");
    });

    it("should handle camelCase ids", () => {
      const container = renderComponent({ id: "gridItem1" });

      expect(container.id).toBe("gridItem1");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty string id", () => {
      const container = renderComponent({ id: "" });

      expect(container.id).toBe("");
    });

    it("should handle id with spaces", () => {
      const container = renderComponent({ id: "item 1" });

      expect(container.id).toBe("item 1");
    });

    it("should handle id with special characters", () => {
      const container = renderComponent({ id: "item_1@test" });

      expect(container.id).toBe("item_1@test");
    });

    it("should handle very long id", () => {
      const longId = "grid-item-" + "a".repeat(100);
      const container = renderComponent({ id: longId });

      expect(container.id).toBe(longId);
    });
  });

  describe("Multiple GridItems", () => {
    it("should render multiple grid items independently", () => {
      renderComponent({ id: "item-1" });
      renderComponent({ id: "item-2" });
      renderComponent({ id: "item-3" });

      const item1 = document.querySelector<GridItemComponent>("#item-1");
      const item2 = document.querySelector<GridItemComponent>("#item-2");
      const item3 = document.querySelector<GridItemComponent>("#item-3");

      expect(item1).toBeInTheDocument();
      expect(item2).toBeInTheDocument();
      expect(item3).toBeInTheDocument();
    });

    it("should have unique ids for each grid item", () => {
      const item1 = renderComponent({ id: "item-1" });
      const item2 = renderComponent({ id: "item-2" });

      expect(item1.id).not.toBe(item2.id);
      expect(item1.id).toBe("item-1");
      expect(item2.id).toBe("item-2");
    });

    it("should all have the same CSS class", () => {
      renderComponent({ id: "item-1" });
      renderComponent({ id: "item-2" });
      renderComponent({ id: "item-3" });

      const gridItems =
        document.querySelectorAll<GridItemComponent>(".grid-item");

      expect(gridItems).toHaveLength(3);
      gridItems.forEach((item) => {
        expect(item).toHaveClass("grid-item");
      });
    });
  });

  describe("DOM Structure", () => {
    it("should be a standalone element", () => {
      const container = renderComponent({ id: "item-1" });

      expect(container.children).toHaveLength(0);
    });

    it("should have no text content", () => {
      const container = renderComponent({ id: "item-1" });

      expect(container).toHaveTextContent("");
    });

    it("should have no inner HTML", () => {
      const container = renderComponent({ id: "item-1" });

      expect(container.innerHTML).toBe("");
    });
  });

  describe("Accessibility", () => {
    it("should be queryable by id", () => {
      renderComponent({ id: "test-item" });

      const element = document.querySelector<GridItemComponent>("#test-item");

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass("grid-item");
    });

    it("should be queryable by class", () => {
      renderComponent({ id: "item-1" });

      const element = document.querySelector<GridItemComponent>(".grid-item");

      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("id", "item-1");
    });
  });

  describe("Return Type", () => {
    it("should return GridItemComponent type", () => {
      const container = renderComponent({ id: "item-1" });

      expect(container).toBeDefined();
      expect(container).toBeInstanceOf(HTMLDivElement);
    });

    it("should be appendable to DOM", () => {
      const container = GridItem({ id: "item-1" });

      expect(() => {
        document.body.appendChild(container);
      }).not.toThrow();

      expect(
        document.querySelector<GridItemComponent>("#item-1")
      ).toBeInTheDocument();
    });
  });
});
