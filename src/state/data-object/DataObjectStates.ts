import {
  Asserts,
  createState,
  isDefined,
  isUndefined,
  toMany,
} from "@mjtdev/engine";
import type {
  AccessInfo,
  AppMessage,
  AppMessageMap,
  AppObject,
  AppObjectType,
  DataLink,
  DataObject,
} from "ai-worker-common";
import { AppObjects, SwrKeys } from "ai-worker-common";
import type { Draft } from "immer";
import { produce } from "immer";
import { AppMessagesState } from "../ws/AppMessagesState";
import { activateLinkInChildren } from "./activateLinkInChildren";

const FIND_LINK_KEYS: string[] = [];
const FIND_ID_KEYS: string[] = [];

import { Returns } from "./Returns";
import { SwrCaches } from "./SwrCaches";
import {
  getSwrFetcherState,
  swrDataObjectChildrenFetcher,
  swrDataObjectsByIdFetcher,
  swrDataObjectsByTypeFetcher,
} from "./SwrFetchers";
import { mutateSwrCache } from "./mutateSwrCache";
import {
  getCustomSwrState,
  //  getCustomSwrState,
  useCustomSwr,
} from "./useCustomSwr";
// import { SWR_CACHE } from "./SWR_CACHE";

// const useSWR = useCustomSwr;
const [useObjectsState, updateObjectsState, getObjectsState] = createState({
  // objects: {} as Record<string, DataObject>,
  accessInfos: {} as Record<string, AccessInfo>,
  // links: {} as Record<string, DataLink>,
});

export const useDataObject = <T extends DataObject>(
  id: string | undefined,
  nonce?: string
): T | undefined => {
  const swrKey = SwrKeys.swrQueryObjectToKey({
    ids: [id].filter(isDefined),
    nonce,
  });
  const { data } = useCustomSwr(swrKey, swrDataObjectsByIdFetcher);

  if (isUndefined(data)) {
    // console.log(`useDataObject: no data for: ${id} ${swrKey}`);
    return undefined;
  }
  Asserts.assert(Array.isArray(data));
  return data[0] as T;
};

export const useAccessInfo = (
  id: string | undefined
): AccessInfo | undefined => {
  const { accessInfos } = useObjectsState();
  if (!id) {
    return undefined;
  }
  return accessInfos[id];
};
export const getAccessInfo = (
  objectId: string
): Promise<AccessInfo | undefined> => {
  return new Promise<AccessInfo | undefined>((resolve, reject) => {
    const returnId = Returns.addReturnListener<AccessInfo | undefined>({
      onReturn: (data) => {
        resolve(data);
      },
    });
    AppMessagesState.dispatch({
      type: "dataObject:get:accessInfo",
      detail: { objectId, returnId },
    });
  });
};

export const useDataObjectsById = <T extends AppObjectType>(
  ids: string[]
): Readonly<AppObject<T>>[] => {
  const swrKey = SwrKeys.swrQueryObjectToKey({ ids });
  const { data = [] } = useCustomSwr(swrKey, swrDataObjectsByIdFetcher);
  return data as AppObject<T>[];
};

export const useDataObjectsByType = <T extends AppObjectType>(
  objectType: T
): Readonly<AppObject<T>>[] => {
  const swrKey = SwrKeys.swrQueryObjectToKey({ objectType });
  const { data = [] } = useCustomSwr(swrKey, swrDataObjectsByTypeFetcher);
  return data as AppObject<T>[];
};

export const useDataObjectIdsByType = <T extends AppObjectType>(
  objectType: T
): string[] => {
  return useDataObjectsByType<T>(objectType).map((o) => o.id);
};

export const getDataObjects = async <T extends AppObjectType>(
  objectType: T
): Promise<Readonly<AppObject<T>[]>> => {
  const swrKey = SwrKeys.swrQueryObjectToKey({ objectType });
  return swrDataObjectsByTypeFetcher(swrKey);
};

