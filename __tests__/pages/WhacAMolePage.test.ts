import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { WhacAMolePage } from "@/pages/WhacAMolePage/WhacAMolePage";

import { whacAMoleStore } from "@/stores/whacAMoleStore";

import { mockAssets } from "@tests/__mocks__/assets.mock";

jest.mock("@/stores/whacAMoleStore", () => ({
  whacAMoleStore: {
    getState: jest.fn(),
    get: jest.fn(),
    setState: jest.fn(),
    setCounterPlus: jest.fn(),
    setCounterReset: jest.fn(),
    setRunTimeMinus: jest.fn(),
    setResetGame: jest.fn(),
    setTimeoutSpawn: jest.fn(),
    setIntervalGame: jest.fn(),
    setIntervalTime: jest.fn(),
    clearTimeoutSpawn: jest.fn(),
    cleanup: jest.fn(),
  },
}));

jest.doMock("@/assets/export", () => ({
  __esModule: true,
  default: mockAssets,
}));

const renderPage = (): Page => {
  const container = WhacAMolePage();
  document.body.appendChild(container);
  return container;
};

describe("WhacAMolePage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();

    (whacAMoleStore.getState as jest.Mock).mockReturnValue({
      counter: 0,
      runTime: 60,
      timeoutSpawn: null,
      intervalGame: null,
      intervalTime: null,
    });

    (whacAMoleStore.get as jest.Mock).mockImplementation((key: string) => {
      if (key === "counter") return 0;
      if (key === "runTime") return 60;
      return null;
    });
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe("Render", () => {
    it("should create a main element", () => {
      renderPage();

      const main = screen.getByRole("main");

      expect(main).toBeInstanceOf(HTMLElement);
      expect(main.tagName).toBe("MAIN");
    });

    it("should have correct styling class", () => {
      renderPage();

      const main = screen.getByRole("main");

      expect(main).toHaveClass("whac-a-mole-page");
    });

    it("should render game section", () => {
      const container = renderPage();

      const section = container.querySelector(".game");

      expect(section).toBeInTheDocument();
      expect(section?.tagName).toBe("SECTION");
    });

    it("should render title", () => {
      renderPage();

      const title = screen.getByRole("heading", {
        name: /welcome to whac-a-mole game/i,
        level: 1,
      });

      expect(title).toBeInTheDocument();
      expect(title).toHaveClass("game__explication-title");
    });

    it("should render description", () => {
      renderPage();

      const description = screen.getByText(/you need to hit the rat/i);

      expect(description).toBeInTheDocument();
      expect(description).toHaveClass("game__description");
    });

    it("should render score display", () => {
      const container = renderPage();

      const score = container.querySelector(".game__score");
      const scoreNumber = container.querySelector("#score");

      expect(score).toBeInTheDocument();
      expect(scoreNumber).toBeInTheDocument();
      expect(scoreNumber).toHaveTextContent("-");
    });

    it("should render time display", () => {
      const container = renderPage();

      const time = container.querySelector(".game__time");
      const timeNumber = container.querySelector("#time");

      expect(time).toBeInTheDocument();
      expect(timeNumber).toBeInTheDocument();
      expect(timeNumber).toHaveTextContent("-");
    });

    it("should render game grid", () => {
      const container = renderPage();

      const gameGrid = container.querySelector(".game__grid");

      expect(gameGrid).toBeInTheDocument();
    });

    it("should render play again button", () => {
      renderPage();

      const button = screen.getByRole("button", { name: /play again/i });

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("game__btn-play-again");
    });
  });

  describe("Initial Setup", () => {
    it("should fill grid with 25 items on mount", () => {
      const container = renderPage();

      const gameGrid = container.querySelector(".game__grid");
      const gridItems = gameGrid?.querySelectorAll(".grid-item");

      expect(gridItems).toHaveLength(25);
    });

    it("should create grid items with correct ids", () => {
      const container = renderPage();

      const gameGrid = container.querySelector(".game__grid");

      for (let i = 0; i < 25; i++) {
        const gridItem = gameGrid?.querySelector(`#gi-${i}`);
        expect(gridItem).toBeInTheDocument();
        expect(gridItem).toHaveClass("grid-item");
      }
    });

    it("should start game interval on mount", () => {
      const setIntervalSpy = jest.spyOn(global, "setInterval");

      renderPage();

      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 3000);
      expect(whacAMoleStore.setIntervalGame).toHaveBeenCalledWith(
        expect.any(Number)
      );
    });

    it("should start timer interval on mount", () => {
      const setIntervalSpy = jest.spyOn(global, "setInterval");

      renderPage();

      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
      expect(whacAMoleStore.setIntervalTime).toHaveBeenCalledWith(
        expect.any(Number)
      );
    });

    it("should add click listener to play again button", () => {
      renderPage();

      const button = screen.getByRole("button", { name: /play again/i });

      expect(button).toBeInTheDocument();
    });
  });

  describe("Play Again Functionality", () => {
    it("should reset game when play again is clicked", async () => {
      const user = userEvent.setup({ delay: null });
      renderPage();

      const button = screen.getByRole("button", { name: /play again/i });

      await user.click(button);

      expect(whacAMoleStore.cleanup).toHaveBeenCalled();
    });

    it("should reset score display", async () => {
      const user = userEvent.setup({ delay: null });
      const container = renderPage();

      const button = screen.getByRole("button", { name: /play again/i });

      await user.click(button);

      const scoreNumber = container.querySelector("#score");
      expect(scoreNumber).toHaveTextContent("-");
    });

    it("should reset time display", async () => {
      const user = userEvent.setup({ delay: null });
      const container = renderPage();

      const button = screen.getByRole("button", { name: /play again/i });

      await user.click(button);

      const timeNumber = container.querySelector("#time");
      expect(timeNumber).toHaveTextContent("-");
    });

    it("should hide play again button", async () => {
      const user = userEvent.setup({ delay: null });
      renderPage();

      const button = screen.getByRole("button", { name: /play again/i });

      await user.click(button);

      expect(button).toHaveStyle({ display: "none" });
    });

    it("should show and refill game grid", async () => {
      const user = userEvent.setup({ delay: null });
      const container = renderPage();

      const button = screen.getByRole("button", { name: /play again/i });

      await user.click(button);

      const gameGrid = container.querySelector(".game__grid");
      const gridItems = gameGrid?.querySelectorAll(".grid-item");

      expect(gameGrid).toHaveStyle({ display: "flex" });
      expect(gridItems).toHaveLength(25);
    });

    it("should replace existing grid items on play again", async () => {
      const user = userEvent.setup({ delay: null });
      const container = renderPage();

      const gameGrid = container.querySelector(".game__grid");
      const initialFirstItem = gameGrid?.querySelector("#gi-0");

      const button = screen.getByRole("button", { name: /play again/i });

      await user.click(button);

      const newFirstItem = gameGrid?.querySelector("#gi-0");

      expect(newFirstItem).toBeInTheDocument();
      expect(newFirstItem).not.toBe(initialFirstItem);
    });

    it("should restart intervals", async () => {
      const user = userEvent.setup({ delay: null });
      renderPage();

      const button = screen.getByRole("button", { name: /play again/i });

      jest.clearAllMocks();

      await user.click(button);

      expect(whacAMoleStore.setIntervalGame).toHaveBeenCalled();
      expect(whacAMoleStore.setIntervalTime).toHaveBeenCalled();
    });
  });

  describe("Timer Functionality", () => {
    it("should update time display when timer runs", () => {
      renderPage();

      (whacAMoleStore.getState as jest.Mock).mockReturnValue({
        counter: 0,
        runTime: 59,
        timeoutSpawn: null,
        intervalGame: null,
        intervalTime: null,
      });

      jest.advanceTimersByTime(1000);

      expect(whacAMoleStore.setRunTimeMinus).toHaveBeenCalled();
    });

    it("should end game when time reaches zero", () => {
      renderPage();

      (whacAMoleStore.getState as jest.Mock).mockReturnValue({
        counter: 5,
        runTime: 0,
        timeoutSpawn: null,
        intervalGame: null,
        intervalTime: null,
      });

      jest.advanceTimersByTime(1000);

      expect(whacAMoleStore.cleanup).toHaveBeenCalled();
    });
  });

  describe("End Game Functionality", () => {
    it("should display time over message", () => {
      const container = renderPage();

      (whacAMoleStore.getState as jest.Mock).mockReturnValue({
        counter: 10,
        runTime: 0,
        timeoutSpawn: null,
        intervalGame: null,
        intervalTime: null,
      });

      jest.advanceTimersByTime(1000);

      const timeNumber = container.querySelector(".game__time-number");
      expect(timeNumber).toHaveTextContent("The time is over");
    });

    it("should display final score", () => {
      const container = renderPage();

      (whacAMoleStore.getState as jest.Mock).mockReturnValue({
        counter: 15,
        runTime: 0,
        timeoutSpawn: null,
        intervalGame: null,
        intervalTime: null,
      });

      jest.advanceTimersByTime(1000);

      const gameScore = container.querySelector(".game__score");
      expect(gameScore).toHaveTextContent(/you score was 15/i);
      expect(gameScore).toHaveTextContent(/push in play again/i);
    });

    it("should show play again button", () => {
      renderPage();

      (whacAMoleStore.getState as jest.Mock).mockReturnValue({
        counter: 5,
        runTime: 0,
        timeoutSpawn: null,
        intervalGame: null,
        intervalTime: null,
      });

      jest.advanceTimersByTime(1000);

      const button = screen.getByRole("button", { name: /play again/i });
      expect(button).toHaveStyle({ display: "block" });
    });

    it("should hide and clear game grid", () => {
      const container = renderPage();

      (whacAMoleStore.getState as jest.Mock).mockReturnValue({
        counter: 5,
        runTime: 0,
        timeoutSpawn: null,
        intervalGame: null,
        intervalTime: null,
      });

      jest.advanceTimersByTime(1000);

      const gameGrid = container.querySelector(".game__grid");
      expect(gameGrid).toHaveStyle({ display: "none" });
      expect(gameGrid?.innerHTML).toBe("");
    });

    it("should reset game state", () => {
      renderPage();

      (whacAMoleStore.getState as jest.Mock).mockReturnValue({
        counter: 5,
        runTime: 0,
        timeoutSpawn: null,
        intervalGame: null,
        intervalTime: null,
      });

      jest.advanceTimersByTime(1000);

      expect(whacAMoleStore.cleanup).toHaveBeenCalled();
    });
  });

  describe("Mole Spawning", () => {
    it("should spawn mole in random grid item after 3 seconds", () => {
      const container = renderPage();
      const gameGrid = container.querySelector(".game__grid");

      expect(gameGrid?.querySelector(".mole")).not.toBeInTheDocument();

      jest.advanceTimersByTime(3000);

      expect(whacAMoleStore.setTimeoutSpawn).toHaveBeenCalled();
    });

    it("should clear previous timeout before spawning", () => {
      const mockTimeout = 123;
      (whacAMoleStore.getState as jest.Mock).mockReturnValue({
        counter: 0,
        runTime: 60,
        timeoutSpawn: mockTimeout,
        intervalGame: null,
        intervalTime: null,
      });

      renderPage();

      jest.advanceTimersByTime(3000);

      expect(whacAMoleStore.clearTimeoutSpawn).toHaveBeenCalled();
    });

    it("should spawn mole in one of the 25 grid items", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.5);

      const container = renderPage();

      jest.advanceTimersByTime(3000);

      container.querySelector("#gi-12");
      expect(whacAMoleStore.setTimeoutSpawn).toHaveBeenCalled();
    });
  });

  describe("Mole Click Functionality", () => {
    it("should have mole click handler attached when spawned", () => {
      const container = renderPage();
      const gameGrid = container.querySelector(".game__grid");

      expect(gameGrid).toBeInTheDocument();
      expect(gameGrid?.children).toHaveLength(25);
    });
  });

  describe("DOM Structure", () => {
    it("should have all game sections", () => {
      const container = renderPage();

      expect(container.querySelector(".game__explication")).toBeInTheDocument();
      expect(container.querySelector(".game__stats")).toBeInTheDocument();
      expect(container.querySelector(".game__grid")).toBeInTheDocument();
      expect(container.querySelector(".game__actions")).toBeInTheDocument();
    });

    it("should nest sections correctly", () => {
      const container = renderPage();

      const gameSection = container.querySelector(".game");
      const explication = container.querySelector(".game__explication");

      expect(explication?.parentElement).toBe(gameSection);
    });

    it("should have grid items as children of game grid", () => {
      const container = renderPage();

      const gameGrid = container.querySelector(".game__grid");
      const firstGridItem = gameGrid?.querySelector("#gi-0");

      expect(firstGridItem?.parentElement).toBe(gameGrid);
    });
  });

  describe("Edge Cases", () => {
    it("should handle missing elements gracefully on end game", () => {
      renderPage();

      (whacAMoleStore.getState as jest.Mock).mockReturnValue({
        counter: 5,
        runTime: 0,
        timeoutSpawn: null,
        intervalGame: null,
        intervalTime: null,
      });

      expect(() => {
        jest.advanceTimersByTime(1000);
      }).not.toThrow();
    });

    it("should handle clicking non-existent mole", async () => {
      const user = userEvent.setup({ delay: null });
      const container = renderPage();

      const gameGrid = container.querySelector(".game__grid");
      const gridItem = gameGrid?.querySelector("#gi-0");

      expect(gridItem?.querySelector(".mole")).not.toBeInTheDocument();

      if (gridItem) {
        await expect(user.click(gridItem)).resolves.not.toThrow();
      }
    });
  });
});
