import type { AppGroup } from "ai-worker-common/dist/type/group/AppGroup";
import { Returns } from "../../state/data-object/Returns";
import { AppMessagesState } from "../../state/ws/AppMessagesState";

export const createAppGroup = (
  draft: Partial<AppGroup> = {}
): Promise<AppGroup> => {
  return new Promise<AppGroup>((resolve, reject) => {
    const returnId = Returns.addReturnListener({
      onReturn: (data) => {
        resolve(data as AppGroup);
      },
    });
    AppMessagesState.dispatch({
      type: "app:group:create",
      detail: { draft, returnId },
    });
  });
};