export const getDataObject = async <T extends DataObject>(
  id: string | undefined
): Promise<T | undefined> => {
  if (!id) {
    return undefined;
  }

  const swrKey = SwrKeys.swrQueryObjectToKey({ ids: [id].filter(isDefined) });
  const cached = getCustomSwrState().cache[swrKey];
  if (isDefined(cached)) {
    // console.log(`using cached: ${cached.data?.[0].id}`);
    return cached.data?.[0] as T | undefined;
  }
  const objects = await swrDataObjectsByIdFetcher(swrKey);
  mutateSwrCache(swrKey, objects);
  return objects[0] as T;
};

export const forgetDataObject = (dataObjectIdOrIds: string | string[]) => {
  console.log(`forgetDataObject: ${dataObjectIdOrIds}`);
  SwrCaches.invalidateSwrCacheById(toMany(dataObjectIdOrIds));
  // console.log(`TBD remove forgetDataObject: ${dataObjectIdOrIds}`);

  // const dataObjectIds = toMany(dataObjectIdOrIds);
  // dataObjectIds.forEach((id) => {
  //   updateObjectsState((s) => {
  //     delete s.objects[id];
  //   });
  //   AppEvents.dispatchEvent("dataObjectUpdate", { id });
  // });
};

export const forgetDataLink = ({
  childId,
  key,
  objectType,
  parentId,
}: Partial<DataLink>) => {
  // if (isDefined(childId)) {
  //   SwrCaches.invalidateSwrCacheById(toMany(childId));
  // }
  const ids = [childId, parentId].filter(isDefined);
  SwrCaches.invalidateSwrCache({
    key,
    objectType,
    parentId,
    ids: ids.length > 0 ? ids : undefined,
  });
  // if (isDefined(objectType)) {
  //   SwrCaches.invalidateSwrCacheByObjectType(objectType);
  // } else {
  //   console.warn("No objectType on link forget", {
  //     childId,
  //     key,
  //     objectType,
  //     parentId,
  //   });
  // }
  // if (isDefined(parentId)) {
  // }
  // console.log("TBD complete forgetDataLink");
  // const { links } = getObjectsState();
  // const deletes = Objects.entries(links).filter((entry) => {
  //   const [linkKey, link] = entry;
  //   if (childId && link.childId !== childId) {
  //     return false;
  //   }
  //   if (key && link.key !== key) {
  //     return false;
  //   }
  //   if (objectType && link.objectType !== objectType) {
  //     return false;
  //   }
  //   if (parentId && link.parentId !== parentId) {
  //     return false;
  //   }
  //   return true;
  // });
  // updateObjectsState((s) => {
  //   deletes.forEach((deleteEntry) => {
  //     delete s.links[deleteEntry[0]];
  //   });
  // });
  // AppEvents.dispatchEvent("dataLinksUpdated");
};

export const deleteDataObject = async (dataObjectId: string) => {
  await AppMessagesState.dispatch({
    type: "dataObject:delete",
    detail: dataObjectId,
  });
  await AppMessagesState.dispatch({
    type: "dataLink:delete",
    detail: {
      childId: dataObjectId,
    },
  });

  SwrCaches.invalidateSwrCacheById([dataObjectId]);
};

// export const setDataLink = (dataLink: DataLink) => {
//   // invalidate();
//   // console.log("TBD remove setDataLink");
//   // const dataLinkKey = toLinkKey(dataLink);
//   // updateObjectsState((s) => {
//   //   s.links[dataLinkKey] = dataLink;
//   // });
//   // const { objects } = getObjectsState();
//   // if (!objects[dataLink.parentId]) {
//   //   findMissingObject(dataLink.parentId);
//   // }
//   // if (!objects[dataLink.childId]) {
//   //   findMissingObject(dataLink.childId);
//   // }
// };

export const upsertDataLink = (dataLink: DataLink) => {
  return AppMessagesState.dispatch({
    type: "dataLink:upsert",
    detail: dataLink,
  });
};

export const deleteDataLink = (dataLink: Partial<DataLink>) => {
  return AppMessagesState.dispatch({
    type: "dataLink:delete",
    detail: dataLink,
  });
};

export const setAccessInfo = (
  dataObjectAccessInfo: DataObject & AccessInfo
) => {
  updateObjectsState((s) => {
    s.accessInfos[dataObjectAccessInfo.id] = dataObjectAccessInfo;
  });
};

