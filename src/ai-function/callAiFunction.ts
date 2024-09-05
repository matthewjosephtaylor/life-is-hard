import type { Chat} from "ai-worker-common";
import { Chats } from "ai-worker-common";
import { getAiFunctionState } from "ai-worker-common/dist/type/ai-function/AiFunctions";
import { AppEvents } from "../event/AppEvents";
import { parseAiFunctionText } from "./parseAiFunctionText";

export const callAiFunction = ({
  chat,
  text,
  userId,
}: {
  userId: string;
  chat: Chat;
  text: string;
}) => {
  const { functions } = getAiFunctionState();
  const parsed = parseAiFunctionText(text);
  if (!parsed) {
    return;
  }
  console.log("parsed", parsed);
  AppEvents.dispatchEvent("aiFunctionCalled", parsed);
  const functionInterface = functions[parsed.name];
  if (!functionInterface) {
    console.log("no direct function", parsed);
    return;
  }
  const { func } = functionInterface;
  if (!func) {
    return;
  }
  try {
    func({
      arg: parsed.arg,
      env: {
        chats: Chats,
        userId,
        chat,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
