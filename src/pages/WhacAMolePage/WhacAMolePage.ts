import { Mole } from "@src/components/Mole/Mole";

import { fillGrid } from "@src/helpers/fillGrid";

import { whacAMoleStore } from "@src/stores/whacAMoleStore";

import "@src/pages/WhacAMolePage/WhacAMolePage.css";

const handlePlayAgain = (e: MouseEvent): void => {
  e.preventDefault();

  whacAMoleStore.setResetGame();

  const gameScore =
    document.querySelector<HTMLParagraphElement>(".game__score");
  const time = document.querySelector<HTMLSpanElement>(".game__time-number");
  const btnPlayAgain = document.querySelector<HTMLButtonElement>(
    ".game__btn-play-again"
  );
  const gameGrid = document.querySelector<HTMLDivElement>(".game__grid");

  gameScore!.innerHTML = `Score: <span id="score" class="game__score-number">-</span>`;
  time!.textContent = "-";

  btnPlayAgain!.style.display = "none";
  gameGrid!.style.display = "flex";

  fillGrid(gameGrid!, 25);

  whacAMoleStore.setIntervalGame(setInterval(handleSpawnEnemy, 3000));
  whacAMoleStore.setIntervalTime(setInterval(handleTimer, 1000));
};

const handleEndGame = () => {
  const { counter } = whacAMoleStore.getState();

  const gameGrid = document.querySelector<HTMLDivElement>(".game__grid");
  const btnPlayAgain = document.querySelector<HTMLButtonElement>(
    ".game__btn-play-again"
  );
  const time = document.querySelector<HTMLSpanElement>(".game__time-number");
  const gameScore =
    document.querySelector<HTMLParagraphElement>(".game__score");

  time!.textContent = "The time is over";
  gameScore!.textContent = `You score was ${counter}, Congrats. if you want, push in PLAY AGAIN`;
  btnPlayAgain!.style.display = "block";
  gameGrid!.style.display = "none";
  gameGrid!.innerHTML = "";

  whacAMoleStore.setResetGame();
};

const handleClickMole = () => {
  const gameScoreNumber = document.querySelector<HTMLSpanElement>(
    ".game__score-number"
  );
  const mole = document.querySelector<HTMLImageElement>(".mole");

  mole!.remove();
  whacAMoleStore.setCounterPlus();

  gameScoreNumber!.textContent = String(whacAMoleStore.get("counter"));
};

const handleSpawnEnemy = () => {
  const { timeoutSpawn } = whacAMoleStore.getState();

  const gameGrid = document.querySelector<HTMLDivElement>(".game__grid");

  if (timeoutSpawn) whacAMoleStore.clearTimeoutSpawn();

  const spawn = Math.floor(Math.random() * gameGrid!.children!.length);

  const gridItem = document.querySelector<HTMLDivElement>(`#gi-${spawn}`);

  console.log(gridItem);

  const mole = Mole({});

  gridItem!.append(mole);

  mole.addEventListener("click", handleClickMole);

  whacAMoleStore.setTimeoutSpawn(setTimeout(() => mole.remove(), 2000));
};

function handleTimer(): void {
  const { runTime } = whacAMoleStore.getState();

  const time = document.querySelector<HTMLSpanElement>(".game__time-number");

  if (runTime <= 0) return handleEndGame();

  whacAMoleStore.setRunTimeMinus();
  time!.textContent = String(runTime);
}

export const WhacAMolePage = (): HTMLElement => {
  const main = document.createElement("main");
  main.className = "whac-a-mole-page";

  main.innerHTML = `
    <section class="game">
        <div class="game__explication">
            <h1 class="game__explication-title">Welcome to Whac-a-mole GAME!</h1>
            <p class="game__description">
                You need to hit the RAT when he display in your window. If you hit,
                you will earn points.
            </p>
        </div>

        <div class="game__stats">
            <p class="game__score">
                Score: <span id="score" class="game__score-number">-</span>
            </p>
            <p class="game__time">
                Time: <span id="time" class="game__time-number">-</span>
            </p>
        </div>

        <div class="game__grid"></div>

        <div class="game__actions">
            <button
                id="playAgain"
                aria-label="play again"
                class="game__btn-play-again"
            >
                PLAY AGAIN
            </button>
        </div>
    </section>
  `;

  const gameGrid = main.querySelector<HTMLDivElement>(".game__grid");
  const btnPlayAgain = main.querySelector<HTMLButtonElement>(
    ".game__btn-play-again"
  );

  fillGrid(gameGrid!, 25);

  whacAMoleStore.setIntervalGame(setInterval(handleSpawnEnemy, 3000));
  whacAMoleStore.setIntervalTime(setInterval(handleTimer, 1000));

  btnPlayAgain?.addEventListener("click", handlePlayAgain);

  return main;
};
