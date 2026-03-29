import type { MoleComponent } from "@/types/components";

import assets from "@/assets/export";

import "@/components/Mole/Mole.css";

const Mole = (): MoleComponent => {
  const mole = document.createElement("img");

  mole.src = assets.images.RatPng;
  mole.alt = "Rat - click to whack";
  mole.className = "mole";

  return mole;
};

export default Mole;
