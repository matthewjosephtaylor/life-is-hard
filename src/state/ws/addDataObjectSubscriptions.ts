import { updateDataObjectsState } from "../data-object/DataObjectStates";


export const addDataObjectSubscriptions = (dataObjectIds: string[]) => {
  updateDataObjectsState((state) => {
    state.subs.push(...dataObjectIds);
  });
};
