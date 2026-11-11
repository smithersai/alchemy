import { gunzipSync } from "node:zlib";
export const gunzipBase64Text = (data: string): string =>
  gunzipSync(Buffer.from(data, "base64")).toString();
