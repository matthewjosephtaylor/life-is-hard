import { Returns } from "../data-object/Returns";
import { AppMessagesState } from "../ws/AppMessagesState";

export const switchActiveGroup = async ({
  subjectId,
  activeId,
}: {
  subjectId: string;
  activeId: string;
}) => {
  console.log("switchActiveGroup", { subjectId, activeId });
  return new Promise((resolve, reject) => {
    const returnId = Returns.addReturnListener({
      onReturn: (id) => {
        // TODO HACK invalidating worker caches on switching active group
        AppMessagesState.dispatch({
          type: "app:invalidateCaches",
          detail: undefined,
        });
        resolve(id);
      },
      onTimeout: () => {
        reject(
          new Error("switchActiveGroup: timed out activating", {
            cause: {
              subjectId,
              activeId,
            },
          })
        );
      },
    });

    AppMessagesState.dispatch({
      type: "app:group:activate",
      detail: {
        returnId,
        activeId,
        subjectId,
      },
    });
  });
};
