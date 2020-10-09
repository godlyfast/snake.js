import { TEXT_SIZE } from './../constants';
import { BLOCK_SIZE, GAME_STATUS_INIT, MAX_NAME_LEN } from "../constants";
import { Engine } from "../engine";
export class WelcomeScreen {
  private engine: Engine;
  constructor(engine: Engine) {
    this.engine = engine;

    document.addEventListener("keydown", (event) => {
      if (this.engine.gameStatus !== GAME_STATUS_INIT) return;
      if (
        "qwertyuiopasdfghjklzxcvbnm".indexOf(event.key) > -1 &&
        this.engine.name.length <= MAX_NAME_LEN - 1
      ) {
        this.engine.name += event.key;
        this.render();
      }
      if (event.code === "Backspace") {
        this.engine.name = this.engine.name.slice(0, -1);
        this.render();
      }
      if (event.code === "Enter" && this.engine.name !== "") {
        this.engine.snakeScreen.startGame();
      }
    });
  }
  render() {
    this.engine.gameStatus = GAME_STATUS_INIT;
    this.engine.ctx.fillStyle = "black";
    this.engine.ctx.fillRect(
      0,
      0,
      this.engine.canvas.width,
      this.engine.canvas.height
    );
    this.engine.ctx.fillStyle = "white";
    this.engine.typography.print(["input", " name"], 2 * BLOCK_SIZE, BLOCK_SIZE);
    this.engine.typography.print([this.engine.name], 2 * BLOCK_SIZE, 5 * TEXT_SIZE);
    this.engine.typography.print([" then", "press", "enter"], 2 * BLOCK_SIZE, 8* TEXT_SIZE);
  }
}
