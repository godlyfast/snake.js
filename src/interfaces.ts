export interface Score {
  name: string;
  score: number;
}
export interface Point {
  x: number;
  y: number;
}
export interface SnakeOptions {
  container: HTMLElement;
  leaderBoard: Array<Score>;
}