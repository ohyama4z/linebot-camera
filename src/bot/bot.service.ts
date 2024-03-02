import { WebhookEvent, WebhookRequestBody } from "@line/bot-sdk";
import { Injectable } from "@nestjs/common";
import sharp from "sharp";
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
          let to = "";
          if (event.source.type === "user") {
            to = event.source.userId;
          } else if (event.source.type === "group") {
            to = event.source.groupId;
          } else if (event.source.type === "room") {
            to = event.source.roomId;
          }

          client.pushMessage({
            to,
            messages: [
              {
                type: "text",
                text: "ホワイトボードを撮影中...",
              },
            ],
          });
          const src = await camera.capture("test.jpg");
          if (typeof src === "string") {
            console.log(`image-string: ${src}`);
            return;
          }

          const cropped = await sharp(src)
            .extract({
              width: 400,
              height: 500,
              left: 650,
              top: 450,
            })
            .resize(800, 1000)
            .toBuffer();

          const url = await this.store.getUrl(cropped);

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
      }
    }
  }
}
