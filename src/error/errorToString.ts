import { isDefined } from "@mjtdev/engine";

export const errorToString = async (error: unknown) => {
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return [error.message, error.stack].join("\n");
  }
  if (error instanceof Response) {
    try {
      const text = !error.bodyUsed ? await error.text() : "";
      return [error.url, error.status, error.statusText, text]
        .filter(isDefined)
        .join("\n");
    } catch (err2) {
      console.error(err2);
      return [error.status, error.statusText].join("\n");
    }
  }
  return JSON.stringify(error, undefined, 2);
};
