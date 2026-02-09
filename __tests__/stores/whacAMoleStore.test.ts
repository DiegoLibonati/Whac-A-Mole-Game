import { WhacAMoleStore, whacAMoleStore } from "@/stores/whacAMoleStore";

describe("WhacAMoleStore", () => {
  let store: WhacAMoleStore;

  beforeEach(() => {
    jest.useFakeTimers();
    store = new WhacAMoleStore({
      counter: 0,
      runTime: 60,
      timeoutSpawn: null,
      intervalGame: null,
      intervalTime: null,
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe("Constructor", () => {
    it("should initialize with correct state", () => {
      const state = store.getState();

      expect(state.counter).toBe(0);
      expect(state.runTime).toBe(60);
      expect(state.timeoutSpawn).toBeNull();
      expect(state.intervalGame).toBeNull();
      expect(state.intervalTime).toBeNull();
    });

    it("should create empty listeners for each state key", () => {
      const state = store.getState();
      const keys = Object.keys(state);

      expect(keys).toContain("counter");
      expect(keys).toContain("runTime");
      expect(keys).toContain("timeoutSpawn");
      expect(keys).toContain("intervalGame");
      expect(keys).toContain("intervalTime");
    });
  });

  describe("getState", () => {
    it("should return the current state", () => {
      const state = store.getState();

      expect(state).toHaveProperty("counter");
      expect(state).toHaveProperty("runTime");
      expect(state).toHaveProperty("timeoutSpawn");
      expect(state).toHaveProperty("intervalGame");
      expect(state).toHaveProperty("intervalTime");
    });

    it("should return readonly state", () => {
      const state = store.getState();

      expect(state).toBeDefined();
      expect(typeof state).toBe("object");
    });
  });

  describe("get", () => {
    it("should get specific state value by key", () => {
      expect(store.get("counter")).toBe(0);
      expect(store.get("runTime")).toBe(60);
      expect(store.get("timeoutSpawn")).toBeNull();
      expect(store.get("intervalGame")).toBeNull();
      expect(store.get("intervalTime")).toBeNull();
    });

    it("should return updated values after state changes", () => {
      store.setCounterPlus();

      expect(store.get("counter")).toBe(1);
    });
  });

  describe("setState", () => {
    it("should update state with new values", () => {
      store.setState({ counter: 5 });

      expect(store.get("counter")).toBe(5);
    });

    it("should update multiple state values", () => {
      store.setState({
        counter: 10,
        runTime: 30,
      });

      expect(store.get("counter")).toBe(10);
      expect(store.get("runTime")).toBe(30);
    });

    it("should preserve other state values when updating", () => {
      const originalRunTime = store.get("runTime");

      store.setState({ counter: 5 });

      expect(store.get("runTime")).toBe(originalRunTime);
    });

    it("should trigger listeners when state changes", () => {
      const listener = jest.fn();
      store.subscribe("counter", listener);

      store.setState({ counter: 5 });

      expect(listener).toHaveBeenCalledWith(5);
    });

    it("should not trigger listeners when value does not change", () => {
      const listener = jest.fn();
      store.subscribe("counter", listener);

      store.setState({ counter: 0 });

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe("subscribe", () => {
    it("should subscribe to state changes", () => {
      const listener = jest.fn();

      store.subscribe("counter", listener);
      store.setState({ counter: 5 });

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it("should return unsubscribe function", () => {
      const listener = jest.fn();
      const unsubscribe = store.subscribe("counter", listener);

      expect(typeof unsubscribe).toBe("function");
    });

    it("should unsubscribe listener when calling returned function", () => {
      const listener = jest.fn();
      const unsubscribe = store.subscribe("counter", listener);

      store.setState({ counter: 5 });
      expect(listener).toHaveBeenCalledTimes(1);

      unsubscribe();

      store.setState({ counter: 10 });
      expect(listener).toHaveBeenCalledTimes(1);
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

    it("should trigger listeners on counter change", () => {
      const listener = jest.fn();
      store.subscribe("counter", listener);

      store.setCounterPlus();

      expect(listener).toHaveBeenCalledWith(1);
    });

    it("should increment from current value", () => {
      store.setState({ counter: 10 });

      store.setCounterPlus();

      expect(store.get("counter")).toBe(11);
    });
  });

  describe("setCounterReset", () => {
    it("should reset counter to 0", () => {
      store.setState({ counter: 15 });

      store.setCounterReset();

      expect(store.get("counter")).toBe(0);
    });

    it("should trigger listeners on reset", () => {
      const listener = jest.fn();
      store.setState({ counter: 10 });
      store.subscribe("counter", listener);

      store.setCounterReset();

      expect(listener).toHaveBeenCalledWith(0);
    });

    it("should work when counter is already 0", () => {
      const listener = jest.fn();
      store.subscribe("counter", listener);

      store.setCounterReset();

      expect(listener).not.toHaveBeenCalled();
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
      store.setRunTimeMinus();

      expect(store.get("runTime")).toBe(57);
    });

    it("should trigger listeners on runTime change", () => {
      const listener = jest.fn();
      store.subscribe("runTime", listener);

      store.setRunTimeMinus();

      expect(listener).toHaveBeenCalledWith(59);
    });

    it("should handle negative runTime", () => {
      store.setState({ runTime: 1 });

      store.setRunTimeMinus();
      store.setRunTimeMinus();

      expect(store.get("runTime")).toBe(-1);
    });

    it("should decrement to zero", () => {
      store.setState({ runTime: 1 });

      store.setRunTimeMinus();

      expect(store.get("runTime")).toBe(0);
    });
  });

  describe("setTimeoutSpawn", () => {
    it("should set timeout value", () => {
      const timeout = 123;

      store.setTimeoutSpawn(timeout);

      expect(store.get("timeoutSpawn")).toBe(timeout);
    });

    it("should update timeout value", () => {
      store.setTimeoutSpawn(100);
      expect(store.get("timeoutSpawn")).toBe(100);

      store.setTimeoutSpawn(200);
      expect(store.get("timeoutSpawn")).toBe(200);
    });

    it("should trigger listeners on timeout change", () => {
      const listener = jest.fn();
      store.subscribe("timeoutSpawn", listener);

      store.setTimeoutSpawn(123);

      expect(listener).toHaveBeenCalledWith(123);
    });
  });

  describe("setIntervalGame", () => {
    it("should set interval game value", () => {
      const interval = 456;

      store.setIntervalGame(interval);

      expect(store.get("intervalGame")).toBe(interval);
    });

    it("should update interval game value", () => {
      store.setIntervalGame(100);
      expect(store.get("intervalGame")).toBe(100);

      store.setIntervalGame(200);
      expect(store.get("intervalGame")).toBe(200);
    });

    it("should trigger listeners on interval game change", () => {
      const listener = jest.fn();
      store.subscribe("intervalGame", listener);

      store.setIntervalGame(456);

      expect(listener).toHaveBeenCalledWith(456);
    });
  });

  describe("setIntervalTime", () => {
    it("should set interval time value", () => {
      const interval = 789;

      store.setIntervalTime(interval);

      expect(store.get("intervalTime")).toBe(interval);
    });

    it("should update interval time value", () => {
      store.setIntervalTime(100);
      expect(store.get("intervalTime")).toBe(100);

      store.setIntervalTime(200);
      expect(store.get("intervalTime")).toBe(200);
    });

    it("should trigger listeners on interval time change", () => {
      const listener = jest.fn();
      store.subscribe("intervalTime", listener);

      store.setIntervalTime(789);

      expect(listener).toHaveBeenCalledWith(789);
    });
  });

  describe("clearTimeoutSpawn", () => {
    it("should clear timeout and set to null", () => {
      const timeout = setTimeout(jest.fn(), 1000) as unknown as number;
      store.setTimeoutSpawn(timeout);

      const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

      store.clearTimeoutSpawn();

      expect(clearTimeoutSpy).toHaveBeenCalledWith(timeout);
      expect(store.get("timeoutSpawn")).toBeNull();
    });

    it("should trigger listeners when clearing timeout", () => {
      const timeout = setTimeout(jest.fn(), 1000) as unknown as number;
      store.setTimeoutSpawn(timeout);

      const listener = jest.fn();
      store.subscribe("timeoutSpawn", listener);

      store.clearTimeoutSpawn();

      expect(listener).toHaveBeenCalledWith(null);
    });
  });

  describe("setResetGame", () => {
    it("should clear timeout if exists", () => {
      const timeout = setTimeout(jest.fn(), 1000) as unknown as number;
      store.setTimeoutSpawn(timeout);

      const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

      store.setResetGame();

      expect(clearTimeoutSpy).toHaveBeenCalledWith(timeout);
    });

    it("should clear interval game if exists", () => {
      const interval = setInterval(jest.fn(), 1000) as unknown as number;
      store.setIntervalGame(interval);

      const clearIntervalSpy = jest.spyOn(global, "clearInterval");

      store.setResetGame();

      expect(clearIntervalSpy).toHaveBeenCalledWith(interval);
    });

    it("should clear interval time if exists", () => {
      const interval = setInterval(jest.fn(), 1000) as unknown as number;
      store.setIntervalTime(interval);

      const clearIntervalSpy = jest.spyOn(global, "clearInterval");

      store.setResetGame();

      expect(clearIntervalSpy).toHaveBeenCalledWith(interval);
    });
  });

  describe("Global whacAMoleStore Instance", () => {
    it("should be an instance of WhacAMoleStore", () => {
      expect(whacAMoleStore).toBeInstanceOf(WhacAMoleStore);
    });

    it("should have initial state", () => {
      const state = whacAMoleStore.getState();

      expect(state.counter).toBeDefined();
      expect(state.runTime).toBeDefined();
      expect(state.timeoutSpawn).toBeDefined();
      expect(state.intervalGame).toBeDefined();
      expect(state.intervalTime).toBeDefined();
    });

    it("should have correct initial values", () => {
      const freshStore = new WhacAMoleStore({
        counter: 0,
        runTime: 60,
        timeoutSpawn: null,
        intervalGame: null,
        intervalTime: null,
      });

      expect(freshStore.get("counter")).toBe(0);
      expect(freshStore.get("runTime")).toBe(60);
      expect(freshStore.get("timeoutSpawn")).toBeNull();
      expect(freshStore.get("intervalGame")).toBeNull();
      expect(freshStore.get("intervalTime")).toBeNull();
    });
  });

  describe("Integration Tests", () => {
    it("should handle complete game flow", () => {
      const gameInterval = setInterval(jest.fn(), 3000) as unknown as number;
      const timeInterval = setInterval(jest.fn(), 1000) as unknown as number;

      store.setIntervalGame(gameInterval);
      store.setIntervalTime(timeInterval);

      store.setCounterPlus();
      store.setCounterPlus();
      store.setCounterPlus();

      expect(store.get("counter")).toBe(3);

      store.setRunTimeMinus();
      store.setRunTimeMinus();

      expect(store.get("runTime")).toBe(58);

      store.setResetGame();

      expect(store.get("counter")).toBe(0);
      expect(store.get("runTime")).toBe(60);
      expect(store.get("intervalGame")).toBeNull();
      expect(store.get("intervalTime")).toBeNull();
    });

    it("should handle mole spawning timeout", () => {
      const timeout = setTimeout(jest.fn(), 2000) as unknown as number;
      store.setTimeoutSpawn(timeout);

      expect(store.get("timeoutSpawn")).toBe(timeout);

      store.clearTimeoutSpawn();

      expect(store.get("timeoutSpawn")).toBeNull();

      const newTimeout = setTimeout(jest.fn(), 2000) as unknown as number;
      store.setTimeoutSpawn(newTimeout);

      expect(store.get("timeoutSpawn")).toBe(newTimeout);
    });
  });

  describe("Edge Cases", () => {
    it("should handle listener that throws error", () => {
      const errorListener = jest.fn(() => {
        throw new Error("Listener error");
      });

      store.subscribe("counter", errorListener);

      expect(() => {
        store.setCounterPlus();
      }).toThrow();
    });

    it("should handle multiple listeners on same key", () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      const listener3 = jest.fn();

      store.subscribe("counter", listener1);
      store.subscribe("counter", listener2);
      store.subscribe("counter", listener3);

      store.setCounterPlus();

      expect(listener1).toHaveBeenCalledWith(1);
      expect(listener2).toHaveBeenCalledWith(1);
      expect(listener3).toHaveBeenCalledWith(1);
    });

    it("should handle unsubscribing one of multiple listeners", () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();

      store.subscribe("counter", listener1);
      const unsubscribe2 = store.subscribe("counter", listener2);

      unsubscribe2();

      store.setCounterPlus();

      expect(listener1).toHaveBeenCalledWith(1);
      expect(listener2).not.toHaveBeenCalled();
    });

    it("should handle very large counter values", () => {
      store.setState({ counter: 999999 });

      store.setCounterPlus();

      expect(store.get("counter")).toBe(1000000);
    });

    it("should handle very low runTime values", () => {
      store.setState({ runTime: 0 });

      store.setRunTimeMinus();

      expect(store.get("runTime")).toBe(-1);
    });
  });
});
