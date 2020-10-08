import { getRandomInt } from "./util";
import { Point, SnakeOptions } from "./interfaces";
import Typography from "./typography";

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  BLOCK_SIZE,
  MIN_CLOCK,
  MAX_CLOCK,
  GAME_STATUS_OVER,
  GAME_STATUS_INIT,
  GAME_STATUS_IN_PROGRESS,
  MAX_NAME_LEN,
} from "./constants";

export default class Snake {
  options: SnakeOptions;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  typography: Typography;

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

    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "Space":
        case "Enter":
          if (this.gameStatus === GAME_STATUS_OVER) {
            this.startGame();
          }
          break;
      }
    });

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

    document.addEventListener("keydown", (event) => {
      if (this.gameStatus !== GAME_STATUS_INIT) return;
      if (
        "qwertyuiopasdfghjklzxcvbnm".indexOf(event.key) > -1 &&
        this.name.length <= MAX_NAME_LEN - 1
      ) {
        this.name += event.key;
        this.welcome();
      }
      if (event.code === "Backspace") {
        this.name = this.name.slice(0, -1);
        this.welcome();
      }
      if (event.code === "Enter" && this.name !== "") {
        this.startGame();
      }
    });

    this.welcome();
  }

  private setRandomTarget() {
    this.target.x =
      getRandomInt(BLOCK_SIZE, this.canvas.width / BLOCK_SIZE) * BLOCK_SIZE -
      BLOCK_SIZE;
    this.target.y =
      getRandomInt(BLOCK_SIZE, this.canvas.height / BLOCK_SIZE) * BLOCK_SIZE -
      BLOCK_SIZE;
  }

  gameOver(): Snake {
    this.gameStatus = GAME_STATUS_OVER;
    clearInterval(this.interval);

    if (
      this.score > Math.min(...this.options.leaderBoard.map((e) => e.score)) ||
      !this.options.leaderBoard ||
      this.options.leaderBoard.length < 10
    ) {
      const existing = this.options.leaderBoard.find(
        (e) => e.name === this.name
      );
      if (existing) {
        existing.score =
          this.score > existing.score ? this.score : existing.score;
      } else {
        this.options.leaderBoard.push({ name: this.name, score: this.score });
      }

      this.options.leaderBoard.sort((a, b) =>
        a.score < b.score
          ? 1
          : a.score === b.score
          ? [a.name, b.name].sort()[0] === a.name
            ? -1
            : 1
          : -1
      );
      if (this.options.leaderBoard.length > 10) {
        this.options.leaderBoard.splice(-1, 1);
      }
      if (
        this.options.onLeaderBoardUpdated &&
        typeof this.options.onLeaderBoardUpdated === "function"
      ) {
        this.options.onLeaderBoardUpdated(this.options.leaderBoard);
      }
    }
    const genSpaces = (n: number) => {
      let r = "";
      for (let i = 0; i < n; i++) {
        r += " ";
      }
      return r;
    };

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "white";
    this.typography.print([" game", " over"], BLOCK_SIZE * 2, BLOCK_SIZE);
    this.typography.print([" your", "score"], BLOCK_SIZE * 2, BLOCK_SIZE * 20);

    this.typography.print(["" + this.score], BLOCK_SIZE * 2, BLOCK_SIZE * 45);
    this.typography.print(["press", "space"], 20, BLOCK_SIZE * 80);
    let i = 0;
    for (let lead of this.options.leaderBoard) {
      this.typography.print(
        [
          genSpaces(MAX_NAME_LEN - lead.name.length) +
            lead.name +
            " " +
            lead.score,
        ],
        500,
        BLOCK_SIZE + 80 * i
      );
      i++;
    }
    return this;
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

  welcome() {
    this.gameStatus = GAME_STATUS_INIT;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "white";
    this.typography.print(["input", " name"], 20, BLOCK_SIZE);
    this.typography.print([this.name], 20, 250);
    this.typography.print([" then", "press", "enter"], 20, 400);
  }

  tick() {
    if (this.vx === 0 && this.vy === 0) return;
    this.dirty = false;

    for (let trailPoint of this.trail) {
      if (trailPoint.x === this.x && trailPoint.y === this.y) {
        return this.gameOver();
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