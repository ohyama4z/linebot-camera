import { Camera } from "@/model/Camera/Camera";
import { Handler } from "@/types/Handler";
import { Repository } from "@/types/Repository";
import { extract } from "./ImageExtractor";

export const cameraCommandHandler: Handler<[Camera, Repository]> = async (
  event,
  client,
  camera,
  imageRepository,
) => {
  let to = "";
  if (event.source.type === "user") {
    to = event.source.userId;
  } else if (event.source.type === "group") {
    to = event.source.groupId;
  } else if (event.source.type === "room") {
    to = event.source.roomId;
  }

  await client.pushMessage({
    to,
    messages: [{ type: "text", text: "ホワイトボードを撮影中..." }],
  });

  const image = await camera.capture();
  const extracted = await extract(image);
  const key = await imageRepository.store(extracted);
  const url = imageRepository.getUrl(key);

  return await client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      { type: "image", originalContentUrl: url, previewImageUrl: url },
    ],
  });
};
