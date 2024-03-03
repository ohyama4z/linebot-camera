import env from "@/../env";
import sharp from "sharp";

export const extract = async (src: Buffer): Promise<Buffer> => {
  return await sharp(src)
    .extract({
      width: env.camera.extractOption.WIDTH,
      height: env.camera.extractOption.HEIGHT,
      left: env.camera.extractOption.X,
      top: env.camera.extractOption.Y,
    })
    .resize(env.camera.zoomOption.WIDTH, env.camera.zoomOption.HEIGHT)
    .toBuffer();
};
