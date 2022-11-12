const gridDisplay = document.querySelector(".grid");
const btnPlayAgain = document.getElementById("playAgain");

let gridArray = [];
let ratArray = [];
let contador = 0;
let runTime = 60;

gridCreate(gridDisplay);

function gridCreate(gridValue) {
  for (i = 0; i < 25; i++) {
    const grid = document.createElement("div");
    grid.setAttribute("id", i);
    gridValue.append(grid);
    gridArray.push(i);
  }
}

function spawnRandom() {
  random = Math.floor(Math.random() * gridArray.length);
  return random;
}

function spawnEnemy() {
  let numberRandom = spawnRandom();

  const spawnRat = document.getElementById(`${numberRandom}`);

  const rat = document.createElement("img");

  ratArray.push(rat);

  rat.setAttribute("src", "rata.png");
  rat.setAttribute("class", "rat");

  spawnRat.append(rat);

  rat.addEventListener("click", (e) => {
    ratArray = [];
    removeRat();
    contador++;
    scoreUpdate();
  });

  if (ratArray.length >= 1) {
    ratArray = [];
    setTimeout(removeRat, 2000);
  } else {
    console.log("Error.");
  }
}

function removeRat() {
  const getRat = document.querySelector(".rat");

  try {
    getRat.remove();
  } catch (e) {
    console.log("Nada que remover");
  }
}

function scoreUpdate() {
  document.getElementById("score").innerHTML = contador;
}

function timeConfig(gridValue) {
  if (runTime <= 0) {
    clearInterval(clearTime);
    clearInterval(clearGame);
    document.getElementById("time").innerHTML = "The time is over";
    document.querySelector(
      ".contador_container p"
    ).innerHTML = `You score was ${contador}, Congrats. if you want, push in PLAY AGAIN`;
    gridValue.remove();
  } else {
    runTime--;
    document.getElementById("time").innerHTML = runTime;
  }
}

let clearGame = setInterval(spawnEnemy, 3000);
let clearTime = setInterval(function () {
  timeConfig(gridDisplay);
}, 1000);

btnPlayAgain.addEventListener("click", (e) => {
  e.preventDefault();

  gridArray = [];
  ratArray = [];
  contador = 0;
  runTime = 60;

  const newGridDiv = document.createElement("div");
  newGridDiv.setAttribute("class", "grid");

  const parentDiv = document.querySelector(".section_container");

  const beforeThis = document.querySelector(".btns_container");

  parentDiv.insertBefore(newGridDiv, beforeThis);

  gridCreate(newGridDiv);

  document.querySelector(
    ".contador_container p"
  ).innerHTML = `Score: <span id="score">0</span>`;

  clearGame = setInterval(spawnEnemy, 3000);
  clearTime = setInterval(function () {
    timeConfig(newGridDiv);
  }, 1000);
});
