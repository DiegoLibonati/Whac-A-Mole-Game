import { WhacAMoleStore } from "@/stores/whacAMoleStore";

describe("WhacAMoleStore", () => {
  let store: WhacAMoleStore;

  beforeEach(() => {
    store = new WhacAMoleStore({
      counter: 0,
      runTime: 60,
      timeoutSpawn: null,
      intervalGame: null,
      intervalTime: null,
    });
  });

  afterEach(() => {
    store.cleanup();
  });

  it("should initialize with correct state", () => {
    const state = store.getState();

    expect(state.counter).toBe(0);
    expect(state.runTime).toBe(60);
    expect(state.timeoutSpawn).toBeNull();
    expect(state.intervalGame).toBeNull();
    expect(state.intervalTime).toBeNull();
  });

  it("should increment counter", () => {
    store.setCounterPlus();

    expect(store.get("counter")).toBe(1);

    store.setCounterPlus();
    expect(store.get("counter")).toBe(2);
  });

  it("should reset counter", () => {
    store.setCounterPlus();
    store.setCounterPlus();
    expect(store.get("counter")).toBe(2);

    store.setCounterReset();
    expect(store.get("counter")).toBe(0);
  });

  it("should decrement run time", () => {
    store.setRunTimeMinus();

    expect(store.get("runTime")).toBe(59);
  });

  it("should set timeout spawn", () => {
    const timeout = setTimeout(() => {
      // Timeout callback
    }, 1000) as unknown as number;

    store.setTimeoutSpawn(timeout);

    expect(store.get("timeoutSpawn")).toBe(timeout);

    clearTimeout(timeout);
  });

  it("should set interval game", () => {
    const interval = setInterval(() => {
      // Interval callback
    }, 1000) as unknown as number;

    store.setIntervalGame(interval);

    expect(store.get("intervalGame")).toBe(interval);

    clearInterval(interval);
  });

  it("should set interval time", () => {
    const interval = setInterval(() => {
      // Interval callback
    }, 1000) as unknown as number;

    store.setIntervalTime(interval);

    expect(store.get("intervalTime")).toBe(interval);

    clearInterval(interval);
  });

  it("should clear timeout spawn", () => {
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");
    const timeout = setTimeout(() => {
      // Timeout callback
    }, 1000) as unknown as number;

    store.setTimeoutSpawn(timeout);
    store.clearTimeoutSpawn();

    expect(clearTimeoutSpy).toHaveBeenCalledWith(timeout);
    expect(store.get("timeoutSpawn")).toBeNull();

    clearTimeoutSpy.mockRestore();
  });

  it("should reset game state", () => {
    const interval = setInterval(() => {
      // Interval callback
    }, 1000) as unknown as number;
    const timeout = setTimeout(() => {
      // Timeout callback
    }, 1000) as unknown as number;

    store.setCounterPlus();
    store.setRunTimeMinus();
    store.setIntervalGame(interval);
    store.setTimeoutSpawn(timeout);

    store.setResetGame();

    const state = store.getState();
    expect(state.counter).toBe(0);
    expect(state.runTime).toBe(60);
    expect(state.timeoutSpawn).toBeNull();
    expect(state.intervalGame).toBeNull();
    expect(state.intervalTime).toBeNull();
  });

  it("should cleanup all intervals and timeouts", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

    const intervalGame = setInterval(() => {
      // Interval callback
    }, 1000) as unknown as number;
    const intervalTime = setInterval(() => {
      // Interval callback
    }, 1000) as unknown as number;
    const timeout = setTimeout(() => {
      // Timeout callback
    }, 1000) as unknown as number;

    store.setIntervalGame(intervalGame);
    store.setIntervalTime(intervalTime);
    store.setTimeoutSpawn(timeout);

    store.cleanup();

    expect(clearIntervalSpy).toHaveBeenCalledWith(intervalGame);
    expect(clearIntervalSpy).toHaveBeenCalledWith(intervalTime);
    expect(clearTimeoutSpy).toHaveBeenCalledWith(timeout);

    clearIntervalSpy.mockRestore();
    clearTimeoutSpy.mockRestore();
  });
});
