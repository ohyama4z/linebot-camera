import { WebhookRequestBody } from "@line/bot-sdk";
import { Body, Controller, Post } from "@nestjs/common";
import { BotService } from "./bot.service";
@Controller("bot")
export class BotController {
  constructor(private botService: BotService) {}

  @Post()
  async handler(@Body() req: WebhookRequestBody): Promise<void> {
    await this.botService.handleWebhook(req);
  }
}
