// import { getDataObjectsState } from "../data-object/DataObjectsState";
import { AppMessagesState } from "./AppMessagesState";

export const subscribeToDataObjects = (dataObjectIds: string[]) => {
  AppMessagesState.dispatch({
    type: "dataObject:sub",
    detail: dataObjectIds,
  });
};
