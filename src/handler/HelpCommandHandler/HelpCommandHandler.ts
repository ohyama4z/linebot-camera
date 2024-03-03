import { Handler } from "@/types/Handler";
import env from "@env/env";

export const getHelpText = () => {
  const cameraCommandText = env.command.CAMERA_COMMAND.join(", ");

  return `
    コマンド: 
    - help: このヘルプを表示します
    - whiteboard: ホワイトボードの画像を撮影します
      [Alias] ${cameraCommandText}
  `;
};

export const helpCommandHandler: Handler = async (event, client) => {
  return await client.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: "text", text: getHelpText() }],
  });
};
