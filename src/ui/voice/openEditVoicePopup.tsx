import { openCenteredPopup } from "@mjtdev/engine";
import { EditVoicePopup } from "./EditVoicePopup";


export const openEditVoicePopup = (voiceId: string) => {
  return openCenteredPopup(<EditVoicePopup name="" voiceId={voiceId} />);
};
