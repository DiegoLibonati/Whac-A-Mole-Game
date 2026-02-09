export interface WhacAMoleState extends Record<string, unknown> {
  counter: number;
  runTime: number;
  timeoutSpawn: number | null;
  intervalGame: number | null;
  intervalTime: number | null;
}
