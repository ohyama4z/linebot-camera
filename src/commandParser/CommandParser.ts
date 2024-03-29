import env from "@/env/env";
import { Command } from "@/src/types/Command";

const isCameraCommand = (text: string): boolean => {
  return env.command.CAMERA_COMMAND.some((command) => command === text);
};

const isDiscordTransferCommand = (text: string): boolean => {
  return env.command.DISCORD_TRANSFER_PREFIX.some((prefix) =>
    text.startsWith(prefix),
  );
};

export const parse = (text: string): Command | null => {
  if (text === "help") {
    return "HelpCommand";
  }

  if (isCameraCommand(text)) {
    return "CameraCommand";
  }
  if (isDiscordTransferCommand(text)) {
    return "DiscordTransferCommand";
  }
  return null;
};
