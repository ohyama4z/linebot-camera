import { WebhookEvent, WebhookRequestBody } from "@line/bot-sdk";
import { Injectable } from "@nestjs/common";
import { CameraService } from "./camera/camera.service";
import { ConfigService } from "./config/config.service";
import { Store } from "./store/store";

type CameraCommand =
  | "camera"
  | "カメラ"
  | "写真"
  | "撮影"
  | "whiteboard"
  | "wb"
  | "ホワイトボード"
  | "ほわいとぼーど";
type Command = CameraCommand;
@Injectable()
export class BotService {
  constructor(
    private readonly configService: ConfigService,
    private readonly cameraService: CameraService,
    private readonly store: Store,
  ) {}

  private isCameraCommand(input: string): boolean {
    const commands: Command[] = [
      "camera",
      "カメラ",
      "写真",
      "撮影",
      "whiteboard",
      "wb",
      "ホワイトボード",
      "ほわいとぼーど",
    ];
    return commands.some((command) => command === input);
  }

  async handleWebhook(req: WebhookRequestBody): Promise<void> {
    const camera = this.cameraService.createWebcam();
    const client = this.configService.createBotClient();

    const events: WebhookEvent[] = req.events;
    if (events == null) {
      return;
    }

    for (const event of events) {
      if (event.type === "message" && event.message.type === "text") {
        if (this.isCameraCommand(event.message.text)) {
          client.replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: "text",
                text: "撮影しています",
              },
            ],
          });
          const src = await camera.capture("test.jpg");
          if (typeof src === "string") {
            console.log(`image-string: ${src}`);
            return;
          }
          const url = await this.store.getUrl(src);

          client.replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: "image",
                originalContentUrl: url,
                previewImageUrl: url,
              },
            ],
          });
          return;
        }

        client.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: "text",
              text: event.message.type === "text" ? event.message.text : "test",
            },
          ],
        });
      }
    }
  }
}
