import { Objects, Reacts, isDefined } from "@mjtdev/engine";
import type { DataObject } from "ai-worker-common";
import { isCacheValueEqual } from "./isCacheValueEqual";
// import { SWR_CACHE } from "./SWR_CACHE";
import { getCustomSwrState, updateCustomSwrState } from "./useCustomSwr";

export const mutateSwrCache = <T>(
  key: string,
  data?: Readonly<DataObject[]>
) => {
  const curData = getCustomSwrState().cache[key];
  if (isDefined(data) && isCacheValueEqual(curData?.data, data)) {
    return;
  }
  updateCustomSwrState((s) => {
    if (isDefined(data)) {
      s.cache[key] = { data };
    } else {
      // delete s.cache[key];
      s.cache = Objects.omit(s.cache, key);
    }
  });

  Reacts.dispatchCustomEvent(`swr:${key}`, {
    key,
    data,
  });
};
