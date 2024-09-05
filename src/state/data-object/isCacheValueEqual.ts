import type { DataObject } from "ai-worker-common";
import stableStringify from "json-stable-stringify";


export const isCacheValueEqual = (
  a: Readonly<DataObject[]> | undefined,
  b: Readonly<DataObject[]> | undefined
) => {
  return stableStringify(a) === stableStringify(b);
};
