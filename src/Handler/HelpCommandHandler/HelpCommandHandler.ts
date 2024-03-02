import env from "@/../env";
import { MessageEvent, messagingApi } from "@line/bot-sdk";

export const getHelpText = () => {
  const cameraCommandText = env.command.CAMERA_COMMAND.join(", ");

  return `
    コマンド: 
    - help: このヘルプを表示します
    - whiteboard: ホワイトボードの画像を撮影します
      エイリアス: ${cameraCommandText}
  `;
};

export const helpCommandHandler = async (
  event: MessageEvent,
  client: messagingApi.MessagingApiClient,
) => {
  return await client.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: "text", text: getHelpText() }],
  });
};
