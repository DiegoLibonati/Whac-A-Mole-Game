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

## Description

I made a web page that allows you to play hit the `mole` but in this case it is a `rat`. Basically the user will have 60 seconds to hit the mouse as many times as possible, the mouse will be generated in a random space in the grid. If it is hit by left clicking with the mouse, you will score points.

## Technologies used

1. CSS3
2. Javascript
3. HTML5

## Galery

![Whac-a-mole-Car](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/whac-0.jpg)

![Whac-a-mole-Car](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/whac-1.jpg)

![Whac-a-mole-Car](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/whac-2.jpg)

![Whac-a-mole-Car](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/whac-3.jpg)

![Whac-a-mole-Car](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/whac-4.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Whac-a-mole%20page`

## Video

https://user-images.githubusercontent.com/99032604/199616929-5f4a5738-43aa-4872-88f7-e336625e8b36.mp4

## Documentation

The `gridCreate()` function is in charge of creating the game board:

```
function gridCreate(gridValue){
    for (i = 0; i < 25; i++){
        const grid = document.createElement("div");
        grid.setAttribute("id", i);
        gridValue.append(grid);
        gridArray.push(i);
    }
}
```

The `spawnRandom()` function is in charge of generating a spawnRandom of the rat in any cube of the board:

```
function spawnRandom(){
    random = Math.floor(Math.random() * gridArray.length);
    return random
}
```

The `spawnEnemy()` function is in charge of generating the appearance of the rat on the Board:

```
function spawnEnemy(){

    let numberRandom = spawnRandom();

    const spawnRat = document.getElementById(`${numberRandom}`);

    const rat = document.createElement("img");

    ratArray.push(rat);

    rat.setAttribute("src", "rata.png");
    rat.setAttribute("class", "rat");

    spawnRat.append(rat);

    rat.addEventListener("click", (e)=>{
        ratArray = [];
        removeRat();
        contador++
        scoreUpdate();
    });

    if (ratArray.length >= 1){
            ratArray = [];
            setTimeout(removeRat, 2000);
        } else {
            console.log("Error.");
        }

}
```

The `removeRat()` function is in charge of removing the rat from the game board:

```
function removeRat(){
    const getRat = document.querySelector(".rat");

    try{
        getRat.remove();
    }catch(e){
        console.log("Nada que remover")
    }

}
```

The `scoreUpdate()` function is in charge of updating the score each time we click on the rat:

```
function scoreUpdate(){
    document.getElementById("score").innerHTML = contador;
}
```

The `timeConfig()` function is in charge of subtracting time from the counter, the player will have one minute to make the most clicks on the rat:

```
function timeConfig(gridValue){

    if(runTime <= 0){
        clearInterval(clearTime);
        clearInterval(clearGame);
        document.getElementById("time").innerHTML = "The time is over";
        document.querySelector(".contador_container p").innerHTML = `You score was ${contador}, Congrats. if you want, push in PLAY AGAIN`
        gridValue.remove();

    } else {
        runTime--
        document.getElementById("time").innerHTML = runTime;
    }
}
```

This gives the user the possibility once the time is up to play again without restarting the page, by clicking on `btnPlayAgain`:

```
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
```
