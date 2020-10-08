import {
  BLOCK_SIZE,
  TEXT_SIZE
} from "./constants";

export class Typography {
  private ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }
  printChar(x: number, y: number, char: string) {
    switch (char) {
      case "c":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        return;
      case "g":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(
          x + TEXT_SIZE - BLOCK_SIZE,
          y + TEXT_SIZE - BLOCK_SIZE,
          BLOCK_SIZE,
          -20
        );
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        return;
      case "l":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        return;
      case "i":
        this.ctx.fillRect(x + 20, y, BLOCK_SIZE, TEXT_SIZE);
        return;
      case "a":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y + 20, TEXT_SIZE, BLOCK_SIZE);
        return;
      case "h":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + 20, TEXT_SIZE, BLOCK_SIZE);
        return;
      case "m":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + 20, y + 20, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(x + 20, y + 20, BLOCK_SIZE, -20);
        this.ctx.fillStyle = "white";
        return;
      case "e":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y + 20, TEXT_SIZE, BLOCK_SIZE);
        return;
      case "o":
      case "0":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(
          x + TEXT_SIZE - BLOCK_SIZE,
          y + TEXT_SIZE - BLOCK_SIZE,
          BLOCK_SIZE,
          -TEXT_SIZE + BLOCK_SIZE
        );
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        return;
      case "v":
        this.ctx.fillRect(x, y, BLOCK_SIZE, 30);
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, 30);
        this.ctx.fillRect(x + BLOCK_SIZE, y + 30, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + 30, y + 30, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(
          x + 20,
          y + TEXT_SIZE - BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
        return;
      case "f":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y + 20, TEXT_SIZE, BLOCK_SIZE);
        return;
      case "p":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(
          x + TEXT_SIZE - BLOCK_SIZE,
          y,
          BLOCK_SIZE,
          TEXT_SIZE - 2 * BLOCK_SIZE
        );
        this.ctx.fillRect(x, y + 20, TEXT_SIZE, BLOCK_SIZE);
        return;
      case "r":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, 30);
        this.ctx.fillRect(x, y + 20, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + 30, y + 30, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(
          x + TEXT_SIZE - BLOCK_SIZE,
          y + TEXT_SIZE - BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
        return;
      case "y":
        this.ctx.fillRect(x, y, BLOCK_SIZE, 20);
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, 20);
        this.ctx.fillRect(x + BLOCK_SIZE, y + 20, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + 30, y + 20, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + 20, y + 30, BLOCK_SIZE, 20);
        return;
      case "u":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(
          x + TEXT_SIZE - BLOCK_SIZE,
          y + TEXT_SIZE - BLOCK_SIZE,
          BLOCK_SIZE,
          -TEXT_SIZE + BLOCK_SIZE
        );
        return;
      case "s":
      case "5":
        this.ctx.fillRect(x, y, BLOCK_SIZE, 20);
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y + 20, BLOCK_SIZE, 20);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y + 20, TEXT_SIZE, BLOCK_SIZE);
        return;
      case "2":
        this.ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, 20);
        this.ctx.fillRect(x, y + 20, BLOCK_SIZE, 20);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y + 20, TEXT_SIZE, BLOCK_SIZE);
        return;
      case "3":
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y + 20, TEXT_SIZE, BLOCK_SIZE);
        return;
      case "4":
        this.ctx.fillRect(x, y, BLOCK_SIZE, 30);
        this.ctx.fillRect(x, y + 30, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(
          x + TEXT_SIZE - BLOCK_SIZE,
          y + TEXT_SIZE,
          BLOCK_SIZE,
          -TEXT_SIZE
        );
        return;
      case "6":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y + 20, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(
          x + TEXT_SIZE - BLOCK_SIZE,
          y + TEXT_SIZE - BLOCK_SIZE,
          BLOCK_SIZE,
          -20
        );
        return;
      case "7":
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(
          x + TEXT_SIZE - BLOCK_SIZE,
          y + TEXT_SIZE,
          BLOCK_SIZE,
          -TEXT_SIZE
        );
        return;
      case "8":
      case "b":
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y + 20, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        return;
      case "9":
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y + 20, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y, BLOCK_SIZE, 20);
        return;
      case "1":
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, TEXT_SIZE);
        return;
      case "d":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(
          x + TEXT_SIZE - BLOCK_SIZE,
          y + TEXT_SIZE - BLOCK_SIZE,
          BLOCK_SIZE,
          -TEXT_SIZE + BLOCK_SIZE
        );
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(
          x + TEXT_SIZE - BLOCK_SIZE,
          y + TEXT_SIZE - BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
        this.ctx.fillStyle = "white";
        return;
      case "t":
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + 20, y, BLOCK_SIZE, TEXT_SIZE);
        return;
      case "q":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(
          x + TEXT_SIZE - BLOCK_SIZE,
          y + TEXT_SIZE - BLOCK_SIZE,
          BLOCK_SIZE,
          -TEXT_SIZE + BLOCK_SIZE
        );
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(
          x + 20,
          y + TEXT_SIZE - BLOCK_SIZE,
          BLOCK_SIZE,
          -BLOCK_SIZE
        );
        return;
      case "w":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x + 20, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        return;
      case "j":
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, BLOCK_SIZE, -BLOCK_SIZE);
        return;
      case "k":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(
          x + TEXT_SIZE - BLOCK_SIZE,
          y + TEXT_SIZE - BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
        this.ctx.fillRect(x + 30, y + 30, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + 20, y + 20, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + 30, y + BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + BLOCK_SIZE, y + 20, BLOCK_SIZE, BLOCK_SIZE);
        return;
      case "z":
        this.ctx.fillRect(x, y, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, TEXT_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + 20, y + 20, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + BLOCK_SIZE, y + 30, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + 30, y + BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        return;
      case "x":
        this.ctx.fillRect(x + 20, y + 20, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + BLOCK_SIZE, y + 30, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + 30, y + BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y + TEXT_SIZE - BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + BLOCK_SIZE, y + BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(
          x + TEXT_SIZE - BLOCK_SIZE,
          y + TEXT_SIZE - BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
        this.ctx.fillRect(x + 30, y + 30, BLOCK_SIZE, BLOCK_SIZE);
        return;
      case "n":
        this.ctx.fillRect(x, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x + TEXT_SIZE - BLOCK_SIZE, y, BLOCK_SIZE, TEXT_SIZE);
        this.ctx.fillRect(x + BLOCK_SIZE, y + BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + 20, y + 20, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillRect(x + 30, y + 30, BLOCK_SIZE, BLOCK_SIZE);
        return;
      case " ":
        return;
    }
    return this;
  }
  print(rows: Array<string>, x: number, y: number) {
    let rowN = 0;
    let colN = 0;
    for (let row of rows) {
      for (let c of row) {
        this.printChar(x + colN * 8 * BLOCK_SIZE, y + rowN * 8 * BLOCK_SIZE, c);
        colN++;
      }
      rowN++;
      colN = 0;
    }
    return this;
  }
}