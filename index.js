"strict type";
(function () {
  const game = (container, leaderBoard) => {
    const CANVAS_WIDTH = 1200;
    const CANVAS_HEIGHT = 1000;
    const BLOCK_SIZE = 10;
    const MIN_CLOCK = 20;
    const MAX_CLOCK = 50;
    const GAME_STATUS_OVER = "GAME_OVER";
    const GAME_STATUS_INIT = "GAME_INIT";
    const GAME_STATUS_IN_PROGRESS = "GAME_IN_PROGRESS";
    const MAX_NAME_LEN = 4;

    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const c = document.createElement("canvas");
    c.width = CANVAS_WIDTH;
    c.height = CANVAS_HEIGHT;
    container.appendChild(c);
    const ctx = c.getContext("2d");

    let x = 0,
      y = 0;
    let score = 0;
    let target = { x: 100, y: 200 };
    let vx = 0,
      vy = 0;
    let trail = [];
    let interval,
      dirty,
      name = "";

    let clock = MAX_CLOCK;
    let gameStatus = GAME_STATUS_INIT;

    let randomTarget = () => {
      target.x =
        getRandomInt(BLOCK_SIZE, c.width / BLOCK_SIZE) * BLOCK_SIZE -
        BLOCK_SIZE;
      target.y =
        getRandomInt(BLOCK_SIZE, c.height / BLOCK_SIZE) * BLOCK_SIZE -
        BLOCK_SIZE;
    };

    let printChar = (x, y, char) => {
      switch (char) {
        case "c":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x, y, 50, 10);
          return;
        case "g":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x + 40, y + 40, 10, -20);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x, y, 50, 10);
          return;
        case "l":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x, y + 40, 50, 10);
          return;
        case "i":
          ctx.fillRect(x + 20, y, 10, 50);
          return;
        case "a":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x + 40, y, 10, 50);
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x, y + 20, 50, 10);
          return;
        case "h":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x + 40, y, 10, 50);
          ctx.fillRect(x, y + 20, 50, 10);
          return;
        case "m":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x + 40, y, 10, 50);
          ctx.fillRect(x, y + 10, 50, 10);
          ctx.fillRect(x + 20, y + 20, 10, 10);
          ctx.fillStyle = "black";
          ctx.fillRect(x + 20, y + 20, 10, -20);
          ctx.fillStyle = "white";
          return;
        case "e":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x, y + 20, 50, 10);
          return;
        case "o":
        case "0":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x + 40, y + 40, 10, -40);
          ctx.fillRect(x, y, 50, 10);
          return;
        case "v":
          ctx.fillRect(x, y, 10, 30);
          ctx.fillRect(x + 40, y, 10, 30);
          ctx.fillRect(x + 10, y + 30, 10, 10);
          ctx.fillRect(x + 30, y + 30, 10, 10);
          ctx.fillRect(x + 20, y + 40, 10, 10);
          return;
        case "f":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x, y + 20, 50, 10);
          return;
        case "p":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x + 40, y, 10, 30);
          ctx.fillRect(x, y + 20, 50, 10);
          return;
        case "r":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x + 40, y, 10, 30);
          ctx.fillRect(x, y + 20, 50, 10);
          ctx.fillRect(x + 30, y + 30, 10, 10);
          ctx.fillRect(x + 40, y + 40, 10, 10);
          return;
        case "y":
          ctx.fillRect(x, y, 10, 20);
          ctx.fillRect(x + 40, y, 10, 20);
          ctx.fillRect(x + 10, y + 20, 10, 10);
          ctx.fillRect(x + 30, y + 20, 10, 10);
          ctx.fillRect(x + 20, y + 30, 10, 20);
          return;
        case "u":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x + 40, y + 40, 10, -40);
          return;
        case "s":
        case "5":
          ctx.fillRect(x, y, 10, 20);
          ctx.fillRect(x + 40, y + 20, 10, 20);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x, y + 20, 50, 10);
          return;
        case "2":
          ctx.fillRect(x, y, 10, 10);
          ctx.fillRect(x + 40, y, 10, 20);
          ctx.fillRect(x, y + 20, 10, 20);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x, y + 20, 50, 10);
          return;
        case "3":
          ctx.fillRect(x + 40, y, 10, 50);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x, y + 20, 50, 10);
          return;
        case "4":
          ctx.fillRect(x, y, 10, 30);
          ctx.fillRect(x, y + 30, 50, 10);
          ctx.fillRect(x + 40, y + 50, 10, -50);
          return;
        case "6":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x, y + 20, 50, 10);
          ctx.fillRect(x + 40, y + 40, 10, -20);
          return;
        case "7":
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x + 40, y + 50, 10, -50);
          return;
        case "8":
        case "b":
          ctx.fillRect(x + 40, y, 10, 50);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x, y + 20, 50, 10);
          ctx.fillRect(x, y, 10, 50);
          return;
        case "9":
          ctx.fillRect(x + 40, y, 10, 50);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x, y + 20, 50, 10);
          ctx.fillRect(x, y, 10, 20);
          return;
        case "1":
          ctx.fillRect(x + 40, y, 10, 50);
          return;
        case "d":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x + 40, y + 40, 10, -40);
          ctx.fillRect(x, y, 50, 10);
          ctx.fillStyle = "black";
          ctx.fillRect(x + 40, y, 10, 10);
          ctx.fillRect(x + 40, y + 40, 10, 10);
          ctx.fillStyle = "white";
          return;
        case "t":
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x + 20, y, 10, 50);
          return;
        case "q":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x + 40, y + 40, 10, -40);
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x + 20, y + 40, 10, -10);
          return;
        case "w":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x + 40, y, 10, 50);
          ctx.fillRect(x + 20, y, 10, 50);
          ctx.fillRect(x, y + 40, 50, 10);
          return;
        case "j":
          ctx.fillRect(x + 40, y, 10, 50);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x, y + 40, 10, -10);
          return;
        case "k":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x + 40, y + 40, 10, 10);
          ctx.fillRect(x + 30, y + 30, 10, 10);
          ctx.fillRect(x + 20, y + 20, 10, 10);
          ctx.fillRect(x + 40, y, 10, 10);
          ctx.fillRect(x + 30, y + 10, 10, 10);
          ctx.fillRect(x + 10, y + 20, 10, 10);
          return;
        case "z":
          ctx.fillRect(x, y, 50, 10);
          ctx.fillRect(x, y + 40, 50, 10);
          ctx.fillRect(x + 20, y + 20, 10, 10);
          ctx.fillRect(x + 10, y + 30, 10, 10);
          ctx.fillRect(x + 30, y + 10, 10, 10);
          return;
        case "x":
          ctx.fillRect(x + 20, y + 20, 10, 10);
          ctx.fillRect(x + 10, y + 30, 10, 10);
          ctx.fillRect(x + 30, y + 10, 10, 10);
          ctx.fillRect(x + 40, y, 10, 10);
          ctx.fillRect(x, y + 40, 10, 10);
          ctx.fillRect(x, y, 10, 10);
          ctx.fillRect(x + 10, y + 10, 10, 10);
          ctx.fillRect(x + 40, y + 40, 10, 10);
          ctx.fillRect(x + 30, y + 30, 10, 10);
          return;
        case "n":
          ctx.fillRect(x, y, 10, 50);
          ctx.fillRect(x + 40, y, 10, 50);
          ctx.fillRect(x + 10, y + 10, 10, 10);
          ctx.fillRect(x + 20, y + 20, 10, 10);
          ctx.fillRect(x + 30, y + 30, 10, 10);
          return;
        case " ":
          return;
      }
    };

    let print = (rows, x, y) => {
      let rowN = 0;
      let colN = 0;
      for (let row of rows) {
        for (let c of row) {
          printChar(x + colN * 80, y + rowN * 80, c);
          colN++;
        }
        rowN++;
        colN = 0;
      }
    };

    let gameOver = () => {
      gameStatus = GAME_STATUS_OVER;
      clearInterval(interval);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "white";
      print(["game", "over"], 20, 10);
      print(["your", "score"], 20, 200);

      print(["" + score], 20, 450);
      print(["press", "space"], 20, 650);
      let i = 0;
      for (let lead of leaderBoard) {
        print([lead.name + " " + lead.score], 500, 10 + 80 * i);
        i++;
      }
    };

    let welcome = () => {
      gameStatus = GAME_STATUS_INIT;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "white";
      print(["input", " name"], 20, 10);

      print([name], 20, 250);

      print(["then", "press", "enter"], 20, 400);
    };
    document.addEventListener("keydown", (event) => {
      if (gameStatus !== GAME_STATUS_INIT) return;
      console.log(event);
      if (
        "qwertyuiopasdfghjklzxcvbnm".indexOf(event.key) > -1 &&
        name.length <= MAX_NAME_LEN - 1
      ) {
        name += event.key;
        welcome();
      }
      if (event.code === "Backspace") {
        name = name.slice(0, -1);
        welcome();
      }
      if (event.code === "Enter") {
        startGame();
      }
    });
    let startGame = () => {
      gameStatus = GAME_STATUS_IN_PROGRESS;
      trail = [
        { x: 10, y: 0 },
        { x: 0, y: 0 },
      ];
      x = 20;
      y = 0;
      vx = 1;
      vy = 0;
      randomTarget();
      clock = MAX_CLOCK;
      interval = setInterval(tick, clock);
    };

    const render = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "red";
      ctx.fillRect(target.x, target.y, BLOCK_SIZE, BLOCK_SIZE);
      ctx.fillStyle = "green";
      ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);

      if (trail.length > 0) {
        for (let point of trail) {
          const { x, y } = point;
          ctx.fillStyle = point.color || "green";
          ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
        }
      }
    };

    const tick = () => {
      if (vx === 0 && vy === 0) return;
      dirty = false;

      for (trailPoint of trail) {
        if (trailPoint.x === x && trailPoint.y === y) {
          return gameOver();
        }
      }

      trail = [{ x, y }, ...trail];

      if (!(target.x === x && target.y === y)) {
        trail.splice(-1, 1);
      } else {
        clock -= 5;
        if (clock < MIN_CLOCK) clock = MIN_CLOCK;
        score += clock === MIN_CLOCK ? 10 : 5;
        clearInterval(interval);
        interval = setInterval(tick, clock);
        randomTarget();
      }

      if (vx === 1 && vy === 0) {
        if (x > c.width - 2 * BLOCK_SIZE) {
          x = 0;
        } else {
          x += BLOCK_SIZE;
        }
      }
      if (vx === -1 && vy === 0) {
        if (x - BLOCK_SIZE >= 0) {
          x -= BLOCK_SIZE;
        } else {
          x = c.width - BLOCK_SIZE;
        }
      }
      if (vx === 0 && vy === -1) {
        if (y - BLOCK_SIZE >= 0) {
          y -= BLOCK_SIZE;
        } else {
          y = c.height - BLOCK_SIZE;
        }
      }
      if (vx === 0 && vy === 1) {
        if (y > c.height - 2 * BLOCK_SIZE) {
          y = 0;
        } else {
          y += BLOCK_SIZE;
        }
      }
      render();
    };

    document.addEventListener("keydown", (event) => {
      console.log(event);
      switch (event.code) {
        case "KeyD":
        case "ArrowRight":
          if (vx === -1) return;
          if (gameStatus !== GAME_STATUS_IN_PROGRESS) return;
          if (dirty) return;
          vx = 1;
          vy = 0;
          dirty = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          if (vx === 1) return;
          if (gameStatus !== GAME_STATUS_IN_PROGRESS) return;
          if (dirty) return;
          vx = -1;
          vy = 0;
          dirty = true;
          break;
        case "KeyW":
        case "ArrowUp":
          if (vy === 1) return;
          if (gameStatus !== GAME_STATUS_IN_PROGRESS) return;
          if (dirty) return;
          vx = 0;
          vy = -1;
          dirty = true;
          break;
        case "KeyS":
        case "ArrowDown":
          if (vy === -1) return;
          if (gameStatus !== GAME_STATUS_IN_PROGRESS) return;
          if (dirty) return;
          vx = 0;
          vy = 1;
          dirty = true;
          break;
        case "Space":
        case "Enter":
          if (gameStatus === GAME_STATUS_OVER) {
            startGame();
          }
          break;
      }
    });

    welcome();
  };

  if (typeof window !== undefined) {
    window.Snake = function ({ container, leaderBoard }) {
      game(container, leaderBoard);
    };
  }
})();
