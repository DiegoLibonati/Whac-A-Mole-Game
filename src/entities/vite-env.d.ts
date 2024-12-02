/// <reference types="vite/client" />
// TYPES

export type MoleState = {
  counter: number;
  runTime: number;
  intervalTime: NodeJS.Timeout | null;
  intervalGame: NodeJS.Timeout | null;
  timeoutSpawn: NodeJS.Timeout | null;
};
