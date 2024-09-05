// import { AppMessages } from "ai-worker-common";
// import { SwrCache } from "./SwrCache";
// import { AppMessagesState } from "../ws/AppMessagesState";

// export const SWR_CACHE = new SwrCache((key) => {
//   console.log(`SWR_CACHE:--------------------- evict: ${key}`);
//   AppMessagesState.dispatch({
//     type: "dataObject:query:invalidate",
//     detail: key,
//   });
// });
