import { BLOCK_SIZE, GAME_STATUS_OVER, MAX_NAME_LEN } from "./constants";
import { Engine } from "./engine";

export class GameOverScreen {
  engine: Engine;
  constructor(engine: Engine) {
    this.engine = engine;

    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "Space":
        case "Enter":
          if (this.engine.gameStatus === GAME_STATUS_OVER) {
            this.engine.snakeScreen.startGame();
          }
          break;
      }
    });
  }

  render() {
    this.engine.gameStatus = GAME_STATUS_OVER;

    if (
      this.engine.snakeScreen.score >
        Math.min(...this.engine.options.leaderBoard.map((e) => e.score)) ||
      !this.engine.options.leaderBoard ||
      this.engine.options.leaderBoard.length < 10
    ) {
      const existing = this.engine.options.leaderBoard.find(
        (e) => e.name === this.engine.name
      );
      if (existing) {
        existing.score =
          this.engine.snakeScreen.score > existing.score
            ? this.engine.snakeScreen.score
            : existing.score;
      } else {
        this.engine.options.leaderBoard.push({
          name: this.engine.name,
          score: this.engine.snakeScreen.score,
        });
      }

      this.engine.options.leaderBoard.sort((a, b) =>
        a.score < b.score
          ? 1
          : a.score === b.score
          ? [a.name, b.name].sort()[0] === a.name
            ? -1
            : 1
          : -1
      );
      if (this.engine.options.leaderBoard.length > 10) {
        this.engine.options.leaderBoard.splice(-1, 1);
      }
      if (
        this.engine.options.onLeaderBoardUpdated &&
        typeof this.engine.options.onLeaderBoardUpdated === "function"
      ) {
        this.engine.options.onLeaderBoardUpdated(
          this.engine.options.leaderBoard
        );
      }
    }
    const genSpaces = (n: number) => {
      let r = "";
      for (let i = 0; i < n; i++) {
        r += " ";
      }
      return r;
    };

    this.engine.ctx.fillStyle = "black";
    this.engine.ctx.fillRect(
      0,
      0,
      this.engine.canvas.width,
      this.engine.canvas.height
    );
    this.engine.ctx.fillStyle = "white";
    this.engine.typography.print(
      [" game", " over"],
      BLOCK_SIZE * 2,
      BLOCK_SIZE
    );
    this.engine.typography.print(
      [" your", "score"],
      BLOCK_SIZE * 2,
      BLOCK_SIZE * 20
    );

    this.engine.typography.print(
      ["" + this.engine.snakeScreen.score],
      BLOCK_SIZE * 2,
      BLOCK_SIZE * 45
    );
    this.engine.typography.print(["press", "space"], 20, BLOCK_SIZE * 80);
    let i = 0;
    for (let lead of this.engine.options.leaderBoard) {
      this.engine.typography.print(
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
}
