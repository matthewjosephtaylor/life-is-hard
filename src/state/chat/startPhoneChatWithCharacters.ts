import type { PhoneCall} from "ai-worker-common";
import { Apps, uniqueId } from "ai-worker-common";
import { getAppState, updateAppState } from "../app/AppState";
import { UsersState } from "../user/UsersState";
import { AppMessagesState } from "../ws/AppMessagesState";
import { openFormEditorPopup } from "../../ui/form/openFormEditorPopup";
import { updateTtsState } from "../../tts/TtsState";
import { Ttss, disableTts } from "../../tts/Ttss";
import { AsrWebkitss } from "../../asr-webkit/AsrWebkits";

export const startPhoneChatWithCharacters = async ({
  aiCharacterId,
  userCharacterId,
}: Partial<{
  aiCharacterId: string;
  userCharacterId: string;
}> = {}) => {
  const { lastPhoneNumber = "555-1212" } = getAppState();
  const phoneCall = await openFormEditorPopup<Partial<PhoneCall>>(
    { phoneNumber: lastPhoneNumber },
    {
      focusField: "phoneNumber",
      title: "dial",
    }
  );

  if (!phoneCall) {
    return;
  }

  const profile = UsersState.getActiveProfile();
  if (!profile) {
    return Apps.error("no active user profile");
  }
  const chatId = uniqueId("chat");
  Ttss.disableTts();
  AsrWebkitss.stopHearing();
  updateAppState((s) => {
    s.lastPhoneNumber = phoneCall.phoneNumber;
  });
  AppMessagesState.dispatch({
    type: "chat:phone",
    detail: {
      chat: {
        id: chatId,
        aiCharacterId: aiCharacterId ?? profile.aiCharacterId,
        userCharacterId: userCharacterId ?? profile.userCharacterId,
      },
      phoneCall,
    },
  });
  // AppMessagesState.dispatch({
  //   type: "chat:start",
  //   detail: {
  //     id: chatId,
  //     aiCharacterId: aiCharacterId ?? profile.aiCharacterId,
  //     userCharacterId: userCharacterId ?? profile.userCharacterId,
  //   },
  // });
  updateAppState((s) => {
    s.chatId = chatId;
  });
};
