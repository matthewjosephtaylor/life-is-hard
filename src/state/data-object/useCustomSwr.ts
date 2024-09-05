import { Reacts, createState, isDefined } from "@mjtdev/engine";
import type { DataObject } from "ai-worker-common";
import { useEffect, useState } from "react";
import { type State } from "swr";
import { AppMessagesState } from "../ws/AppMessagesState";
import { SwrCaches } from "./SwrCaches";
import { getSwrFetcherState, updateSwrFetcherState } from "./SwrFetchers";
import { mutateSwrCache } from "./mutateSwrCache";
// import { SWR_CACHE } from "./SWR_CACHE";

export const [useCustomSwrState, updateCustomSwrState, getCustomSwrState] =
  createState({
    cache: {} as Record<string, undefined | State<Readonly<DataObject[]>>>,
    referenceCounts: {} as Record<string, undefined | number>,
  });

export const useCustomSwr = (
  key: string,
  fetcher: (key: string) => Promise<Readonly<DataObject[]>>
): { data?: Readonly<DataObject[]> | undefined } => {
  const [result, setResult] = useState<State<Readonly<DataObject[]>>>({
    data: undefined,
  });

  Reacts.useCustomEventListener(
    `swr:${key}`,
    (evt) => {
      let ignore = false;
      const { key, data } = evt.detail as { key: string; data: DataObject[] };
      if (isDefined(data)) {
        setResult({ data });
        return;
      }
      if (isDefined(getSwrFetcherState().fetchers[key])) {
        updateSwrFetcherState((s) => {
          s.fetcherInterest[key] = (s.fetcherInterest[key] ?? 0) + 1;
        });
        return;
      }
      fetcher(key)
        .then((resp) => {
          if (ignore) {
            return;
          }
          mutateSwrCache(key, resp);
        })
        .catch((error) => {
          console.error(`Fetch failed for: ${key}`, error);
        });
      return () => {
        ignore = true;
      };
    },
    {
      deps: [key, fetcher],
    }
  );

  useEffect(() => {
    const disposer = () => {
      updateCustomSwrState((s) => {
        const refCount = s.referenceCounts[key] ?? 0;
        s.referenceCounts[key] = refCount - 1;
      });
      const refCount = getCustomSwrState().referenceCounts[key] ?? 0;
      // Asserts.assert(refCount >= 0);
      if (refCount < 0) {
        console.warn(`useCustomSwr: negative referenceCounts for key`, key);
      }
      if (refCount <= 0) {
        AppMessagesState.dispatch({
          type: "dataObject:query:invalidate",
          detail: key,
        });
        SwrCaches.mutateSwrCache(key);
      }
    };
    const cached = getCustomSwrState().cache[key];
    updateCustomSwrState((s) => {
      const refCount = s.referenceCounts[key] ?? 0;
      s.referenceCounts[key] = refCount + 1;
    });
    // const cached = SWR_CACHE.get(key);
    if (isDefined(cached)) {
      setResult(cached);
      return disposer;
    }
    fetcher(key)
      .then((resp) => {
        mutateSwrCache(key, resp);
      })
      .catch((error) => {
        console.error(`Fetch failed for: ${key}`, error);
      });

    return disposer;
  }, [key, fetcher]);

  return result;
};
