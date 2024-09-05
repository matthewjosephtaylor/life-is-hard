import { Objects } from "@mjtdev/engine";
import type { AppCharacter } from "ai-worker-common";
import { FormSelect } from "../form/FormSelect";
import { useAvailableVoices } from "../useAvailableVoices";

export const CharacterVoiceSelect = ({
  character,
  onChange,
}: {
  character: AppCharacter;
  onChange?: (value: string) => void;
}) => {
  const { card } = character;
  const voiceId = card.data.extensions?.voiceId;
  const voices = useAvailableVoices();
  const voiceValues = Objects.fromEntries(
    voices.map((v) => [v.id, v.name] as const)
  );
  return (
    <FormSelect
      title="Custom Voice"
      onChange={onChange}
      defaultValue={voiceId}
      values={voiceValues}
    />
  );
};
