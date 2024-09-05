// import { Objects, isDefined } from "@mjtdev/engine";
// import {
//   DataObjectStates,
//   // getDataObjectsState,
// } from "../data-object/DataObjectStates";
// import { getUserState } from "../user/UserState";
// import { getThoughtIds } from "./getThoughtIds";
// import { subscribeToDataObjects } from "./subscribeToDataObjects";
// import { AppMessagesState } from "./AppMessagesState";

// export const MAX_THOUGHTS = 50;

// /** @deprecated */
// export const setupDataObjectSubs = () => {
//   // const { objects } = getDataObjectsState();
//   const { id: userId } = getUserState();
//   const objectIds = DataObjectStates.getAllDataObjects().map((o) => o.id);

//   // subscribeToDataObjects([...Objects.keys(objects), userId].filter(isDefined));
//   subscribeToDataObjects([...objectIds, userId].filter(isDefined));

//   setTimeout(() => {
//     const thoughtIds = getThoughtIds();
//     if (thoughtIds.length === 0) {
//       console.log("No thought IDS!");
//     }

//     subscribeToDataObjects(thoughtIds.filter(isDefined));
//   }, 1000);
// };
