export const getElements = () => ({
  grid: document.querySelector(".grid") as HTMLDivElement,
  counterContainerP: document.querySelector(
    ".counter_container p"
  ) as HTMLParagraphElement,
  time: document.getElementById("time") as HTMLSpanElement,
  score: document.getElementById("score") as HTMLSpanElement,
  btnPlayAgain: document.getElementById("playAgain") as HTMLButtonElement,
  rat: document.querySelector(".rat") as HTMLImageElement,
});
