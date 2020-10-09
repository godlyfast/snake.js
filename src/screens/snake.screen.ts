import {
  GAME_BLOCK_SIZE,
  GAME_STATUS_IN_PROGRESS,
  MAX_CLOCK,
  MIN_CLOCK,
} from "../constants";
import { Point } from "../interfaces";
import { Engine } from "../engine";
import { getRandomInt } from "../util";
const BLOCK_SIZE = GAME_BLOCK_SIZE
export class SnakeScreen {
  engine: Engine;

  x = 0;
  y = 0;
  score = 0;
  target: Point = { x: 0, y: 0 };
  vx = 0;
  vy = 0;
  trail: Array<Point> = [];
  clock = MAX_CLOCK;

  interval: number;
  dirty: boolean;

  constructor(engine: Engine) {
    this.engine = engine;

    document.addEventListener("keydown", (event) => {
      if (this.engine.gameStatus !== GAME_STATUS_IN_PROGRESS) return;
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
  }

  private setRandomTarget() {
    this.target.x =
      getRandomInt(BLOCK_SIZE, this.engine.canvas.width / BLOCK_SIZE) *
        BLOCK_SIZE -
      BLOCK_SIZE;
    this.target.y =
      getRandomInt(BLOCK_SIZE, this.engine.canvas.height / BLOCK_SIZE) *
        BLOCK_SIZE -
      BLOCK_SIZE;
  }

  render() {
    this.engine.ctx.fillStyle = "black";
    this.engine.ctx.fillRect(
      0,
      0,
      this.engine.canvas.width,
      this.engine.canvas.height
    );
    this.engine.ctx.fillStyle = "red";
    this.engine.ctx.fillRect(
      this.target.x,
      this.target.y,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
    this.engine.ctx.fillStyle = "green";
    this.engine.ctx.fillRect(this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);

    if (this.trail.length > 0) {
      for (let point of this.trail) {
        const { x, y } = point;
        this.engine.ctx.fillStyle = "green";
        this.engine.ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }

  startGame() {
    this.engine.gameStatus = GAME_STATUS_IN_PROGRESS;
    this.trail = [
      { x: BLOCK_SIZE, y: 0 },
      { x: 0, y: 0 },
    ];
    this.x = BLOCK_SIZE * 2;
    this.y = 0;
    this.vx = 1;
    this.vy = 0;
    this.score = 0;
    this.setRandomTarget();
    this.clock = MAX_CLOCK;
    this.interval = setInterval(() => this.tick(), this.clock);
  }

  tick() {
    if (this.vx === 0 && this.vy === 0) return;
    this.dirty = false;

    for (let trailPoint of this.trail) {
      if (trailPoint.x === this.x && trailPoint.y === this.y) {
        clearInterval(this.interval);
        return this.engine.gameOverScreen.render();
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
      if (this.x > this.engine.canvas.width - 2 * BLOCK_SIZE) {
        this.x = 0;
      } else {
        this.x += BLOCK_SIZE;
      }
    }
    if (this.vx === -1 && this.vy === 0) {
      if (this.x - BLOCK_SIZE >= 0) {
        this.x -= BLOCK_SIZE;
      } else {
        this.x = this.engine.canvas.width - BLOCK_SIZE;
      }
    }
    if (this.vx === 0 && this.vy === -1) {
      if (this.y - BLOCK_SIZE >= 0) {
        this.y -= BLOCK_SIZE;
      } else {
        this.y = this.engine.canvas.height - BLOCK_SIZE;
      }
    }
    if (this.vx === 0 && this.vy === 1) {
      if (this.y > this.engine.canvas.height - 2 * BLOCK_SIZE) {
        this.y = 0;
      } else {
        this.y += BLOCK_SIZE;
      }
    }
    this.render();
  }
}
