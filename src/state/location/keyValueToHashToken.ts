import { Bytes } from "@mjtdev/engine";


export const keyValueToHashToken = (key: string, value: string): string => {
  const str = JSON.stringify({ [key]: value });
  return Bytes.toBase64(str);
};
