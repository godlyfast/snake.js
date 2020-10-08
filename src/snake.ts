import { GameOverScreen } from './game-over.screen';
import { getRandomInt } from "./util";
import { Point, SnakeOptions } from "./interfaces";
import { Typography } from "./typography";
import { WelcomeScreen } from './welcome.screen'

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  BLOCK_SIZE,
  MIN_CLOCK,
  MAX_CLOCK,
  GAME_STATUS_INIT,
  GAME_STATUS_IN_PROGRESS,
} from "./constants";

export default class Snake {
  options: SnakeOptions;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  typography: Typography;
  welcomeScreen: WelcomeScreen;
  gameOverScreen: GameOverScreen;

  x = 0;
  y = 0;
  score = 0;
  target: Point = { x: 0, y: 0 };
  vx = 0;
  vy = 0;
  trail: Array<Point> = [];

  interval: number;
  dirty: boolean;
  name = "";

  clock = MAX_CLOCK;
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
    const typography = new Typography(ctx);
    this.typography = typography;
    
    this.welcomeScreen = new WelcomeScreen(this)
    this.gameOverScreen = new GameOverScreen(this)

    document.addEventListener("keydown", (event) => {
      if (this.gameStatus !== GAME_STATUS_IN_PROGRESS) return;
      if (this.dirty) return;

      switch (event.code) {
        case "KeyD":
        case "ArrowRight":
          if (this.vx === -1) return;
          this.vx = 1;
          this.vy = 0;
          this.dirty = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          if (this.vx === 1) return;
          this.vx = -1;
          this.vy = 0;
          this.dirty = true;
          break;
        case "KeyW":
        case "ArrowUp":
          if (this.vy === 1) return;
          this.vx = 0;
          this.vy = -1;
          this.dirty = true;
          break;
        case "KeyS":
        case "ArrowDown":
          if (this.vy === -1) return;
          this.vx = 0;
          this.vy = 1;
          this.dirty = true;
          break;
      }
    });

    this.welcomeScreen.render()
  }

  private setRandomTarget() {
    this.target.x =
      getRandomInt(BLOCK_SIZE, this.canvas.width / BLOCK_SIZE) * BLOCK_SIZE -
      BLOCK_SIZE;
    this.target.y =
      getRandomInt(BLOCK_SIZE, this.canvas.height / BLOCK_SIZE) * BLOCK_SIZE -
      BLOCK_SIZE;
  }

  renderGame() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.target.x, this.target.y, BLOCK_SIZE, BLOCK_SIZE);
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);

    if (this.trail.length > 0) {
      for (let point of this.trail) {
        const { x, y } = point;
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }

  startGame() {
    this.gameStatus = GAME_STATUS_IN_PROGRESS;
    this.trail = [
      { x: BLOCK_SIZE, y: 0 },
      { x: 0, y: 0 },
    ];
    this.x = BLOCK_SIZE * 2;
    this.y = 0;
    this.vx = 1;
    this.vy = 0;
    this.setRandomTarget();
    this.clock = MAX_CLOCK;
    this.interval = setInterval(() => this.tick(), this.clock);
  }



  tick() {
    if (this.vx === 0 && this.vy === 0) return;
    this.dirty = false;

    for (let trailPoint of this.trail) {
      if (trailPoint.x === this.x && trailPoint.y === this.y) {
        return this.gameOverScreen.render();
      }
    }

    this.trail = [{ x: this.x, y: this.y }, ...this.trail];

    if (!(this.target.x === this.x && this.target.y === this.y)) {
      this.trail.splice(-1, 1);
    } else {
      this.clock -= 5;
      if (this.clock < MIN_CLOCK) this.clock = MIN_CLOCK;
      this.score += this.clock === MIN_CLOCK ? 10 : 5;
      clearInterval(this.interval);
      this.interval = setInterval(() => this.tick(), this.clock);
      this.setRandomTarget();
    }

    if (this.vx === 1 && this.vy === 0) {
      if (this.x > this.canvas.width - 2 * BLOCK_SIZE) {
        this.x = 0;
      } else {
        this.x += BLOCK_SIZE;
      }
    }
    if (this.vx === -1 && this.vy === 0) {
      if (this.x - BLOCK_SIZE >= 0) {
        this.x -= BLOCK_SIZE;
      } else {
        this.x = this.canvas.width - BLOCK_SIZE;
      }
    }
    if (this.vx === 0 && this.vy === -1) {
      if (this.y - BLOCK_SIZE >= 0) {
        this.y -= BLOCK_SIZE;
      } else {
        this.y = this.canvas.height - BLOCK_SIZE;
      }
    }
    if (this.vx === 0 && this.vy === 1) {
      if (this.y > this.canvas.height - 2 * BLOCK_SIZE) {
        this.y = 0;
      } else {
        this.y += BLOCK_SIZE;
      }
    }
    this.renderGame();
  }
}