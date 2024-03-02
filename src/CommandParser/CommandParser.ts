import env from "@/../env";
import { Command } from "@/types/Command";

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
