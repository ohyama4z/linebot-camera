import { MessageEvent } from "@line/bot-sdk";
import { MessagingApiClient } from "@line/bot-sdk/dist/messaging-api/api";
import {
  PushMessageResponse,
  ReplyMessageResponse,
} from "@line/bot-sdk/dist/messaging-api/api";

export type HandlerResponse = ReplyMessageResponse | PushMessageResponse;

export type Handler = (
  event: MessageEvent,
  client: MessagingApiClient,
) => Promise<HandlerResponse>;
