import { Bytes, Objects, safe } from "@mjtdev/engine";
import type { AppHashParamKey } from "./AppHashParamKey";

export const hashTokenToKeyValue = (
  token: string
): [AppHashParamKey, string] | undefined => {
  return safe(() => {
    const ab = Bytes.base64ToArrayBuffer(token);
    const utf8 = Bytes.arrayBufferToUtf8(ab);
    const parsed = JSON.parse(utf8) as Record<AppHashParamKey, string>;
    if (!parsed) {
      return undefined;
    }
    const entry = Objects.entries(parsed)[0];
    if (!entry) {
      return undefined;
    }
    return entry;
  });
};
