import { screen } from "@testing-library/dom";

import { Mole } from "@src/components/Mole/Mole";

import assets from "@src/assets/export";

type RenderComponent = {
  container: HTMLImageElement;
};

const renderComponent = (): RenderComponent => {
  const container = Mole({});
  document.body.appendChild(container);
  return { container: container };
};

jest.mock("@src/assets/export", () => ({
  __esModule: true,
  default: {
    images: {
      RatPng: "mocked-rat.png",
    },
  },
}));

describe("Mole.ts", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the component as an img element", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLImageElement);
      expect(container.tagName).toBe("IMG");
    });

    test("It should have correct default class", () => {
      const { container } = renderComponent();

      expect(container.classList.contains("mole")).toBe(true);
      expect(container.className).toBe("mole");
    });

    test("It should append the image to the DOM", () => {
      const { container } = renderComponent();

      const img = document.querySelector<HTMLImageElement>(".mole");
      expect(img).toBeInTheDocument();
      expect(img).toBe(container);
    });
  });

  describe("Image Attribute Tests.", () => {
    test("It should have correct src attribute from assets", () => {
      const { container } = renderComponent();

      expect(container.getAttribute("src")).toBe(assets.images.RatPng);
    });

    test("It should have correct alt attribute", () => {
      const { container } = renderComponent();

      expect(container.alt).toBe("mole");
    });

    test("It should contain valid attributes in total", () => {
      const { container } = renderComponent();

      expect(container.hasAttribute("src")).toBe(true);
      expect(container.hasAttribute("alt")).toBe(true);
      expect(container.hasAttribute("class")).toBe(true);
    });
  });

  describe("DOM Structure Tests.", () => {
    test("It should be a standalone element (no children)", () => {
      const { container } = renderComponent();

      expect(container.children.length).toBe(0);
    });

    test("It should be accessible via its alt text", () => {
      renderComponent();

      const img = screen.getByAltText("mole");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", assets.images.RatPng);
    });
  });

  describe("Consistency Tests.", () => {
    test("It should always use the same image source for every render", () => {
      const first = renderComponent().container;
      const second = renderComponent().container;

      expect(first.src).toBe(second.src);
      expect(first.alt).toBe(second.alt);
    });

    test("It should create a unique instance per render", () => {
      const first = renderComponent().container;
      const second = renderComponent().container;

      expect(first).not.toBe(second);
      expect(document.querySelectorAll<HTMLImageElement>(".mole").length).toBe(
        2
      );
    });
  });
});
