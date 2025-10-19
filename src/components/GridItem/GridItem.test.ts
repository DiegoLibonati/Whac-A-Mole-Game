import { screen } from "@testing-library/dom";

import { GridItemProps } from "@src/entities/props";

import { GridItem } from "@src/components/GridItem/GridItem";

type RenderComponent = {
  container: HTMLDivElement;
  props: GridItemProps;
};

const renderComponent = (props: GridItemProps): RenderComponent => {
  const container = GridItem(props);
  document.body.appendChild(container);
  return { container: container, props: props };
};

describe("GridItem.ts", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the component as a div element", () => {
      const props: GridItemProps = { id: "item-1" };

      const { container } = renderComponent(props);

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.tagName).toBe("DIV");
      expect(container.classList.contains("grid-item")).toBe(true);
    });

    test("It should apply the correct id to the element", () => {
      const props: GridItemProps = { id: "unique-grid-item" };

      const { container } = renderComponent(props);

      expect(container.id).toBe("unique-grid-item");
    });
  });

  describe("DOM Structure Tests.", () => {
    test("It should append the element to the DOM correctly", () => {
      const props: GridItemProps = { id: "grid-1" };

      const { container } = renderComponent(props);
      const element = document.getElementById("grid-1");

      expect(element).toBeInTheDocument();
      expect(element).toBe(container);
    });

    test("It should have the correct class name 'grid-item'", () => {
      const props: GridItemProps = { id: "grid-2" };

      const { container } = renderComponent(props);

      expect(container.className).toBe("grid-item");
    });
  });

  describe("Props Handling Tests.", () => {
    test("It should handle different ids correctly", () => {
      const ids = ["grid-1", "grid-2", "grid-3"];

      ids.forEach((id) => {
        const { container } = renderComponent({ id });
        expect(container.id).toBe(id);
      });
    });

    test("It should generate unique elements per id", () => {
      const { container: first } = renderComponent({ id: "grid-a" });
      const { container: second } = renderComponent({ id: "grid-b" });

      expect(first.id).not.toBe(second.id);
      expect(document.getElementById("grid-a")).toBe(first);
      expect(document.getElementById("grid-b")).toBe(second);
    });
  });

  describe("Accessibility & Consistency Tests.", () => {
    test("It should be accessible by id selector", () => {
      const props: GridItemProps = { id: "grid-access" };
      renderComponent(props);

      const element =
        screen.getByRole("generic", { hidden: true }) ??
        document.getElementById("grid-access");
      expect(element).toBeInTheDocument();
    });

    test("It should contain no child elements by default", () => {
      const props: GridItemProps = { id: "grid-empty" };

      const { container } = renderComponent(props);

      expect(container.children.length).toBe(0);
    });
  });
});
