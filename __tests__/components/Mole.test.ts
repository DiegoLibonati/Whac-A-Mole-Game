import { screen } from "@testing-library/dom";

import type { MoleComponent } from "@/types/components";

import { Mole } from "@/components/Mole/Mole";

import { mockAssets } from "@tests/__mocks__/assets.mock";

jest.doMock("@/assets/export", () => ({
  __esModule: true,
  default: mockAssets,
}));

const renderComponent = (): MoleComponent => {
  const container = Mole();
  document.body.appendChild(container);
  return container;
};

describe("Mole", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Render", () => {
    it("should create an img element", () => {
      const container = renderComponent();

      expect(container).toBeInstanceOf(HTMLImageElement);
      expect(container.tagName).toBe("IMG");
    });

    it("should have correct CSS class", () => {
      const container = renderComponent();

      expect(container).toHaveClass("mole");
    });

    it("should set correct image source", () => {
      const container = renderComponent();

      expect(container).toHaveAttribute(
        "src",
        expect.stringContaining("test-file-stub")
      );
    });

    it("should have correct alt text", () => {
      const container = renderComponent();

      expect(container).toHaveAttribute("alt", "mole");
    });

    it("should be accessible via role", () => {
      renderComponent();

      const img = screen.getByRole("img", { name: "mole" });

      expect(img).toBeInTheDocument();
    });
  });

  describe("Image Attributes", () => {
    it("should have src attribute", () => {
      const container = renderComponent();

      expect(container.hasAttribute("src")).toBe(true);
      expect(container.src).toBeTruthy();
    });

    it("should have alt attribute", () => {
      const container = renderComponent();

      expect(container.hasAttribute("alt")).toBe(true);
      expect(container.alt).toBe("mole");
    });

    it("should load image from assets", () => {
      const container = renderComponent();

      expect(container.src).toContain("test-file-stub");
    });
  });

  describe("Multiple Moles", () => {
    it("should render multiple moles independently", () => {
      renderComponent();
      renderComponent();
      renderComponent();

      const moles = screen.getAllByRole("img", { name: "mole" });

      expect(moles).toHaveLength(3);
    });

    it("should all have the same CSS class", () => {
      renderComponent();
      renderComponent();

      const moles = document.querySelectorAll(".mole");

      expect(moles).toHaveLength(2);
      moles.forEach((mole) => {
        expect(mole).toHaveClass("mole");
      });
    });

    it("should all have the same image source", () => {
      const mole1 = renderComponent();
      document.body.innerHTML = "";
      const mole2 = renderComponent();

      expect(mole1.src).toBe(mole2.src);
    });

    it("should all have the same alt text", () => {
      const mole1 = renderComponent();
      document.body.innerHTML = "";
      const mole2 = renderComponent();

      expect(mole1.alt).toBe(mole2.alt);
    });
  });

  describe("DOM Structure", () => {
    it("should be a standalone element", () => {
      const container = renderComponent();

      expect(container.children).toHaveLength(0);
    });

    it("should have no text content", () => {
      const container = renderComponent();

      expect(container).toHaveTextContent("");
    });
  });

  describe("Accessibility", () => {
    it("should be accessible by alt text", () => {
      renderComponent();

      const mole = screen.getByAltText("mole");

      expect(mole).toBeInTheDocument();
    });

    it("should be queryable by class", () => {
      renderComponent();

      const mole = document.querySelector(".mole");

      expect(mole).toBeInTheDocument();
      expect(mole?.tagName).toBe("IMG");
    });

    it("should have descriptive alt text for screen readers", () => {
      const container = renderComponent();

      expect(container.alt).not.toBe("");
      expect(container.alt).toBe("mole");
    });
  });

  describe("Return Type", () => {
    it("should return MoleComponent type", () => {
      const container = renderComponent();

      expect(container).toBeDefined();
      expect(container).toBeInstanceOf(HTMLImageElement);
    });

    it("should be appendable to DOM", () => {
      const container = Mole();

      expect(() => {
        document.body.appendChild(container);
      }).not.toThrow();

      expect(screen.getByRole("img", { name: "mole" })).toBeInTheDocument();
    });
  });

  describe("CSS Integration", () => {
    it("should have only mole class", () => {
      const container = renderComponent();

      expect(container.className).toBe("mole");
    });

    it("should not have additional classes", () => {
      const container = renderComponent();

      const classes = container.className.split(" ");

      expect(classes).toHaveLength(1);
      expect(classes[0]).toBe("mole");
    });
  });

  describe("Assets Integration", () => {
    it("should use RatPng from assets", () => {
      const container = renderComponent();

      expect(container.src).toBeDefined();
      expect(typeof container.src).toBe("string");
    });

    it("should handle asset loading", () => {
      const container = renderComponent();

      expect(container.src).toBeDefined();
      expect(typeof container.src).toBe("string");
    });
  });
});
