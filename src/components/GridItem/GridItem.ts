import { GridItemProps } from "@src/entities/props";

import "@src/components/GridItem/GridItem.css";

export const GridItem = ({ id }: GridItemProps) => {
  const divRoot = document.createElement("div");
  divRoot.className = "grid-item";
  divRoot.id = id;

  return divRoot;
};
