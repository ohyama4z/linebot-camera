export interface Webcam {
  capture: () => Promise<Buffer>;
}
