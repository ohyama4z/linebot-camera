import env from "@/env/env";
import { CameraCommandOption } from "../types/Command";

const isFull = (option: string): boolean => {
  return env.command.CAMERA_FULL_OPTION.some((token) => token === option);
};

export const cameraOptions = (options: string[]): CameraCommandOption => {
  if (options.length === 0) {
    return "None";
  }

  for (const option of options) {
    if (isFull(option)) {
      return "Full";
    }
  }

  return "None";
};
