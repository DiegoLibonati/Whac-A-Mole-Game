import { GridItem } from "@/components/GridItem/GridItem";

export const fillGrid = (grid: HTMLDivElement, quantity: number): void => {
  if (grid.children.length > 0) grid.replaceChildren();

  for (let i = 0; i < quantity; i++) {
    const gridItem = GridItem({ id: `gi-${i}` });
    grid.append(gridItem);
  }
};
