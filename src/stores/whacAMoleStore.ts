import type { WhacAMoleState } from "@/types/states";

import { Store } from "@/core/store";

export class WhacAMoleStore extends Store<WhacAMoleState> {
  // constructor(initialState: WhacAMoleState) {
  //   super(initialState);
  // }

  public setCounterPlus(): void {
    const { counter } = this.getState();
    const value = counter + 1;
    this.setState({ counter: value });
  }

  public setCounterReset(): void {
    this.setState({ counter: 0 });
  }

  public setRunTimeMinus(): void {
    const { runTime } = this.getState();
    this.setState({ runTime: runTime - 1 });
  }

  public setResetGame(): void {
    const { timeoutSpawn, intervalGame, intervalTime } = this.getState();

    if (timeoutSpawn) clearTimeout(timeoutSpawn);
    if (intervalGame) clearInterval(intervalGame);
    if (intervalTime) clearInterval(intervalTime);

    this.setState({
      counter: 0,
      runTime: 60,
      timeoutSpawn: null,
      intervalGame: null,
      intervalTime: null,
    });
  }

  public setTimeoutSpawn(timeout: number): void {
    this.setState({
      timeoutSpawn: timeout,
    });
  }

  public setIntervalGame(interval: number): void {
    this.setState({
      intervalGame: interval,
    });
  }

  public setIntervalTime(interval: number): void {
    this.setState({
      intervalTime: interval,
    });
  }

  public clearTimeoutSpawn(): void {
    const { timeoutSpawn } = this.getState();

    if (!timeoutSpawn) return;

    clearTimeout(timeoutSpawn);

    this.setState({
      timeoutSpawn: null,
    });
  }

  public cleanup(): void {
    const { intervalGame, intervalTime, timeoutSpawn } = this.getState();

    if (intervalGame) clearInterval(intervalGame);
    if (intervalTime) clearInterval(intervalTime);
    if (timeoutSpawn) clearTimeout(timeoutSpawn);

    this.setResetGame();
  }
}

export const whacAMoleStore = new WhacAMoleStore({
  counter: 0,
  runTime: 60,
  timeoutSpawn: null,
  intervalGame: null,
  intervalTime: null,
});
