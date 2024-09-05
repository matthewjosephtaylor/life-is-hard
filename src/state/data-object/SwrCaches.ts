import { Arrays, Objects, isDefined, isUndefined } from "@mjtdev/engine";
import {
  SwrKeys,
  type AppObjectType,
  type DataObject,
  type SwrQueryObject,
} from "ai-worker-common";
import type { State } from "swr";
import { hasIntersection } from "../../common/hasIntersection";
import { mutateSwrCache } from "./mutateSwrCache";

import stableStringify from "json-stable-stringify";
import { getCustomSwrState } from "./useCustomSwr";
// import { getCustomSwrState } from "./useCustomSwr";
// import { updateSwrCache, getSwrCacheKeys, invalidateSwrCache, invalidateEntireSwrCache, invalidateSwrCacheByObjectType, mutateSwrCacheById } from "./SwrCaches2";

// TODO this is a big gun, we can be more precise
// export const invalidateSwrCacheByObjectType = (objectType: AppObjectType) => {
//   const { cache } = getCustomSwrState();
//   const entries = Objects.entries(cache);

//   // const keys = SWR_CACHE.keys()
//   // const hits = entries.filter(([swrKey, value]) => {
//   const hits = entries.filter(([swrKey, value]) => {
//     if (isUndefined(value)) {
//       return false;
//     }
//     const { data } = value;
//     if (isUndefined(data)) {
//       return false;
//     }
//     const { objectType: keyObjectType } = SwrKeys.keyToQueryObject(swrKey);
//     return keyObjectType === objectType;
//   });

//   for (const cacheEntry of hits) {
//     const [swrKey] = cacheEntry;
//     mutateSwrCache(swrKey);
//   }
// };

export const findRelatedSwrCacheEntries = (dataObjectId: string) => {
  // const entries = Arrays.from(
  //   (SWR_CACHE_PROVIDER as Map<string, State<DataObject[]>>).entries()
  // );

  const { cache } = getCustomSwrState();
  const entries = Objects.entries(cache);

  const related = entries.filter(([key, value]) => {
    if (isUndefined(value)) {
      return false;
    }
    const { data } = value;
    if (isUndefined(data)) {
      return false;
    }
    const found = data.find((obj) => obj.id === dataObjectId);
    return isDefined(found);
  });
  // TODO find related to the related?
  return related;
};

export type SwrCacheEntry = [string, State<DataObject[]>];

export const mutateSwrCacheById = (objectIds: string[]) => {
  const cacheEntries = objectIds.flatMap((objectId) =>
    findRelatedSwrCacheEntries(objectId)
  );
  for (const cacheEntry of cacheEntries) {
    const [swrKey, state = {}] = cacheEntry;
    const { data = [] } = state;
    const updated = data.filter((d) => !objectIds.includes(d.id));

    mutateSwrCache(swrKey, updated);

    // getSwrState().mutators[swrKey]?.(updated, { revalidate: false });
  }
};

export type SwrCustomCacheEntry = [
  string,
  undefined | State<Readonly<DataObject[]>>
];

export const updateRelatedSwrQueryCacheEntries = ({
  dataObjects,
  cacheEntries,
}: {
  cacheEntries: SwrCustomCacheEntry[];
  dataObjects: DataObject[];
}) => {
  // if (dataObjects.length === 0) {
  //   console.log(
  //     "SwrCaches:updateRelatedSwrQueryCacheEntries: ignoring empty dataObjects list",
  //     { cacheEntries, dataObjects }
  //   );
  //   return;
  // }
  for (const cacheEntry of cacheEntries) {
    const [swrKey, state = {}] = cacheEntry;
    // mutateSwrCache(swrKey);
    const { data = [] } = state;
    const acc = [...data];
    const hitIds: string[] = [];
    for (let i = 0; i < acc.length; i++) {
      const cur = acc[i];
      const hitObjIdx = dataObjects.findIndex((d) => d.id === cur.id);
      if (hitObjIdx === -1) {
        continue;
      }
      hitIds.push(cur.id);
      acc[i] = dataObjects[hitObjIdx];
    }
    // TODO HACK to test same entries
    if (
      stableStringify(hitIds) === stableStringify(dataObjects.map((d) => d.id))
    ) {
      mutateSwrCache(swrKey, acc);
      continue;
    }
    // TODO do we need to invalidate related if no data is bing updated?
    // console.log(
    //   `SwrCaches:updateRelatedSwrQueryCacheEntries: invalidating ${swrKey}`
    // );
    mutateSwrCache(swrKey);
  }
};

export const findMatchingSwrKeys = (sqo: SwrQueryObject) => {
  const { ids, key = "", nonce, objectType, parentId } = sqo;

  // const swrKeys = SWR_CACHE_PROVIDER.keys();
  const { cache } = getCustomSwrState();
  const swrKeys = Objects.keys(cache);
  // const swrKeys = SWR_CACHE_PROVIDER.keys();
  const result = new Set<string>();
  for (const cacheSwrKey of swrKeys) {
    const swrKeyQueryObject = SwrKeys.keyToQueryObject(cacheSwrKey);
    const {
      ids: cacheIds,
      key: cacheKey = "",
      nonce: cacheNonce,
      objectType: cacheObjectType,
      parentId: cacheParentId,
    } = swrKeyQueryObject;
    if (ids && cacheIds) {
      if (hasIntersection(ids, cacheIds)) {
        result.add(cacheSwrKey);
      }
    }
    if (
      objectType === cacheObjectType &&
      parentId === cacheParentId &&
      objectType === cacheObjectType &&
      key === cacheKey
    ) {
      result.add(cacheSwrKey);
    }
  }
  return Arrays.from(result);
};

const SWR_EMPTY_KEY = SwrKeys.swrQueryObjectToKey({});

export const invalidateEntireSwrCache = () => {
  console.log("SwrCaches:invalidateEntireSwrCache!");
  const keys = getSwrCacheKeys();
  keys.forEach((key) => mutateSwrCache(key));
};
export const invalidateSwrCache = (sqo: SwrQueryObject) => {
  const swrKeys = findMatchingSwrKeys(sqo);
  for (const swrKey of swrKeys) {
    mutateSwrCache(swrKey);
  }
};

export const getSwrCacheKeys = () => {
  const { cache } = getCustomSwrState();
  return Objects.keys(cache);
};

export const updateSwrCache = ({
  dataObjects,
  ...rest
}: SwrQueryObject & { dataObjects: DataObject[] }) => {
  const swrKey = SwrKeys.swrQueryObjectToKey(rest);

  if (swrKey !== SWR_EMPTY_KEY) {
    mutateSwrCache(swrKey, dataObjects);
  }

  // const related = []
  const related: SwrCustomCacheEntry[] = [];
  for (const dataObject of dataObjects) {
    const directlyRelatedEntries = findRelatedSwrCacheEntries(dataObject.id);
    for (const entry of directlyRelatedEntries) {
      const found = related.find((ce) => ce[0] === entry[0]);
      if (found) {
        continue;
      }
      related.push(entry);
    }
  }
  // const related: SwrCustomCacheEntry[] = dataObjects.flatMap((d) =>
  //   findRelatedSwrCacheEntries(d.id)
  // );

  updateRelatedSwrQueryCacheEntries({
    cacheEntries: related,
    dataObjects,
  });
};

export const SwrCaches = {
  mutateSwrCache,
  updateSwrCache,
  getKeys: getSwrCacheKeys,
  getSwrCacheKeys,
  invalidateSwrCache,
  invalidateEntireSwrCache,
  // invalidateSwrCacheByObjectType,
  invalidateSwrCacheById: mutateSwrCacheById,
};
