import { getElements } from "@src/helpers/getElements";

import { OFFICIAL_BODY } from "@tests/jest.constants";

describe("getElements.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;
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
      expect(rat).not.toBeInTheDocument();
    });
  });
});
