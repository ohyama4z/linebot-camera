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

const camera = {
  // カメラの解像度
  WIDTH: 1920,
  HEIGHT: 1080,

  // 画像の切り抜き範囲
  extractOption: {
    WIDTH: 1920,
    HEIGHT: 1080,
    X: 0,
    Y: 0,
  },

  // 切り抜き後の画像のリサイズ設定
  zoomOption: {
    WIDTH: 1920,
    HEIGHT: 1080,
  },
};

const env = {
  line,
  command,
  camera,
  aws,
} as const;

export default env;
