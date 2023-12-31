import { ClientConfig, messagingApi } from "@line/bot-sdk";
import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

@Injectable()
export class ConfigService {
  createBotClient() {
    const configService = new NestConfigService();
    const clinetConfig: ClientConfig = {
      channelAccessToken:
        configService.get<string>("LINE_CHANNEL_ACCESS_TOKEN") || "",
      channelSecret: configService.get<string>("LINE_CHANNEL_SECRET") || "",
    };
    return new messagingApi.MessagingApiClient(clinetConfig);
  }
}
