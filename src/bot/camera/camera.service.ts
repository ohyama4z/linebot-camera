import { Injectable } from "@nestjs/common";
import { WebcamOptions } from "node-webcam";
import { Camera } from "./camera";

@Injectable()
export class CameraService {
  createWebcam() {
    const opts: WebcamOptions = {
      width: 1280,
      height: 720,
      delay: 0,
      quality: 100,
      output: "jpeg",
      device: "2",
      callbackReturn: "buffer",
      verbose: false,
    };

    return new Camera(opts);
  }
}
