import { Webcam } from "@/src/types/Webcam";
import { FSWebcam, WebcamOptions } from "node-webcam";

export class Camera implements Webcam {
  private readonly webcam: FSWebcam;

  constructor(opts: WebcamOptions) {
    this.webcam = new FSWebcam(opts);
  }

  async capture(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      this.webcam.capture(null, (err, data) => {
        if (err != null) {
          reject(err);
          return;
        }

        if (!Buffer.isBuffer(data)) {
          reject(new Error("Expected data to be a Buffer"));
          return;
        }

        resolve(data);
      });
    });
  }
}
