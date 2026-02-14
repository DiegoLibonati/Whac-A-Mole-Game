import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { WhacAMolePage } from "@/pages/WhacAMolePage/WhacAMolePage";

import { whacAMoleStore } from "@/stores/whacAMoleStore";

const renderPage = (): Page => {
  const container = WhacAMolePage();
  document.body.appendChild(container);
  return container;
};

describe("WhacAMolePage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    whacAMoleStore.setResetGame();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    whacAMoleStore.cleanup();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".whac-a-mole-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render game title and description", () => {
    renderPage();

    const title = screen.getByRole("heading", {
      name: "Welcome to Whac-a-mole GAME!",
    });
    expect(title).toBeInTheDocument();

    expect(document.body.textContent).toContain(
      "You need to hit the RAT when he display in your window"
    );
  });

  it("should render game stats with initial values", () => {
    renderPage();

    const score = document.querySelector<HTMLSpanElement>("#score");
    const time = document.querySelector<HTMLSpanElement>("#time");

    expect(score?.textContent).toBe("-");
    expect(time?.textContent).toBe("-");
  });

  it("should render play again button", () => {
    renderPage();

    const button = screen.getByRole("button", { name: "play again" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "playAgain");
  });

  it("should render game grid with 25 items", () => {
    renderPage();

    const grid = document.querySelector<HTMLDivElement>(".game__grid");
    const gridItems = document.querySelectorAll<HTMLDivElement>(".grid-item");

    expect(grid).toBeInTheDocument();
    expect(gridItems).toHaveLength(25);
  });

  it("should start game intervals on mount", () => {
    const setIntervalSpy = jest.spyOn(global, "setInterval");

    renderPage();

    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 3000);
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 1000);

    setIntervalSpy.mockRestore();
  });

  it("should reset game when play again button is clicked", async () => {
    const user = userEvent.setup({ delay: null });
    renderPage();

    const button = screen.getByRole("button", { name: "play again" });
    await user.click(button);

    const score = document.querySelector<HTMLSpanElement>("#score");
    const time = document.querySelector<HTMLSpanElement>("#time");

    expect(score?.textContent).toBe("-");
    expect(time?.textContent).toBe("-");
  });

  it("should cleanup on page cleanup", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    const state = whacAMoleStore.getState();
    expect(state.intervalGame).toBeNull();
    expect(state.intervalTime).toBeNull();
  });
});