export const setDataObjectChildren = ({
  children,
  key = "",
  objectType,
  parentId,
}: { nonce: string } & AppMessageMap["dataObject:updateChildren"]) => {
  SwrCaches.updateSwrCache({
    dataObjects: children,
    key,
    objectType,
    parentId,
  });
  // updateDataObjectsChildrenSwrCache({ children, key, objectType, parentId });
};

export const setDataObject = (dataObject: AppObject) => {
  // console.log(
  //   `setObject: ${dataObject.id} hash: ${Strings.hashFnv32a({
  //     str: JSON.stringify(dataObject),
  //   })}`,
  //   dataObject
  // );
  SwrCaches.updateSwrCache({ dataObjects: [dataObject] });
};

// export const mutateAccessInfo = (
//   dataObjectId: string,
//   mutator: (cur: AccessInfo) => void
// ) => {
//   const from = getAccessInfo(dataObjectId);
//   if (!from) {
//     return;
//   }

//   const updated = produce(from, (a) => {
//     mutator(a);
//   });

//   if (!updated) {
//     return;
//   }
//   setAccessInfo({ id: dataObjectId, ...updated });

//   AppMessagesState.dispatch({
//     type: "dataObject:update:accessInfo",
//     detail: { id: dataObjectId, ...updated },
//   });
// };

export const updateDataObject = async <T extends DataObject>(
  dataObjectId: string,
  updater: (cur: T) => T
) => {
  const cur = await getDataObject<T>(dataObjectId);
  if (!cur) {
    return;
  }
  const updated = updater(cur);
  if (!updated) {
    return;
  }
  AppMessagesState.dispatch({
    type: "dataObject:update",
    detail: updated,
  });
  // SwrCaches.updateSwrCache({ dataObjects: [updated] });

  return updated;
};

export const mutateDataObject = async <T extends DataObject>(
  dataObjectId: string,
  mutator: (cur: Draft<T>) => void
) => {
  const from = await getDataObject<T>(dataObjectId);
  if (!from) {
    return;
  }

  const updated = produce<T>(from, (a) => {
    mutator(a);
  });
  // setDataObject(updated);

  if (!updated) {
    return;
  }

  AppMessagesState.dispatch({
    type: "dataObject:update",
    detail: updated,
  });
  // SwrCaches.updateSwrCache({ dataObjects: [updated] });
};

export const useChildDataObjectIds = <T extends AppObjectType = AppObjectType>(
  parentId: string | undefined,
  objectType: T,
  key = "",
  nonce = ""
): string[] => {
  return useChildDataObjects(parentId, objectType, key, nonce).map((o) => o.id);
};

export const getChildDataObjectIds = async <
  T extends AppObjectType = AppObjectType
>(
  parentId: string | undefined,
  objectType: T,
  key?: string
): Promise<string[]> => {
  return (await getChildDataObjects(parentId, objectType, key)).map(
    (o) => o.id
  );
};

export const useChildDataObjects = <T extends AppObjectType = AppObjectType>(
  parentId: string | undefined,
  objectType: T,
  key: string = "",
  nonce: string = ""
): Readonly<AppObject<T>[]> => {
  const swrKey = SwrKeys.swrQueryObjectToKey({
    parentId,
    objectType,
    key,
    nonce,
  });

  const { data = [] } = useCustomSwr(swrKey, swrDataObjectChildrenFetcher);
  return data;
};

export const useChildDataObjectsLoading = <
  T extends AppObjectType = AppObjectType
>(
  parentId: string | undefined,
  objectType: T,
  key: string = "",
  nonce: string = ""
): Readonly<AppObject<T>[] | undefined> => {
  const swrKey = SwrKeys.swrQueryObjectToKey({
    parentId,
    objectType,
    key,
    nonce,
  });

  const { data } = useCustomSwr(swrKey, swrDataObjectChildrenFetcher);
  return data;
};

export const getChildDataObjects = async <
  T extends AppObjectType = AppObjectType
