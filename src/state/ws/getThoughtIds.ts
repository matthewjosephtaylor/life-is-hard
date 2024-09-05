// import { Arrays } from "@mjtdev/engine";
// import { Thoughts } from "ai-worker-common";
// import { DataObjectStates } from "../data-object/DataObjectStates";
// import { MAX_THOUGHTS } from "./setupDataObjectSubs";

// export const getThoughtIds = () => {
//   const contextId = DataObjectStates.getSingletonId("app-interface");
//   if (!contextId) {
//     return [];
//   }
//   const thoughtIds = Arrays.from(MAX_THOUGHTS).map((_, i) =>
//     Thoughts.getThoughtId({ contextId, index: i })
//   );
//   return thoughtIds;
// };

// export const useThoughtIds = () => {
//   const contextId = DataObjectStates.useSingletonId("app-interface");
//   if (!contextId) {
//     return [];
//   }
//   const thoughtIds = Arrays.from(MAX_THOUGHTS).map((_, i) =>
//     Thoughts.getThoughtId({ contextId, index: i })
//   );
//   return thoughtIds;
// };
