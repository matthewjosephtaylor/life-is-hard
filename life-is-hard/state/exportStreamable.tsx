import { isUndefined } from "@mjtdev/engine";

export function serializeValue<T>(value: T): T {
  if (isUndefined(value)) {
    return undefined as T;
  }
  if (ArrayBuffer.isView(value)) {
    return new Uint8Array(value.buffer) as T;
  }
  if (value instanceof ArrayBuffer) {
    return new Uint8Array(value) as T;
  }
  if (value instanceof AbortController) {
    console.log("abort controller", value);
    return undefined as T;
  }

  if (typeof value === "function") {
    return undefined as T;
  }

  if (Array.isArray(value)) {
    return value.map(serializeValue) as T;
  }
  if (typeof value === "object") {
    const result: { [key: string]: unknown } = {};
    for (const key in value) {
      result[key] = serializeValue(value[key]);
    }
    return result as T;
  }
  return value as T;
}
