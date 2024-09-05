import type { AppUserProfile } from "ai-worker-common";
import { FormSelectDisplay } from "../ui/form/FormSelectDisplay";
import { useAvailableVoices } from "../ui/useAvailableVoices";

export const UserProfileVoiceDisplay = ({
  profile,
  onChange,
}: {
  onChange: (value: AppUserProfile) => void;
  profile: AppUserProfile;
}) => {
  const { voiceId } = profile;
  const voices = useAvailableVoices();
  return (
    <FormSelectDisplay
      onChange={(value) =>
        onChange({
          ...profile,
          voiceId: value,
        })
      }
      title={"voice"}
      defaultValue={voiceId}
    >
      <option key="empty" value={undefined} />
      {voices.map((v, i) => (
        <option key={i} value={v.id}>
          {v.name}
        </option>
      ))}
    </FormSelectDisplay>
  );
};
