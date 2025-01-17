import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import {
  IMAGE_MOLE_ALT,
  IMAGE_MOLE_SRC,
  OFFICIAL_BODY,
} from "./tests/jest.constants";

describe("index.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      jest.useFakeTimers();

      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();

      document.body.innerHTML = "";
    });

    test("It must render the title and description of the game.", () => {
      const title = screen.getByRole("heading", {
        name: /welcome to whac-a-mole game!/i,
      });
      const description = screen.getByText(
        "You need to hit the RAT when he display in your window. If you hit, you will earn points."
      );

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    test("The game board, the score, the timer must be rendered and the play again button must not be present.", () => {
      const grid = document.querySelector(".grid") as HTMLDivElement;
      const score = screen.getByText("Score:");
      const timer = screen.getByText("Time:");
      const btnPlayAgain = screen.getByRole("button", { name: /play again/i });

      expect(grid).toBeInTheDocument();
      expect(grid.children).toHaveLength(25);
      expect(score).toBeInTheDocument();
      expect(timer).toBeInTheDocument();
      expect(btnPlayAgain.style.display).toBe("");
    });

    test("It should render everything needed when the game ends.", () => {
      jest.advanceTimersByTime(61000);

      const grid = document.querySelector(".grid") as HTMLDivElement;
      const time = screen.getByText("The time is over");
      const counter = screen.getByText(
        `You score was 0, Congrats. if you want, push in PLAY AGAIN`
      );
      const btnPlayAgain = screen.getByRole("button", { name: /play again/i });

      expect(grid).toBeInTheDocument();
      expect(grid.children).toHaveLength(0);
      expect(grid.style.display).toBe("none");
      expect(time).toBeInTheDocument();
      expect(counter).toBeInTheDocument();
      expect(btnPlayAgain).toBeInTheDocument();
      expect(btnPlayAgain.style.display).toBe("block");
    });

    test("It must run the game again when 'Play Again' is clicked.", async () => {
      const userEvent = user.setup({
        advanceTimers: jest.advanceTimersByTime,
      });

      jest.advanceTimersByTime(61000);

      const btnPlayAgain = screen.getByRole("button", { name: /play again/i });

      expect(btnPlayAgain).toBeInTheDocument();
      expect(btnPlayAgain.style.display).toBe("block");

      await userEvent.click(btnPlayAgain);

      const grid = document.querySelector(".grid") as HTMLDivElement;
      const score = screen.getByText("Score:");
      const timer = screen.getByText("Time:");

      expect(grid).toBeInTheDocument();
      expect(grid.children).toHaveLength(25);
      expect(score).toBeInTheDocument();
      expect(timer).toBeInTheDocument();
      expect(btnPlayAgain.style.display).toBe("none");
    });
  });

  describe("If you don't click on the Mole.", () => {
    beforeEach(() => {
      jest.useFakeTimers();

      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();

      document.body.innerHTML = "";
    });

    test("After 3 seconds the mouse should spawn and in the next 2 seconds it should disappear.", () => {
      const mole = screen.queryByAltText(IMAGE_MOLE_ALT);

      expect(mole).not.toBeInTheDocument();

      jest.advanceTimersByTime(3000);

      const moleAfter3Seconds = screen.getByAltText(IMAGE_MOLE_ALT);

      expect(moleAfter3Seconds).toBeInTheDocument();
      expect(moleAfter3Seconds).toHaveAttribute("src", IMAGE_MOLE_SRC);
      expect(moleAfter3Seconds).toHaveAttribute("alt", IMAGE_MOLE_ALT);
      expect(moleAfter3Seconds.classList.contains("rat")).toBeTruthy();

      jest.advanceTimersByTime(2000);

      expect(moleAfter3Seconds).not.toBeInTheDocument();
    });
  });

  describe("If you click on the Mole.", () => {
    beforeEach(() => {
      jest.useFakeTimers();

      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();

      document.body.innerHTML = "";
    });

    test("It must disappear and add a point to the score.", async () => {
      const userEvent = user.setup({
        advanceTimers: jest.advanceTimersByTime,
      });

      const mole = screen.queryByAltText(IMAGE_MOLE_ALT);

      expect(mole).not.toBeInTheDocument();

      jest.advanceTimersByTime(3000);

      const moleAfter3Seconds = screen.getByAltText(IMAGE_MOLE_ALT);

      expect(moleAfter3Seconds).toBeInTheDocument();
      expect(moleAfter3Seconds).toHaveAttribute("src", IMAGE_MOLE_SRC);
      expect(moleAfter3Seconds).toHaveAttribute("alt", IMAGE_MOLE_ALT);
      expect(moleAfter3Seconds.classList.contains("rat")).toBeTruthy();

      await userEvent.click(moleAfter3Seconds);

      const score = screen.getByText("1");

      expect(moleAfter3Seconds).not.toBeInTheDocument();
      expect(score).toBeInTheDocument();
    });
  });
});
