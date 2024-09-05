import { AppModes } from "../location/AppModes";
import { AppMessagesState } from "../ws/AppMessagesState";

export const startChatWithCharacters = ({
  aiCharacterId,
  userCharacterId,
}: Partial<{
  aiCharacterId: string;
  userCharacterId: string;
}> = {}) => {
  const { params } = AppModes.getAppModesAndParams();

  AppMessagesState.dispatch({
    type: "chat:start",
    detail: {
      aiCharacterId,
      userCharacterId,
      params
    },
  });
};
