import { createState } from "@mjtdev/engine";

export const [useServiceStatus, updateServiceStatus, getServiceStatus] =
  createState({
    services: {
      llm: "ready",
      tts: "ready",
      ws: "ready",
      vector: "ready",
      extract: "ready",
      imagegen: "ready",
    } as Record<
      "tts" | "llm" | "ws" | "vector" | "extract" | "imagegen",
      "ready" | "busy" | "error"
    >,
  });
