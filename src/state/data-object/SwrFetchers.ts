import { createState, isDefined, isUndefined, toMany } from "@mjtdev/engine";
import { SwrKeys, type DataObject } from "ai-worker-common";
import { AppMessagesState } from "../ws/AppMessagesState";
import { Returns } from "./Returns";

export const [useSwrFetcherState, updateSwrFetcherState, getSwrFetcherState] =
  createState({
    fetchers: {} as Record<string, undefined | Promise<Readonly<DataObject[]>>>,
    fetcherInterest: {} as Record<string, undefined | number>,
  });

export const swrDataObjectsByIdFetcher = (
  swrKey: string,
  options: Partial<{ refetchOnStale: boolean }> = {}
): Promise<Readonly<DataObject[]>> => {
  const timeoutError = new Error(`Timeout getting: ${swrKey}`);
  const cached = getSwrFetcherState().fetchers[swrKey];
  if (isDefined(cached)) {
    // console.log(`USING CACHED FETCHER FOR: ${swrKey}`);
    updateSwrFetcherState((s) => {
      s.fetcherInterest[swrKey] = (s.fetcherInterest[swrKey] ?? 0) + 1;
    });
    return cached;
  }

  const promise = new Promise<Readonly<DataObject[]>>((resolve, reject) => {
    const returnId = Returns.addReturnListener<DataObject[]>({
      onReturn: (objects) => {
        const { refetchOnStale = true } = options;
        if (
          refetchOnStale &&
          (getSwrFetcherState().fetcherInterest[swrKey] ?? 0) > 0
        ) {
          // console.log(`refetching stale: ${swrKey}`);
          swrDataObjectsByIdFetcher(swrKey, { refetchOnStale: false });
        }

        updateSwrFetcherState((s) => {
          s.fetchers[swrKey] = undefined;
          s.fetcherInterest[swrKey] = undefined;
        });

        resolve(Object.freeze(toMany(objects)));
      },
      onTimeout: () => {
        updateSwrFetcherState((s) => {
          s.fetchers[swrKey] = undefined;
          s.fetcherInterest[swrKey] = undefined;
        });
        reject(timeoutError);
      },
    });

    const { ids } = SwrKeys.keyToQueryObject(swrKey);

    if (isUndefined(ids)) {
      // console.warn(`No ids in swrKey: ${swrKey}`);
      return;
    }
    // console.log("swrDataObjectsByIdFetcher: fetching", swrKey);
    AppMessagesState.dispatch({
      type: "dataObject:query",
      detail: { query: swrKey, returnId },
    });
  });
  updateSwrFetcherState((s) => {
    s.fetchers[swrKey] = promise;
  });
  return promise;
};

export const swrDataObjectsByTypeFetcher = (
  swrKey: string,
  options: Partial<{ refetchOnStale: false }> = {}
): Promise<Readonly<DataObject[]>> => {
  const timeoutError = new Error(`Timeout getting: ${swrKey}`);
  const cached = getSwrFetcherState().fetchers[swrKey];
  if (isDefined(cached)) {
    // console.log(`USING CACHED FETCHER FOR: ${swrKey}`);
    updateSwrFetcherState((s) => {
      s.fetcherInterest[swrKey] = (s.fetcherInterest[swrKey] ?? 0) + 1;
    });
    return cached;
  }
  const promise = new Promise<Readonly<DataObject[]>>((resolve, reject) => {
    const returnId = Returns.addReturnListener<DataObject[]>({
      onReturn: (objects) => {
        updateSwrFetcherState((s) => {
          s.fetchers[swrKey] = undefined;
          s.fetcherInterest[swrKey] = undefined;
        });

        const { refetchOnStale = true } = options;
        if (
          refetchOnStale &&
          (getSwrFetcherState().fetcherInterest[swrKey] ?? 0) > 0
        ) {
          console.log(`refetching stale: ${swrKey}`);
          swrDataObjectsByTypeFetcher(swrKey, { refetchOnStale: false });
        }

        resolve(Object.freeze(objects));
      },
      onTimeout: () => {
        updateSwrFetcherState((s) => {
          s.fetchers[swrKey] = undefined;
          s.fetcherInterest[swrKey] = undefined;
        });
        reject(timeoutError);
      },
    });
    const { objectType } = SwrKeys.keyToQueryObject(swrKey);
    if (isUndefined(objectType)) {
      // console.warn(`No objectType in swrKey: ${swrKey}`);
      return;
    }

    // console.log("swrDataObjectsByTypeFetcher: fetching", swrKey);
    AppMessagesState.dispatch({
      type: "dataObject:query",
      detail: { query: swrKey, returnId },
    });
  });
  updateSwrFetcherState((s) => {
    s.fetchers[swrKey] = promise;
  });
  return promise;
};

export const swrDataObjectChildrenFetcher = (
  swrKey: string,
  options: Partial<{ refetchOnStale: false }> = {}
): Promise<Readonly<DataObject[]>> => {
  // console.log(`swrDataObjectChildrenFetcher: start ${swrKey}`);
  const timeoutError = new Error(`Timeout getting: ${swrKey}`);
  // const prePromiseError = new Error(
  //   `swrDataObjectChildrenFetcher: Error for: ${swrKey}`
  // );
  const cached = getSwrFetcherState().fetchers[swrKey];
  if (isDefined(cached)) {
    // console.log(`USING CACHED FETCHER FOR: ${swrKey}`);
    updateSwrFetcherState((s) => {
      s.fetcherInterest[swrKey] = (s.fetcherInterest[swrKey] ?? 0) + 1;
    });
    return cached;
  }
  const { ids, key, nonce, objectType, parentId } =
    SwrKeys.keyToQueryObject(swrKey);
  if (isUndefined(parentId) || isUndefined(objectType)) {
    // console.log("swrDataObjectsByIdFetcher: short-circuting query", swrKey);
    return Promise.resolve(Object.freeze([]));
  }
  const promise = new Promise<Readonly<DataObject[]>>((resolve, reject) => {
    const returnId = Returns.addReturnListener<DataObject[]>({
      onReturn: (objects) => {
        // console.log(
        //   `swrDataObjectChildrenFetcher: fetched: ${swrKey}`,
        //   objects
        // );
        updateSwrFetcherState((s) => {
          s.fetchers[swrKey] = undefined;
          s.fetcherInterest[swrKey] = undefined;
        });

        const { refetchOnStale = true } = options;
        if (
          refetchOnStale &&
          (getSwrFetcherState().fetcherInterest[swrKey] ?? 0) > 0
        ) {
          // console.log(`refetching stale: ${swrKey}`);
          swrDataObjectChildrenFetcher(swrKey, { refetchOnStale: false });
        }

        resolve(Object.freeze(objects));
      },
      onTimeout: () => {
        updateSwrFetcherState((s) => {
          s.fetchers[swrKey] = undefined;
          s.fetcherInterest[swrKey] = undefined;
        });
        reject(timeoutError);
      },
    });
    // console.log(`swrDataObjectChildrenFetcher: fetching: ${swrKey}`);
    AppMessagesState.dispatch({
      type: "dataObject:query",
      detail: { query: swrKey, returnId },
    });
  });
  updateSwrFetcherState((s) => {
    s.fetchers[swrKey] = promise;
  });
  return promise;
};

export const SwrFetchers = {
  swrDataObjectChildrenFetcher,
  swrDataObjectsByTypeFetcher,
  swrDataObjectsByIdFetcher,
};
