import { Engine } from "./src/engine";
import { SnakeOptions } from "./src/interfaces";

type SnakeGlobalCallable = {
  (options: SnakeOptions): Engine;
}
declare global {
  interface Window {
    Snake: SnakeGlobalCallable;
  }
}

if (typeof window !== undefined) {
  window["Snake"] = function (options: SnakeOptions): Engine {
    return new Engine(options);
  };
}
