import { Module } from "@nestjs/common";
import { BotController } from "./bot.controller";
import { BotService } from "./bot.service";
import { CameraService } from "./camera/camera.service";
import { ConfigService } from "./config/config.service";

@Module({
  controllers: [BotController],
  providers: [BotService, ConfigService, CameraService],
})
export class BotModule {}
