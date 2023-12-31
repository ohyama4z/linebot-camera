import { WebhookEvent, WebhookRequestBody } from "@line/bot-sdk";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "./config/config.service";

@Injectable()
export class BotService {
  constructor(private readonly configService: ConfigService) {}

  async handleWebhook(req: WebhookRequestBody): Promise<void> {
    const client = this.configService.createBotClient();
    const events: WebhookEvent[] = req.events;
    if (events == null) {
      return;
    }

    await Promise.all(
      events.map((event) => {
        if (event.type !== "message" || event.message.type !== "text") {
          return;
        }

        return client.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: "text",
              text: event.message.text,
            },
          ],
        });
      }),
    );
  }
}