>(
  parentId: string | undefined,
  objectType: T,
  key: string = "",
  nonce: string = ""
): Promise<Readonly<AppObject<T>[]>> => {
  const swrKey = SwrKeys.swrQueryObjectToKey({
    parentId,
    objectType,
    key,
    nonce,
  });
  const cached = getCustomSwrState().cache[swrKey];
  if (isDefined(cached)) {
    return cached.data as AppObject<T>[];
  }
  const objects = await swrDataObjectChildrenFetcher(swrKey);
  mutateSwrCache(swrKey, objects);
  return objects;
};

export const findDataObject = (dataObjectId: string | string[]) => {
  console.log("TBD remove findDataObject");
  // AppMessagesState.dispatch({
  //   type: "dataObject:find",
  //   detail: dataObjectId,
  // });
};

export const findAllDataObjectsByObjectType = (
  objectType: AppObjectType | AppObjectType[]
) => {
  AppMessagesState.dispatch({
    type: "dataObject:findAllByObjectType",
    detail: objectType,
  });
};

export const findChildDataObjects = (
  parentId: string | undefined,
  objectType?: AppObjectType,
  key = ""
) => {
  if (!parentId) {
    console.log("findChildDataObjects: refusing, no parent");
    return;
  }
  AppMessagesState.dispatch({
    type: "dataLink:find",
    detail: {
      parentId,
      objectType,
      key,
    },
  });
};

export const upsertDataObject = <T extends AppObjectType>({
  objectType,
  draft,
  parentId,
  key = "",
}: {
  parentId?: string;
  objectType: T;
  key?: string;
  draft?: Partial<AppObject<T>>;
}) => {
  const dataObject = AppObjects.create(objectType, draft);

  const updateSubMessages: AppMessage[] = [
    { type: "dataObject:sub", detail: dataObject.id },
    {
      type: "dataObject:update",
      detail: dataObject,
    },
  ];

  if (parentId) {
    const linkMessage: AppMessage<"dataLink:upsert"> = {
      type: "dataLink:upsert",
      detail: {
        key,
        childId: dataObject.id,
        parentId: parentId,
        objectType,
      },
    };

    // addDataObjectSubscriptions([dataObject.id]);
    AppMessagesState.dispatchAll([...updateSubMessages, linkMessage]);
    SwrCaches.updateSwrCache({ dataObjects: [dataObject] });
    return dataObject;
  }

  // addDataObjectSubscriptions([dataObject.id]);
  AppMessagesState.dispatchAll(updateSubMessages);
  SwrCaches.updateSwrCache({ dataObjects: [dataObject] });

  return dataObject;
};

export const resetDataObjectStates = () => {
  invalidate();
};

export const invalidate = () => {
  console.log("-------TBD invalidate ENTIRE SWR------");
};

export const dumpDataObjects = () => {
  // console.log("---FIND_KEYS---");
  // console.log(FIND_LINK_KEYS);
  // console.log("---LINKS---");
  // console.log(getObjectsState());
  console.log("---OBJECTS---");
  console.log(getObjectsState());
  console.log("---SWR CACHE---");
  console.log("---keys---");
  console.log(Object.keys(getCustomSwrState().cache));
  console.log("---chache---");
  console.log(getCustomSwrState().cache);
  console.log("---fetchers---");
  console.log(getSwrFetcherState().fetchers);
};

export const DataObjectStates = {
  resetDataObjectStates,
  upsertDataObject,
  useChildDataObjectIds,
  useChildDataObjects,
  getChildDataObjects,
  useChildDataObjectsLoading,
  getChildDataObjectIds,
  findDataObject,
  findChildDataObjects,
  useDataObject,
  useDataObjectsByType,
  useDataObjectsById,
  useDataObjectIdsByType,
  getDataObjects,
  forgetDataObject,
  forgetDataLink,
  getDataObject,
  updateDataObject,
  mutateDataObject,
  deleteDataObject,
  upsertDataLink,
  deleteDataLink,
  // useSingletonId,
  // getSingletonId,
  useAccessInfo,
  getAccessInfo,
  // mutateAccessInfo,

  activateLinkInChildren,
  findAllDataObjectsByObjectType,
  // getAllDataObjects,
  setDataObject,
  setDataObjectChildren,
  // setDataLink,
  setAccessInfo,
  dumpDataObjects,
  // invalidateDataObject,
  invalidate,
};
