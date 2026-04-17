import { MoleRushStore } from "@/stores/moleRushStore";

describe("moleRushStore", () => {
  let store: MoleRushStore;

  beforeEach(() => {
    jest.useFakeTimers();
    store = new MoleRushStore({
      counter: 0,
      runTime: 60,
      timeoutSpawn: null,
      intervalGame: null,
      intervalTime: null,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("initial state", () => {
    it("should have counter 0", () => {
      expect(store.get("counter")).toBe(0);
    });

    it("should have runTime 60", () => {
      expect(store.get("runTime")).toBe(60);
    });

    it("should have null timeoutSpawn", () => {
      expect(store.get("timeoutSpawn")).toBeNull();
    });

    it("should have null intervalGame", () => {
      expect(store.get("intervalGame")).toBeNull();
    });

    it("should have null intervalTime", () => {
      expect(store.get("intervalTime")).toBeNull();
    });
  });

  describe("setCounterPlus", () => {
    it("should increment counter by 1", () => {
      store.setCounterPlus();
      expect(store.get("counter")).toBe(1);
    });

    it("should increment counter multiple times", () => {
      store.setCounterPlus();
      store.setCounterPlus();
      store.setCounterPlus();
      expect(store.get("counter")).toBe(3);
    });
  });

  describe("setCounterReset", () => {
    it("should reset counter to 0", () => {
      store.setCounterPlus();
      store.setCounterPlus();
      store.setCounterReset();
      expect(store.get("counter")).toBe(0);
    });

    it("should reset counter to 0 even when already 0", () => {
      store.setCounterReset();
      expect(store.get("counter")).toBe(0);
    });
  });

  describe("setRunTimeMinus", () => {
    it("should decrement runTime by 1", () => {
      store.setRunTimeMinus();
      expect(store.get("runTime")).toBe(59);
    });

    it("should decrement runTime multiple times", () => {
      store.setRunTimeMinus();
      store.setRunTimeMinus();
      expect(store.get("runTime")).toBe(58);
    });
  });

  describe("setTimeoutSpawn", () => {
    it("should store the timeout ID", () => {
      const timeout = setTimeout(() => {
        // empty-fn
      }, 1000) as unknown as number;
      store.setTimeoutSpawn(timeout);
      expect(store.get("timeoutSpawn")).toBe(timeout);
    });
  });

  describe("setIntervalGame", () => {
    it("should store the interval ID", () => {
      const interval = setInterval(() => {
        // empty-fn
      }, 3000) as unknown as number;
      store.setIntervalGame(interval);
      expect(store.get("intervalGame")).toBe(interval);
    });
  });

  describe("setIntervalTime", () => {
    it("should store the interval ID", () => {
      const interval = setInterval(() => {
        // empty-fn
      }, 1000) as unknown as number;
      store.setIntervalTime(interval);
      expect(store.get("intervalTime")).toBe(interval);
    });
  });

  describe("clearTimeoutSpawn", () => {
    it("should clear the timeout and set timeoutSpawn to null", () => {
      const mockClearTimeout = jest.spyOn(global, "clearTimeout");
      const timeout = setTimeout(() => {
        // empty-fn
      }, 1000) as unknown as number;
      store.setTimeoutSpawn(timeout);
      store.clearTimeoutSpawn();
      expect(store.get("timeoutSpawn")).toBeNull();
      expect(mockClearTimeout).toHaveBeenCalledWith(timeout);
    });

    it("should do nothing when timeoutSpawn is null", () => {
      const mockClearTimeout = jest.spyOn(global, "clearTimeout");
      store.clearTimeoutSpawn();
      expect(store.get("timeoutSpawn")).toBeNull();
      expect(mockClearTimeout).not.toHaveBeenCalled();
    });
  });

  describe("setResetGame", () => {
    it("should reset counter to 0", () => {
      store.setCounterPlus();
      store.setResetGame();
      expect(store.get("counter")).toBe(0);
    });

    it("should reset runTime to 60", () => {
      store.setRunTimeMinus();
      store.setResetGame();
      expect(store.get("runTime")).toBe(60);
    });

    it("should set all timer IDs to null", () => {
      store.setTimeoutSpawn(
        setTimeout(() => {
          // empty-fn
        }, 1000) as unknown as number
      );
      store.setIntervalGame(
        setInterval(() => {
          // empty-fn
        }, 3000) as unknown as number
      );
      store.setIntervalTime(
        setInterval(() => {
          // empty-fn
        }, 1000) as unknown as number
      );
      store.setResetGame();
      expect(store.get("timeoutSpawn")).toBeNull();
      expect(store.get("intervalGame")).toBeNull();
      expect(store.get("intervalTime")).toBeNull();
    });

    it("should clear all active timers", () => {
      const mockClearTimeout = jest.spyOn(global, "clearTimeout");
      const mockClearInterval = jest.spyOn(global, "clearInterval");
      const timeout = setTimeout(() => {
        // empty-fn
      }, 1000) as unknown as number;
      const intervalGame = setInterval(() => {
        // empty-fn
      }, 3000) as unknown as number;
      const intervalTime = setInterval(() => {
        // empty-fn
      }, 1000) as unknown as number;
      store.setTimeoutSpawn(timeout);
      store.setIntervalGame(intervalGame);
      store.setIntervalTime(intervalTime);
      store.setResetGame();
      expect(mockClearTimeout).toHaveBeenCalledWith(timeout);
      expect(mockClearInterval).toHaveBeenCalledWith(intervalGame);
      expect(mockClearInterval).toHaveBeenCalledWith(intervalTime);
    });
  });

  describe("cleanup", () => {
    it("should reset state to defaults", () => {
      store.setCounterPlus();
      store.setRunTimeMinus();
      store.cleanup();
      expect(store.getState()).toEqual({
        counter: 0,
        runTime: 60,
        timeoutSpawn: null,
        intervalGame: null,
        intervalTime: null,
      });
    });

    it("should clear all active timers", () => {
      const mockClearTimeout = jest.spyOn(global, "clearTimeout");
      const mockClearInterval = jest.spyOn(global, "clearInterval");
      const timeout = setTimeout(() => {
        // empty-fn
      }, 1000) as unknown as number;
      const intervalGame = setInterval(() => {
        // empty-fn
      }, 3000) as unknown as number;
      const intervalTime = setInterval(() => {
        // empty-fn
      }, 1000) as unknown as number;
      store.setTimeoutSpawn(timeout);
      store.setIntervalGame(intervalGame);
      store.setIntervalTime(intervalTime);
      store.cleanup();
      expect(mockClearTimeout).toHaveBeenCalledWith(timeout);
      expect(mockClearInterval).toHaveBeenCalledWith(intervalGame);
      expect(mockClearInterval).toHaveBeenCalledWith(intervalTime);
    });
  });
});
