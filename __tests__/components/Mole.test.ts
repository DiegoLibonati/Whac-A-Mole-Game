import { screen } from "@testing-library/dom";

import type { MoleComponent } from "@/types/components";

import Mole from "@/components/Mole/Mole";

const renderComponent = (): MoleComponent => {
  const element = Mole();
  document.body.appendChild(element);
  return element;
};

describe("Mole", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should render an img element", () => {
      renderComponent();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("should have class mole", () => {
      renderComponent();
      expect(screen.getByRole("img")).toHaveClass("mole");
    });

    it("should have alt text Rat - click to whack", () => {
      renderComponent();
      expect(screen.getByAltText("Rat - click to whack")).toBeInTheDocument();
    });

    it("should have the correct src from assets", () => {
      renderComponent();
      expect(screen.getByRole("img")).toHaveAttribute("src", "test-file-stub");
    });

    it("should return the rendered img element", () => {
      const element = renderComponent();
      expect(element).toBe(screen.getByRole("img"));
    });
  });
});
