import Snake from "./src/snake";
import { SnakeOptions } from "./src/interfaces";

declare global {
  interface Window {
    Snake: any;
  }
}

if (typeof window !== undefined) {
  window["Snake"] = function (options: SnakeOptions) {
    return new Snake(options);
  };
}
