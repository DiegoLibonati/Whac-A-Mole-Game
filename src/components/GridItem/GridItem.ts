import type { GridItemProps } from "@/types/props";
import type { GridItemComponent } from "@/types/components";

import "@/components/GridItem/GridItem.css";

export const GridItem = ({ id }: GridItemProps): GridItemComponent => {
  const divRoot = document.createElement("div");
  divRoot.className = "grid-item";
  divRoot.id = id;

  return divRoot;
};
