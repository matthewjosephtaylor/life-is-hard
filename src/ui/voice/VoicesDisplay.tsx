import { sortByName } from "../../common/sortByName";
import { useChildDataObjects } from "../../state/data-object/DataObjectStates";
import { useUserState } from "../../state/user/UserState";
import { AppBorder } from "../agent/AppBorder";
import { VoiceDisplay } from "./VoiceDisplay";

export const VoicesDisplay = () => {
  const { id: userId } = useUserState();
  const voices = useChildDataObjects(userId, "voice");
  return (
    <AppBorder
      style={{ maxHeight: "80vh", maxWidth: "80vw", overflow: "auto" }}
      title="voices"
    >
      {voices.sort(sortByName).map((voice, i) => (
        <VoiceDisplay key={i} voiceId={voice.id} />
      ))}
    </AppBorder>
  );
};
