# Whac-A-Mole-Game-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`


## Description

I made a web page that allows you to play hit the `mole` but in this case it is a `rat`. Basically the user will have 60 seconds to hit the mouse as many times as possible, the mouse will be generated in a random space in the grid. If it is hit by left clicking with the mouse, you will score points.

## Technologies used

1. CSS3
2. Typescript
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/36`](https://www.diegolibonati.com.ar/#/project/36)

## Video

https://user-images.githubusercontent.com/99032604/199616929-5f4a5738-43aa-4872-88f7-e336625e8b36.mp4

## Documentation

The `createGrid()` function is in charge of creating the game board:

```
import { gridDisplay } from "../constants/elements";

export const createGrid = (): void => {
  for (let i = 0; i < 25; i++) {
    const grid = document.createElement("div");
    grid.setAttribute("id", String(i));
    gridDisplay.append(grid);
  }
};

```

The `spawnRandom()` function is in charge of generating a spawnRandom of the rat in any cube of the board:

```
import { gridDisplay } from "../constants/elements";

export const spawnRandom = (): number => {
  const random = Math.floor(Math.random() * gridDisplay.children.length);
  return random;
};
```

The `spawnEnemy()` function is in charge of generating the appearance of the rat on the Board:

```
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
```

The `removeRat()` function is in charge of removing the rat from the game board:

```
const removeRat = (elementRat: HTMLImageElement): void => {
  try {
    elementRat.remove();
  } catch (e) {
    console.log("Nothing to remove");
  }
};
```

The `scoreUpdate()` function is in charge of updating the score each time we click on the rat:

```
import { score } from "../constants/elements";
import { moleState } from "../state";

export const scoreUpdate = (): void => {
  score.textContent = String(moleState.counter);
};
```

The `handleTimer()` function is in charge of subtracting time from the counter, the player will have one minute to make the most clicks on the rat:

```
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

```

This gives the user the possibility once the time is up to play again without restarting the page, by clicking on `btnPlayAgain`:

```
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
```
