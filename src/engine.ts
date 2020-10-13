import { SnakeScreen } from './screens/snake.screen';
import { GameOverScreen } from './screens/game-over.screen';
import { SnakeOptions } from "./interfaces";
import { Typography } from "./typography";
import { WelcomeScreen } from './screens/welcome.screen'

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GAME_STATUS_INIT,
} from "./constants";

export class Engine {
  options: SnakeOptions;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  typography: Typography;
  welcomeScreen: WelcomeScreen;
  gameOverScreen: GameOverScreen;
  snakeScreen: SnakeScreen;
  
  name = "";

  gameStatus = GAME_STATUS_INIT;

  constructor(options: SnakeOptions) {
    this.options = options;
    this.canvas = document.createElement("canvas");
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    options.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.typography = new Typography(this.ctx);
    this.welcomeScreen = new WelcomeScreen(this)
    this.gameOverScreen = new GameOverScreen(this)
    this.snakeScreen = new SnakeScreen(this)

    this.welcomeScreen.render()
  }

}