import type { AppCharacter } from "ai-worker-common";
import { AppMessagesState } from "../../../state/ws/AppMessagesState";


export const setAccessTokenUserCharacter = ({
  accessToken, character,
}: {
  character: AppCharacter;
  accessToken: string;
}) => {
  console.log("setAccessTokenUserCharacter", { accessToken, character });
  AppMessagesState.dispatchAll([
    {
      type: "dataLink:delete",
      detail: {
        parentId: accessToken,
        objectType: "app-character",
        key: "user",
      },
    },
    {
      type: "dataLink:upsert",
      detail: {
        parentId: accessToken,
        childId: character.id,
        objectType: "app-character",
        key: "user",
      },
    },
  ]);
  // DataObjectStates.deleteDataLink({
  //   parentId: accessToken,
  //   objectType: "app-character",
  //   key: "user",
  // });
  // DataObjectStates.upsertDataLink({
  //   parentId: accessToken,
  //   childId: character.id,
  //   objectType: "app-character",
  //   key: "user",
  // });
};
