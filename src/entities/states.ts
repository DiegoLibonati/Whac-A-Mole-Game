export type WhacAMoleState = {
  counter: number;
  runTime: number;
  timeoutSpawn: NodeJS.Timeout | null;
  intervalGame: NodeJS.Timeout | null;
  intervalTime: NodeJS.Timeout | null;
};
