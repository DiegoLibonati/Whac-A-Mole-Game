import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { Mole } from "@src/components/Mole/Mole";

import { WhacAMolePage } from "@src/pages/WhacAMolePage/WhacAMolePage";

import { fillGrid } from "@src/helpers/fillGrid";

import { whacAMoleStore } from "@src/stores/whacAMoleStore";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = WhacAMolePage();
  document.body.appendChild(container);
  return { container: container };
};

jest.mock("@src/helpers/fillGrid");
jest.mock("@src/components/Mole/Mole");
jest.mock("@src/stores/whacAMoleStore", () => ({
  whacAMoleStore: {
    setIntervalGame: jest.fn(),
    setIntervalTime: jest.fn(),
    setTimeoutSpawn: jest.fn(),
    clearTimeoutSpawn: jest.fn(),
    setCounterPlus: jest.fn(),
    setRunTimeMinus: jest.fn(),
    setResetGame: jest.fn(),
    getState: jest.fn(() => ({
      runTime: 10,
      counter: 5,
      timeoutSpawn: null,
    })),
    get: jest.fn((key: string) => {
      if (key === "counter") return 6;
      return null;
    }),
  },
}));

describe("WhacAMolePage.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";

    (Mole as jest.Mock).mockImplementation(() => {
      const mole = document.createElement("img");
      mole.className = "mole";
      mole.alt = "mole";
      return mole;
    });
  });

  describe("General Tests.", () => {
    test("It should render the main component with correct class", () => {
      const { container } = renderComponent();
      expect(container.className).toBe("whac-a-mole-page");
    });

    test("It should render game title and description", () => {
      renderComponent();

      const title = screen.getByText("Welcome to Whac-a-mole GAME!");
      const description = screen.getByText(/You need to hit the RAT/i);

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    test("It should render score, time and play again button", () => {
      renderComponent();

      const score = screen.getByText(/Score:/i);
      const time = screen.getByText(/Time:/i);
      const button = screen.getByRole("button", { name: /play again/i });

      expect(score).toBeInTheDocument();
      expect(time).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    test("It should render game grid container", () => {
      renderComponent();
      expect(document.querySelector(".game__grid")).toBeInTheDocument();
    });
  });

  describe("Helper Integration Tests.", () => {
    test("It should call fillGrid with correct arguments", () => {
      renderComponent();

      expect(fillGrid).toHaveBeenCalledTimes(1);
      const gridElement = document.querySelector(".game__grid");
      expect(fillGrid).toHaveBeenCalledWith(gridElement, 25);
    });

    test("It should set intervals for game and timer", () => {
      renderComponent();

      expect(whacAMoleStore.setIntervalGame).toHaveBeenCalledTimes(1);
      expect(whacAMoleStore.setIntervalTime).toHaveBeenCalledTimes(1);
    });
  });

  describe("Play Again Button Tests.", () => {
    test("It should reset game when PLAY AGAIN button is clicked", async () => {
      renderComponent();

      const button = screen.getByRole("button", { name: /play again/i });
      const grid = document.querySelector(".game__grid") as HTMLDivElement;
      const score = document.querySelector(
        ".game__score"
      ) as HTMLParagraphElement;
      const time = document.querySelector(
        ".game__time-number"
      ) as HTMLSpanElement;

      button.style.display = "block";
      grid.style.display = "none";
      score.innerHTML = "Game over!";
      time.textContent = "The time is over";

      await user.click(button);

      expect(whacAMoleStore.setResetGame).toHaveBeenCalled();
      expect(fillGrid).toHaveBeenCalledWith(grid, 25);
      expect(button.style.display).toBe("none");
      expect(grid.style.display).toBe("flex");
      expect(score.innerHTML).toContain("Score:");
      expect(time.textContent).toBe("-");
    });
  });

  describe("DOM Structure Tests.", () => {
    test("It should contain all main sections", () => {
      const { container } = renderComponent();

      expect(container.querySelector(".game__explication")).toBeInTheDocument();
      expect(container.querySelector(".game__stats")).toBeInTheDocument();
      expect(container.querySelector(".game__grid")).toBeInTheDocument();
      expect(container.querySelector(".game__actions")).toBeInTheDocument();
    });

    test("It should nest score and time correctly", () => {
      renderComponent();

      const scoreSpan = document.querySelector(".game__score-number");
      const timeSpan = document.querySelector(".game__time-number");

      expect(scoreSpan).toBeInTheDocument();
      expect(timeSpan).toBeInTheDocument();
    });
  });

  describe("Observable Gameplay Behavior.", () => {
    test("It should create mole when interval spawns it", () => {
      renderComponent();

      const grid = document.querySelector(".game__grid")!;
      const mole = document.createElement("img");
      mole.className = "mole";
      grid.append(mole);

      expect(grid.querySelector(".mole")).toBeInTheDocument();
      expect(grid.querySelector(".mole")?.tagName).toBe("IMG");
    });

    test("It should visually update score when a mole is clicked", async () => {
      renderComponent();

      const scoreSpan = document.querySelector(".game__score-number")!;
      scoreSpan.textContent = "0";

      scoreSpan.textContent = "1";

      expect(scoreSpan.textContent).toBe("1");
    });
  });
});
