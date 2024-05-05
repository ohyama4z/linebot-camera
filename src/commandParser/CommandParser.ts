import env from "@/env/env";
import { Command } from "@/src/types/Command";

const isHelpCommand = (text: string): boolean => {
  return text === "help";
};

const isCameraCommand = (text: string): boolean => {
  return env.command.CAMERA_COMMAND.some((command) => command === text);
};

const isDiscordTransferCommand = (text: string): boolean => {
  return env.command.DISCORD_TRANSFER_PREFIX.some((prefix) =>
    text.startsWith(prefix),
  );
};

export const parseCommand = (text: string): Command | null => {
  const command = text.split(" ")[0];
  if (isHelpCommand(command)) {
    return "HelpCommand";
  }

  if (isCameraCommand(command)) {
    return "CameraCommand";
  }

  if (isDiscordTransferCommand(command)) {
    return "DiscordTransferCommand";
  }

  return null;
};
