import {
  btnPlayAgain,
  counterContainerP,
  gridDisplay,
  time,
} from "./constants/elements";
import { createGrid } from "./helpers/createGrid";
import { spawnRandom } from "./helpers/randomSpawn";
import { scoreUpdate } from "./helpers/scoreUpdate";
import { moleState } from "./state";

const removeRat = (elementRat: HTMLImageElement): void => {
  try {
    elementRat.remove();
  } catch (e) {
    console.log("Nothing to remove");
  }
};

const spawnEnemy = (): void => {
  const spawn = spawnRandom();

  const spawnElement = document.getElementById(`${spawn}`) as HTMLDivElement;

  const rat = document.createElement("img");

  rat.setAttribute("src", "./src/assets/rata.png");
  rat.setAttribute("class", "rat");

  spawnElement.append(rat);

  rat.addEventListener("click", () => {
    removeRat(rat);
    moleState.counter++;
    scoreUpdate();
  });

  setTimeout(() => removeRat(rat), 2000);
};

btnPlayAgain.addEventListener("click", (e) => {
  e.preventDefault();

  moleState.counter = 0;
  moleState.runTime = 60;
  
  counterContainerP.innerHTML = `Score: <span id="score">0</span>`;

  btnPlayAgain.style.display = "none";
  gridDisplay.style.display = "flex";

  createGrid();

  clearGame = setInterval(spawnEnemy, 3000);
  clearTime = setInterval(handleTimer, 1000);
});

const handleTimer = (): void => {
  if (moleState.runTime <= 0) {
    time.textContent = "The time is over";
    counterContainerP.textContent = `You score was ${moleState.counter}, Congrats. if you want, push in PLAY AGAIN`;
    btnPlayAgain.style.display = "block";
    gridDisplay.style.display = "none";
    gridDisplay.innerHTML = "";
    clearInterval(clearTime);
    clearInterval(clearGame);
    return;
  }

  moleState.runTime--;
  time.textContent = String(moleState.runTime);
};

createGrid();

let clearGame = setInterval(spawnEnemy, 3000);
let clearTime = setInterval(handleTimer, 1000);
