import { WhacAMoleState } from "@src/entities/states";

import { Store } from "@src/core/store";

export class WhacAMoleStore extends Store<WhacAMoleState> {
  constructor(initialState: WhacAMoleState) {
    super(initialState);
  }

  public setCounterPlus() {
    const { counter } = this.getState();
    const value = counter + 1;
    this.setState({ counter: value });
  }

  public setCounterReset() {
    this.setState({ counter: 0 });
  }

  public setRunTimeMinus() {
    const { runTime } = this.getState();
    this.setState({ runTime: runTime - 1 });
  }

  public setResetGame() {
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

  public setTimeoutSpawn(timeout: NodeJS.Timeout) {
    this.setState({
      timeoutSpawn: timeout,
    });
  }

  public setIntervalGame(interval: NodeJS.Timeout) {
    this.setState({
      intervalGame: interval,
    });
  }

  public setIntervalTime(interval: NodeJS.Timeout) {
    this.setState({
      intervalTime: interval,
    });
  }

  public clearTimeoutSpawn() {
    const { timeoutSpawn } = this.getState();

    clearTimeout(timeoutSpawn!);

    this.setState({
      timeoutSpawn: null,
    });
  }
}

export const whacAMoleStore = new WhacAMoleStore({
  counter: 0,
  runTime: 60,
  timeoutSpawn: null,
  intervalGame: null,
  intervalTime: null,
});
