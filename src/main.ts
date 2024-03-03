import env from "@/../env";
import { parse } from "@/CommandParser/CommandParser";
import { helpCommandHandler } from "@/Handler/HelpCommandHandler/HelpCommandHandler";
import { serve } from "@hono/node-server";
import { ClientConfig, WebhookRequestBody, messagingApi } from "@line/bot-sdk";
import { Hono } from "hono";
import { HandlerResponse } from "./types/Handler";

const app = new Hono();

app.get("*", (c) => c.text("Hello"));

const lineBotConfig: ClientConfig = {
  channelAccessToken: env.line.CHANNEL_ACCESS_TOKEN,
  channelSecret: env.line.CHANNEL_SECRET,
};
const lineBotClient = new messagingApi.MessagingApiClient(lineBotConfig);

app.get("/bot", async (c) => {
  const body: WebhookRequestBody = await c.req.json();
  await Promise.all(
    body.events.reduce<Promise<HandlerResponse>[]>((acc, event) => {
      if (event.type !== "message" || event.message.type !== "text") {
        return acc;
      }

      const command = parse(event.message.text);
      if (command === null) {
        return acc;
      }

      if (command === "HelpCommand") {
        return [...acc, helpCommandHandler(event, lineBotClient)];
      }

      if (command === "CameraCommand") {
        return acc;
      }

      if (command === "DiscordTransferCommand") {
        return acc;
      }

      throw new Error("Unknown command");
    }, []),
  );

  return c.text("OK");
});

const port = 3000;
console.log(`Server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port,
});
