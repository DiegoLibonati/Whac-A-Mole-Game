import { moleState } from "./state";

import { fillGrid } from "./helpers/fillGrid";
import { getElements } from "./helpers/getElements";

const handlePlayAgain = (e: MouseEvent): void => {
  const { counterContainerP, time, btnPlayAgain, grid } = getElements();

  e.preventDefault();

  moleState.counter = 0;
  moleState.runTime = 60;

  counterContainerP.innerHTML = `Score: <span id="score">-</span>`;
  time.textContent = "-";

  btnPlayAgain.style.display = "none";
  grid.style.display = "flex";

  fillGrid(grid, 25);

  window.intervalGame = setInterval(handleSpawnEnemy, 3000);
  window.intervalTime = setInterval(handleTimer, 1000);
};

const handleClickRat = () => {
  const { rat, score } = getElements();

  rat.remove();
  moleState.counter++;
  score.textContent = String(moleState.counter);
};

const handleInitialState = (): void => {
  if (window.intervalGame) clearInterval(window.intervalGame!);
  if (window.intervalTime) clearInterval(window.intervalTime!);
  if (window.timeoutSpawn) clearTimeout(window.timeoutSpawn!);

  moleState.counter = 0;
  moleState.runTime = 60;
  window.intervalGame = null;
  window.intervalTime = null;
  window.timeoutSpawn = null;
};

const handleEndGame = () => {
  const { time, counterContainerP, btnPlayAgain, grid } = getElements();

  time.textContent = "The time is over";
  counterContainerP.textContent = `You score was ${moleState.counter}, Congrats. if you want, push in PLAY AGAIN`;
  btnPlayAgain.style.display = "block";
  grid.style.display = "none";
  grid.innerHTML = "";

  clearInterval(window.intervalTime!);
  clearInterval(window.intervalGame!);
};

function handleSpawnEnemy(): void {
  const { grid } = getElements();

  if (window.timeoutSpawn) {
    clearTimeout(window.timeoutSpawn);
    window.timeoutSpawn = null;
  }

  const spawn = Math.floor(Math.random() * grid.children!.length);

  const gridItem = document.getElementById(`${spawn}`) as HTMLDivElement;

  const rat = document.createElement("img");

  rat.setAttribute("src", "./src/assets/rata.png");
  rat.setAttribute("alt", "rat");
  rat.setAttribute("class", "rat");

  gridItem.append(rat);

  rat.addEventListener("click", handleClickRat);

  window.timeoutSpawn = setTimeout(() => rat.remove(), 2000);
}

function handleTimer(): void {
  const { time } = getElements();

  if (moleState.runTime <= 0) return handleEndGame();

  moleState.runTime--;
  time.textContent = String(moleState.runTime);
}

const onInit = () => {
  handleInitialState();

  const { btnPlayAgain, grid } = getElements();

  fillGrid(grid, 25);

  window.intervalGame = setInterval(handleSpawnEnemy, 3000);
  window.intervalTime = setInterval(handleTimer, 1000);

  btnPlayAgain.addEventListener("click", (e) => handlePlayAgain(e));
};

document.addEventListener("DOMContentLoaded", onInit);
