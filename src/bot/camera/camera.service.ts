import { Injectable } from "@nestjs/common";
import { WebcamOptions } from "node-webcam";
import { Camera } from "./camera";

@Injectable()
export class CameraService {
  createWebcam() {
    const opts: WebcamOptions = {
      width: 1920,
      height: 1080,
      delay: 0,
      quality: 100,
      output: "jpeg",
      callbackReturn: "buffer",
      verbose: false,
    };

    return new Camera(opts);
  }
}
