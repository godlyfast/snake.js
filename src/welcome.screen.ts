import { BLOCK_SIZE, GAME_STATUS_INIT, MAX_NAME_LEN } from "./constants";
import Snake from "./snake";
export class WelcomeScreen {
  private engine: Snake;
  constructor(engine: Snake) {
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
        this.engine.startGame();
      }
    });
  }
  render() {
    this.engine.gameStatus = GAME_STATUS_INIT;
    this.engine.ctx.fillStyle = "black";
    this.engine.ctx.fillRect(0, 0, this.engine.canvas.width, this.engine.canvas.height);
    this.engine.ctx.fillStyle = "white";
    this.engine.typography.print(["input", " name"], 20, BLOCK_SIZE);
    this.engine.typography.print([this.engine.name], 20, 250);
    this.engine.typography.print([" then", "press", "enter"], 20, 400);
  }
}
