import { SnakeScreen } from './snake.screen';
import { GameOverScreen } from './game-over.screen';
import { SnakeOptions } from "./interfaces";
import { Typography } from "./typography";
import { WelcomeScreen } from './welcome.screen'

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
    const c = document.createElement("canvas");
    c.width = CANVAS_WIDTH;
    c.height = CANVAS_HEIGHT;
    options.container.appendChild(c);
    this.canvas = c;
    const ctx: CanvasRenderingContext2D = c.getContext("2d");
    this.ctx = ctx;

    this.typography= new Typography(ctx);
    this.welcomeScreen = new WelcomeScreen(this)
    this.gameOverScreen = new GameOverScreen(this)
    this.snakeScreen = new SnakeScreen(this)

    this.welcomeScreen.render()
  }

}