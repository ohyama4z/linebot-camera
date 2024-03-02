import env from "@/../env";
import { parse } from "@/CommandParser/CommandParser";
import { helpCommandHandler } from "@/Handler/HelpCommandHandler/HelpCommandHandler";
import { serve } from "@hono/node-server";
import { ClientConfig, WebhookRequestBody, messagingApi } from "@line/bot-sdk";
import { Hono } from "hono";

const app = new Hono();

app.get("*", (c) => c.text("Hello"));

const lineBotConfig: ClientConfig = {
  channelAccessToken: env.line.CHANNEL_ACCESS_TOKEN,
  channelSecret: env.line.CHANNEL_SECRET,
};
const lineBotClient = new messagingApi.MessagingApiClient(lineBotConfig);

app.get("/bot", async (c) => {
  const body: WebhookRequestBody = await c.req.json();

  const result = await Promise.all(
    body.events.reduce(
      (p, event) => {
        if (event.type !== "message" || event.message.type !== "text") {
          return p;
        }

        const command = parse(event.message.text);
        if (command === "HelpCommand") {
          return [...p, helpCommandHandler(event, lineBotClient)];
        }

        return p;
      },
      [] as Promise<messagingApi.ReplyMessageResponse>[],
    ),
  );

  return c.json(result);
});

const port = 3000;
console.log(`Server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port,
});
