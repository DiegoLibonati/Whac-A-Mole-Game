export const getElements = () => ({
  grid: document.querySelector(".game__grid") as HTMLDivElement,
  counterContainerP: document.querySelector(
    ".game__stats p"
  ) as HTMLParagraphElement,
  time: document.getElementById("time") as HTMLSpanElement,
  score: document.getElementById("score") as HTMLSpanElement,
  btnPlayAgain: document.getElementById("playAgain") as HTMLButtonElement,
  rat: document.querySelector(".rat") as HTMLImageElement,
});
