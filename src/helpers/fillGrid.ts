export const fillGrid = (grid: HTMLDivElement, quantity: number): void => {
  if (grid.children.length > 0) grid.innerHTML = "";

  for (let i = 0; i < quantity; i++) {
    const gridItem = document.createElement("div");
    gridItem.setAttribute("id", String(i));
    gridItem.setAttribute("class", "game__grid-ceil");
    grid.append(gridItem);
  }
};
