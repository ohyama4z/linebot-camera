const line = {
  CHANNEL_ACCESS_TOKEN: "",
  CHANNEL_SECRET: "",
};

const aws = {
  ACCESS_KEY_ID: "",
  SECRET_ACCESS_KEY: "",
  S3_BUCKET_NAME: "",
};

const command = {
  CAMERA_COMMAND: [""],
  DISCORD_TRANSFER_PREFIX: [""],
} as const;

const env = {
  line,
  command,
  aws,
} as const;

export default env;
