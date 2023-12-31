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

    for (const event of events) {
      if (event.type === "message") {
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
