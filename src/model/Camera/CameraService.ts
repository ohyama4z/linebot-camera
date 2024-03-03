import env from "@/env/env";
import { WebcamOptions } from "node-webcam";
import { Camera } from "./Camera";

export const createCamera = () => {
  const opts: WebcamOptions = {
    width: env.camera.WIDTH,
    height: env.camera.HEIGHT,
    delay: 0,
    quality: 100,
    output: "jpeg",
    callbackReturn: "buffer",
    verbose: false,
  };

  return new Camera(opts);
};
