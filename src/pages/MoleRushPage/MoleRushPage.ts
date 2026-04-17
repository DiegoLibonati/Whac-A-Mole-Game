import type { Page } from "@/types/pages";

import Mole from "@/components/Mole/Mole";

import { fillGrid } from "@/helpers/fillGrid";

import { moleRushStore } from "@/stores/moleRushStore";

import "@/pages/MoleRushPage/MoleRushPage.css";

const MoleRushPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "mole-rush-page";

  main.innerHTML = `
    <section class="game" aria-label="MoleRush game">
        <div class="game__explication">
            <h1 class="game__explication-title">Welcome to MoleRush GAME!</h1>
            <p class="game__description">
                You need to hit the RAT when he display in your window. If you hit,
                you will earn points.
            </p>
        </div>

        <div class="game__stats" aria-label="Game statistics">
            <p class="game__score">
                Score: <span id="score" class="game__score-number" aria-live="polite">-</span>
            </p>
            <p class="game__time">
                Time: <span id="time" class="game__time-number" aria-live="polite">-</span>
            </p>
        </div>

        <div class="game__grid" aria-label="Game board"></div>

        <div class="game__actions">
            <button
                id="playAgain"
                aria-label="Play again"
                class="game__btn-play-again"
            >
                PLAY AGAIN
            </button>
        </div>
    </section>
  `;

  const activeMoles = new Set<HTMLImageElement>();

  const handlePlayAgain = (e: MouseEvent): void => {
    e.preventDefault();

    moleRushStore.cleanup();

    const gameScore = main.querySelector<HTMLParagraphElement>(".game__score")!;
    const time = main.querySelector<HTMLSpanElement>(".game__time-number")!;
    const btnPlayAgain = main.querySelector<HTMLButtonElement>(
      ".game__btn-play-again"
    )!;
    const gameGrid = main.querySelector<HTMLDivElement>(".game__grid")!;

    gameScore.innerHTML = `Score: <span id="score" class="game__score-number">-</span>`;
    time.textContent = "-";
    btnPlayAgain.style.display = "none";
    gameGrid.style.display = "flex";

    activeMoles.forEach((mole) => {
      mole.removeEventListener("click", handleClickMole);
    });
    activeMoles.clear();

    fillGrid(gameGrid, 25);

    moleRushStore.setIntervalGame(setInterval(handleSpawnEnemy, 3000));
    moleRushStore.setIntervalTime(setInterval(handleTimer, 1000));
  };

  const handleEndGame = (): void => {
    const { counter } = moleRushStore.getState();

    moleRushStore.cleanup();

    const gameGrid = main.querySelector<HTMLDivElement>(".game__grid")!;
    const btnPlayAgain = main.querySelector<HTMLButtonElement>(
      ".game__btn-play-again"
    )!;
    const time = main.querySelector<HTMLSpanElement>(".game__time-number")!;
    const gameScore = main.querySelector<HTMLParagraphElement>(".game__score")!;

    time.textContent = "The time is over";
    gameScore.textContent = `You score was ${counter}, Congrats. if you want, push in PLAY AGAIN`;
    btnPlayAgain.style.display = "block";
    gameGrid.style.display = "none";
    gameGrid.innerHTML = "";

    activeMoles.forEach((mole) => {
      mole.removeEventListener("click", handleClickMole);
    });
    activeMoles.clear();
  };

  const handleClickMole = (e: MouseEvent): void => {
    const gameScoreNumber = main.querySelector<HTMLSpanElement>(
      ".game__score-number"
    )!;
    const mole = e.currentTarget as HTMLImageElement;

    mole.removeEventListener("click", handleClickMole);
    activeMoles.delete(mole);

    mole.remove();
    moleRushStore.setCounterPlus();
    gameScoreNumber.textContent = String(moleRushStore.get("counter"));
  };

  const handleSpawnEnemy = (): void => {
    const { timeoutSpawn } = moleRushStore.getState();

    const gameGrid = main.querySelector<HTMLDivElement>(".game__grid")!;

    if (timeoutSpawn) moleRushStore.clearTimeoutSpawn();

    const spawn = Math.floor(Math.random() * gameGrid.children.length);

    const gridItem = main.querySelector<HTMLDivElement>(`#gi-${spawn}`)!;

    const mole = Mole();

    gridItem.append(mole);

    activeMoles.add(mole);
    mole.addEventListener("click", handleClickMole);

    moleRushStore.setTimeoutSpawn(
      setTimeout(() => {
        mole.removeEventListener("click", handleClickMole);
        activeMoles.delete(mole);
        mole.remove();
      }, 2000)
    );
  };

  const handleTimer = (): void => {
    const { runTime } = moleRushStore.getState();

    const time = main.querySelector<HTMLSpanElement>(".game__time-number")!;

    if (runTime <= 0) {
      handleEndGame();
      return;
    }

    moleRushStore.setRunTimeMinus();
    time.textContent = String(runTime);
  };

  const gameGrid = main.querySelector<HTMLDivElement>(".game__grid")!;
  const btnPlayAgain = main.querySelector<HTMLButtonElement>(
    ".game__btn-play-again"
  );

  fillGrid(gameGrid, 25);

  moleRushStore.setIntervalGame(setInterval(handleSpawnEnemy, 3000));
  moleRushStore.setIntervalTime(setInterval(handleTimer, 1000));

  btnPlayAgain?.addEventListener("click", handlePlayAgain);

  main.cleanup = (): void => {
    moleRushStore.cleanup();

    btnPlayAgain?.removeEventListener("click", handlePlayAgain);

    activeMoles.forEach((mole) => {
      mole.removeEventListener("click", handleClickMole);
    });
    activeMoles.clear();
  };

  return main;
};

export default MoleRushPage;
