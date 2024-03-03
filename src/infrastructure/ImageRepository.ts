import { Repository } from "@/types/Repository";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import env from "@env/env";
import { v4 as uuidv4 } from "uuid";

export class ImageRepository implements Repository {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor() {
    this.s3Client = new S3Client({
      region: "ap-northeast-1",
      credentials: {
        accessKeyId: env.aws.ACCESS_KEY_ID,
        secretAccessKey: env.aws.SECRET_ACCESS_KEY,
      },
    });

    this.bucketName = env.aws.S3_BUCKET_NAME;
  }

  async store(data: Buffer) {
    const key = `${uuidv4()}.jpg`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: data,
        ContentType: "image/jpeg",
      }),
    );

    return key;
  }

  getUrl(key: string) {
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }
}
