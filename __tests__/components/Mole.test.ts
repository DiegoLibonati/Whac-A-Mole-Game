import type { MoleComponent } from "@/types/components";

import { Mole } from "@/components/Mole/Mole";

const renderComponent = (): MoleComponent => {
  const container = Mole();
  document.body.appendChild(container);
  return container;
};

describe("Mole Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render mole image with correct attributes", () => {
    renderComponent();

    const mole = document.querySelector<HTMLImageElement>(".mole");
    expect(mole).toBeInTheDocument();
    expect(mole?.tagName).toBe("IMG");
    expect(mole).toHaveAttribute("src", "/images/rat.png");
    expect(mole).toHaveAttribute("alt", "mole");
  });
});
