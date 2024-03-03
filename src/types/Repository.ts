export interface Repository {
  store: (value: Buffer) => Promise<string>; // 保存したファイルのkeyを返す
  getUrl: (key: string) => string;
}
