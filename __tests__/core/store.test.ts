import type { Listener } from "@/types/store";

import { Store } from "@/core/store";

interface TestState extends Record<string, unknown> {
  count: number;
  name: string;
}

class TestStore extends Store<TestState> {
  constructor() {
    super({ count: 0, name: "initial" });
  }
}

describe("store", () => {
  let store: TestStore;

  beforeEach(() => {
    store = new TestStore();
  });

  describe("getState", () => {
    it("should return the initial state", () => {
      expect(store.getState()).toEqual({ count: 0, name: "initial" });
    });

    it("should reflect changes after setState", () => {
      store.setState({ count: 5 });
      expect(store.getState()).toEqual({ count: 5, name: "initial" });
    });
  });

  describe("get", () => {
    it("should return the value for a given key", () => {
      expect(store.get("count")).toBe(0);
      expect(store.get("name")).toBe("initial");
    });

    it("should return the updated value after setState", () => {
      store.setState({ count: 10 });
      expect(store.get("count")).toBe(10);
    });
  });

  describe("setState", () => {
    it("should merge partial state without affecting other keys", () => {
      store.setState({ count: 5 });
      expect(store.get("count")).toBe(5);
      expect(store.get("name")).toBe("initial");
    });

    it("should update multiple keys at once", () => {
      store.setState({ count: 3, name: "updated" });
      expect(store.get("count")).toBe(3);
      expect(store.get("name")).toBe("updated");
    });

    it("should notify listener when value changes", () => {
      const mockListener: Listener<number> = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 3 });
      expect(mockListener).toHaveBeenCalledWith(3);
    });

    it("should not notify listener when value does not change", () => {
      const mockListener: Listener<number> = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 0 });
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should notify listener with the new value", () => {
      const mockListener: Listener<string> = jest.fn();
      store.subscribe("name", mockListener);
      store.setState({ name: "changed" });
      expect(mockListener).toHaveBeenCalledWith("changed");
    });
  });

  describe("subscribe", () => {
    it("should invoke listener when subscribed key changes", () => {
      const mockListener: Listener<number> = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 7 });
      expect(mockListener).toHaveBeenCalledTimes(1);
      expect(mockListener).toHaveBeenCalledWith(7);
    });

    it("should support multiple listeners for the same key", () => {
      const mockListener1: Listener<number> = jest.fn();
      const mockListener2: Listener<number> = jest.fn();
      store.subscribe("count", mockListener1);
      store.subscribe("count", mockListener2);
      store.setState({ count: 7 });
      expect(mockListener1).toHaveBeenCalledWith(7);
      expect(mockListener2).toHaveBeenCalledWith(7);
    });

    it("should not invoke listener for a different key change", () => {
      const mockListener: Listener<number> = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ name: "other" });
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should return an unsubscribe function that removes the listener", () => {
      const mockListener: Listener<number> = jest.fn();
      const unsubscribe = store.subscribe("count", mockListener);
      unsubscribe();
      store.setState({ count: 1 });
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should not affect other listeners when one is unsubscribed", () => {
      const mockListener1: Listener<number> = jest.fn();
      const mockListener2: Listener<number> = jest.fn();
      const unsubscribe1 = store.subscribe("count", mockListener1);
      store.subscribe("count", mockListener2);
      unsubscribe1();
      store.setState({ count: 5 });
      expect(mockListener1).not.toHaveBeenCalled();
      expect(mockListener2).toHaveBeenCalledWith(5);
    });

    it("should not invoke listener after being called multiple times with no change", () => {
      const mockListener: Listener<number> = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 2 });
      store.setState({ count: 2 });
      expect(mockListener).toHaveBeenCalledTimes(1);
    });
  });
});
