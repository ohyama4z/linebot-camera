import { MessageEvent } from "@line/bot-sdk";
import { MessagingApiClient } from "@line/bot-sdk/dist/messaging-api/api";
import {
  PushMessageResponse,
  ReplyMessageResponse,
} from "@line/bot-sdk/dist/messaging-api/api";

export type HandlerResponse = ReplyMessageResponse | PushMessageResponse;

export type Handler<T extends unknown[] = []> = (
  event: MessageEvent,
  client: MessagingApiClient,
  ...args: T
) => Promise<HandlerResponse>;
