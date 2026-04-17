import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import MoleRushPage from "@/pages/MoleRushPage/MoleRushPage";

import { moleRushStore } from "@/stores/moleRushStore";

let page: Page;

const renderPage = (): Page => {
  page = MoleRushPage();
  document.body.appendChild(page);
  return page;
};

describe("MoleRushPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    moleRushStore.setResetGame();
  });

  afterEach(() => {
    if (page.cleanup) page.cleanup();
    document.body.innerHTML = "";
    jest.useRealTimers();
  });

  describe("rendering", () => {
    it("should render a main element", () => {
      renderPage();
      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should render a section with aria-label MoleRush game", () => {
      renderPage();
      expect(
        screen.getByRole("region", { name: "MoleRush game" })
      ).toBeInTheDocument();
    });

    it("should render game statistics section with aria-label Game statistics", () => {
      renderPage();
      const stats = document.querySelector<HTMLDivElement>(
        '[aria-label="Game statistics"]'
      );
      expect(stats).toBeInTheDocument();
    });

    it("should render score with initial value -", () => {
      renderPage();
      expect(document.getElementById("score")).toHaveTextContent("-");
    });

    it("should render time with initial value -", () => {
      renderPage();
      expect(document.getElementById("time")).toHaveTextContent("-");
    });

    it("should render the game grid with 25 items", () => {
      renderPage();
      const grid = document.querySelector<HTMLDivElement>(".game__grid")!;
      expect(grid.children.length).toBe(25);
    });

    it("should render the play again button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Play again" })
      ).toBeInTheDocument();
    });
  });

  describe("timer", () => {
    it("should update the time display after 1 second", () => {
      renderPage();
      jest.advanceTimersByTime(1000);
      expect(document.getElementById("time")).toHaveTextContent("60");
    });

    it("should decrement runTime in the store after each tick", () => {
      renderPage();
      jest.advanceTimersByTime(1000);
      expect(moleRushStore.get("runTime")).toBe(59);
    });

    it("should show The time is over when runTime reaches 0", () => {
      moleRushStore.setState({ runTime: 1 });
      renderPage();
      jest.advanceTimersByTime(2000);
      const time =
        document.querySelector<HTMLSpanElement>(".game__time-number")!;
      expect(time).toHaveTextContent("The time is over");
    });
  });

  describe("end game", () => {
    beforeEach(() => {
      moleRushStore.setState({ runTime: 1 });
    });

    it("should hide the game grid when the game ends", () => {
      renderPage();
      jest.advanceTimersByTime(2000);
      const grid = document.querySelector<HTMLDivElement>(".game__grid")!;
      expect(grid.style.display).toBe("none");
    });

    it("should show the play again button when the game ends", () => {
      renderPage();
      jest.advanceTimersByTime(2000);
      expect(screen.getByRole("button", { name: "Play again" })).toHaveStyle({
        display: "block",
      });
    });

    it("should display the final score text when the game ends", () => {
      renderPage();
      jest.advanceTimersByTime(2000);
      const gameScore =
        document.querySelector<HTMLParagraphElement>(".game__score")!;
      expect(gameScore.textContent).toContain("Congrats");
    });

    it("should reset store counter and timers on end game", () => {
      renderPage();
      jest.advanceTimersByTime(2000);
      expect(moleRushStore.get("intervalGame")).toBeNull();
      expect(moleRushStore.get("intervalTime")).toBeNull();
    });
  });

  describe("spawn enemy", () => {
    it("should spawn a mole in a grid cell after 3 seconds", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderPage();
      jest.advanceTimersByTime(3000);
      const gridItem = document.getElementById("gi-0")!;
      expect(gridItem.querySelector(".mole")).toBeInTheDocument();
    });

    it("should remove the mole automatically after 2 more seconds", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderPage();
      jest.advanceTimersByTime(3000);
      jest.advanceTimersByTime(2000);
      const gridItem = document.getElementById("gi-0")!;
      expect(gridItem.querySelector(".mole")).toBeNull();
    });
  });

  describe("click mole", () => {
    it("should increment the score display when a mole is clicked", async () => {
      const user = userEvent.setup({ delay: null });
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderPage();
      jest.advanceTimersByTime(3000);
      const mole = document.querySelector<HTMLImageElement>(".mole")!;
      await user.click(mole);
      expect(document.getElementById("score")).toHaveTextContent("1");
    });

    it("should remove the mole from the DOM when clicked", async () => {
      const user = userEvent.setup({ delay: null });
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderPage();
      jest.advanceTimersByTime(3000);
      const mole = document.querySelector<HTMLImageElement>(".mole")!;
      await user.click(mole);
      expect(document.querySelector(".mole")).toBeNull();
    });

    it("should increment the store counter when a mole is clicked", async () => {
      const user = userEvent.setup({ delay: null });
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderPage();
      jest.advanceTimersByTime(3000);
      const mole = document.querySelector<HTMLImageElement>(".mole")!;
      await user.click(mole);
      expect(moleRushStore.get("counter")).toBe(1);
    });
  });

  describe("play again", () => {
    beforeEach(() => {
      moleRushStore.setState({ runTime: 1 });
    });

    it("should reset score to - when play again is clicked", async () => {
      const user = userEvent.setup({ delay: null });
      renderPage();
      jest.advanceTimersByTime(2000);
      await user.click(screen.getByRole("button", { name: "Play again" }));
      expect(document.getElementById("score")).toHaveTextContent("-");
    });

    it("should reset time to - when play again is clicked", async () => {
      const user = userEvent.setup({ delay: null });
      renderPage();
      jest.advanceTimersByTime(2000);
      await user.click(screen.getByRole("button", { name: "Play again" }));
      const time =
        document.querySelector<HTMLSpanElement>(".game__time-number")!;
      expect(time).toHaveTextContent("-");
    });

    it("should refill the grid with 25 items when play again is clicked", async () => {
      const user = userEvent.setup({ delay: null });
      renderPage();
      jest.advanceTimersByTime(2000);
      await user.click(screen.getByRole("button", { name: "Play again" }));
      const grid = document.querySelector<HTMLDivElement>(".game__grid")!;
      expect(grid.children.length).toBe(25);
    });

    it("should show the game grid when play again is clicked", async () => {
      const user = userEvent.setup({ delay: null });
      renderPage();
      jest.advanceTimersByTime(2000);
      await user.click(screen.getByRole("button", { name: "Play again" }));
      const grid = document.querySelector<HTMLDivElement>(".game__grid")!;
      expect(grid.style.display).toBe("flex");
    });
  });

  describe("cleanup", () => {
    it("should clear active intervals when cleanup is called", () => {
      const mockClearInterval = jest.spyOn(global, "clearInterval");
      renderPage();
      page.cleanup!();
      expect(mockClearInterval).toHaveBeenCalled();
    });

    it("should reset the store when cleanup is called", () => {
      renderPage();
      page.cleanup!();
      expect(moleRushStore.get("intervalGame")).toBeNull();
      expect(moleRushStore.get("intervalTime")).toBeNull();
    });
  });
});
