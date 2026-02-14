import type { GridItemProps } from "@/types/props";
import type { GridItemComponent } from "@/types/components";

import { GridItem } from "@/components/GridItem/GridItem";

const renderComponent = (props: GridItemProps): GridItemComponent => {
  const container = GridItem(props);
  document.body.appendChild(container);
  return container;
};

describe("GridItem Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render grid item with correct attributes", () => {
    renderComponent({ id: "gi-0" });

    const gridItem = document.querySelector<HTMLDivElement>("#gi-0");
    expect(gridItem).toBeInTheDocument();
    expect(gridItem?.tagName).toBe("DIV");
    expect(gridItem).toHaveClass("grid-item");
  });

  it("should render with different id", () => {
    renderComponent({ id: "gi-5" });

    const gridItem = document.querySelector<HTMLDivElement>("#gi-5");
    expect(gridItem).toBeInTheDocument();
    expect(gridItem).toHaveAttribute("id", "gi-5");
  });
});
