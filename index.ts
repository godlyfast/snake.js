import { Engine } from "./src/engine";
import { SnakeOptions } from "./src/interfaces";

declare global {
  interface Window {
    Snake: any;
  }
}

if (typeof window !== undefined) {
  window["Snake"] = function (options: SnakeOptions) {
    return new Engine(options);
  };
}
