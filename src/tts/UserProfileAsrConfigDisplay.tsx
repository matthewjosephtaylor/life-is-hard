import { safe } from "@mjtdev/engine";
import type { AppUserProfile } from "ai-worker-common";
import { AppBorder } from "../ui/agent/AppBorder";
import { DEFAULT_ASR_CONFIG } from "./DEFAULT_ASR_CONFIG";

export const UserProfileAsrConfigDisplay = ({
  profile,
  onChange,
}: {
  onChange: (value: AppUserProfile) => void;
  profile: AppUserProfile;
}) => {
  const { asrConfig = DEFAULT_ASR_CONFIG } = profile;
  const { pauseToListenMs } = asrConfig;
  return (
    <AppBorder title="asr config">
      <AppBorder title={`pause to listen ${pauseToListenMs}ms`}>
        <input
          type="range"
          min="0"
          max="5000"
          step={"1"}
          defaultValue={`${pauseToListenMs}`}
          onChange={(evt) => {
            const numberValue = safe(() => Number(evt.currentTarget.value));
            if (!numberValue) {
              return;
            }
            onChange({
              ...profile,
              asrConfig: {
                ...(profile.asrConfig ?? {}),
                pauseToListenMs: numberValue,
              },
            });
          }}
        />
      </AppBorder>
    </AppBorder>
  );
};
