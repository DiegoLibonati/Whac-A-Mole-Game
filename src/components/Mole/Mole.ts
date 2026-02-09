import type { MoleComponent } from "@/types/components";

import assets from "@/assets/export";

import "@/components/Mole/Mole.css";

export const Mole = (): MoleComponent => {
  const mole = document.createElement("img");

  mole.src = assets.images.RatPng;
  mole.alt = "mole";
  mole.className = "mole";

  return mole;
};
