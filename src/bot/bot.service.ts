import { WebhookEvent, WebhookRequestBody } from "@line/bot-sdk";
import { Injectable } from "@nestjs/common";
import { CameraService } from "./camera/camera.service";
import { ConfigService } from "./config/config.service";

@Injectable()
export class BotService {
  constructor(
    private readonly configService: ConfigService,
    private readonly cameraService: CameraService,
  ) {}

  async handleWebhook(req: WebhookRequestBody): Promise<void> {
    const camera = this.cameraService.createWebcam();
    const client = this.configService.createBotClient();

    const events: WebhookEvent[] = req.events;
    if (events == null) {
      return;
    }

    for (const event of events) {
      if (event.type === "message") {
        if (event.message.type === "text" && event.message.text === "camera") {
          await camera.capture();

          client.replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: "text",
                text: "撮影しました",
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
