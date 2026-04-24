import type { GridItemProps } from "@/types/props";
import type { GridItemComponent } from "@/types/components";

import GridItem from "@/components/GridItem/GridItem";

const defaultProps: GridItemProps = {
  id: "gi-0",
};

const renderComponent = (
  props: Partial<GridItemProps> = {}
): GridItemComponent => {
  const element = GridItem({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("GridItem", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a div element with the given id", () => {
      renderComponent();
      expect(
        document.querySelector<HTMLDivElement>("#gi-0")
      ).toBeInTheDocument();
    });

    it("should have class grid-item", () => {
      renderComponent();
      expect(document.querySelector<HTMLDivElement>("#gi-0")).toHaveClass(
        "grid-item"
      );
    });

    it("should set the id from props", () => {
      renderComponent({ id: "gi-5" });
      expect(
        document.querySelector<HTMLDivElement>("#gi-5")
      ).toBeInTheDocument();
    });

    it("should not render an element with a different id than provided", () => {
      renderComponent({ id: "gi-3" });
      expect(
        document.querySelector<HTMLDivElement>("#gi-0")
      ).not.toBeInTheDocument();
      expect(
        document.querySelector<HTMLDivElement>("#gi-3")
      ).toBeInTheDocument();
    });

    it("should return the rendered div element", () => {
      const element = renderComponent({ id: "gi-10" });
      expect(element).toBe(document.querySelector<HTMLDivElement>("#gi-10"));
    });
  });
});
