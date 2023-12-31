import { WebcamOptions, WindowsWebcam } from "node-webcam";
export class Camera {
  private readonly webcam: WindowsWebcam;

  constructor(private readonly opts: WebcamOptions) {
    this.webcam = new WindowsWebcam(this.opts);
  }

  async capture(path: string | null = null): Promise<string | Buffer> {
    return new Promise((resolve, reject) => {
      this.webcam.capture(path, (err, data) => {
        if (err != null) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
