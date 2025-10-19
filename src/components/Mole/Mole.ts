import { MoleProps } from "@src/entities/props";

import assets from "@src/assets/export";

import "@src/components/Mole/Mole.css";

export const Mole = ({}: MoleProps): HTMLImageElement => {
  const mole = document.createElement("img");

  mole.src = assets.pngs.RatPng;
  mole.alt = "mole";
  mole.className = "mole";

  return mole;
};
