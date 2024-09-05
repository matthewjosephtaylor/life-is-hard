import { Caches } from "@mjtdev/engine";
import type { IngestResult } from "ai-worker-common";


export const INGEST_RESULT_CACHE = Caches.create<
  Promise<IngestResult | undefined> | undefined
>("ingest-result");
