import { Camera } from "@/src/model/Camera/Camera";
import { CameraCommandOption } from "@/src/types/Command";
import { Handler } from "@/src/types/Handler";
import { Repository } from "@/src/types/Repository";
import { extract } from "./ImageExtractor";

export const cameraCommandHandler: Handler<
  [Camera, Repository, CameraCommandOption]
> = async (event, client, camera, imageRepository, option) => {
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

  if (option === "Full") {
    const key = await imageRepository.store(image);
    const url = imageRepository.getUrl(key);

    return await client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        { type: "image", originalContentUrl: url, previewImageUrl: url },
      ],
    });
  }

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
