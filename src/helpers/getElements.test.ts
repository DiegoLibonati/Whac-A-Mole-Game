import { getElements } from "./getElements";

const INITIAL_HTML: string = `
    <main>
        <div class="grid"></div>
        <div class="counter_container">
            <p>hola</p>
        </div>
        <span id="time">0</span>
        <span id="score">0</span>
        <button id="playAgain" aria-label="play again">PLAY AGAIN</button>
        <img class="rat" src="src" alt="alt" />
    </main>
`;

beforeEach(() => {
  const body = INITIAL_HTML;

  document.body.innerHTML = body;
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the elements of the document that the 'getElements' function exports.", () => {
  const { grid, counterContainerP, btnPlayAgain, rat, score, time } =
    getElements();

  expect(grid).toBeInTheDocument();
  expect(counterContainerP).toBeInTheDocument();
  expect(time).toBeInTheDocument();
  expect(score).toBeInTheDocument();
  expect(btnPlayAgain).toBeInTheDocument();
  expect(rat).toBeInTheDocument();
  expect(rat).toHaveAttribute("src", "src");
  expect(rat).toHaveAttribute("alt", "alt");
});
