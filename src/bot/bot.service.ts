import { WebhookEvent, WebhookRequestBody } from "@line/bot-sdk";
import { Injectable } from "@nestjs/common";
import { CameraService } from "./camera/camera.service";
import { ConfigService } from "./config/config.service";
import { Store } from "./store/store";

@Injectable()
export class BotService {
  constructor(
    private readonly configService: ConfigService,
    private readonly cameraService: CameraService,
    private readonly store: Store,
  ) {}

  async handleWebhook(req: WebhookRequestBody): Promise<void> {
    const camera = this.cameraService.createWebcam();
    const client = this.configService.createBotClient();

    const events: WebhookEvent[] = req.events;
    if (events == null) {
      return;
    }

    for (const event of events) {
      if (event.type === "message" && event.message.type === "text") {
        if (event.message.text === "camera") {
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
