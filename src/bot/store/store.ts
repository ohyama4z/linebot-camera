import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class Store {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  constructor() {
    const configService = new ConfigService();
    this.s3Client = new S3Client({
      region: "ap-northeast-1",
      credentials: {
        accessKeyId: configService.get<string>("AWS_ACCESS_KEY_ID") || "",
        secretAccessKey:
          configService.get<string>("AWS_SECRET_ACCESS_KEY") || "",
      },
    });
    this.bucketName = configService.get<string>("AWS_S3_BUCKET_NAME") || "";
  }

  private async upload(data: Buffer): Promise<string> {
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

  // private async read(key: string): Promise<void> {
  //   await this.s3Client.send(
  //     new GetObjectCommand({ Bucket: this.bucketName, Key: key }),
  //   );
  // }

  async getUrl(data: Buffer): Promise<string> {
    const key = await this.upload(data);
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }
}
