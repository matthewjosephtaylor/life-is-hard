import type { AppService } from "ai-worker-common";

export const SERVICE_COLUMNS: (keyof AppService)[] = [
  "type",
  "host",
  "domain",
  "enabled",
  "count",
];


