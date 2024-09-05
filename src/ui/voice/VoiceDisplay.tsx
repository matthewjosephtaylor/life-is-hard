import { Grid } from "@mjtdev/engine";
import type { ApiShape, AppVoice } from "ai-worker-common";
import { APP_SERVICE_API_SHAPES } from "ai-worker-common";
import {
  deleteDataObject,
  updateDataObject,
  useDataObject,
} from "../../state/data-object/DataObjectStates";
import { AppBorder } from "../agent/AppBorder";
import { CorpusDocumentsDisplay } from "../corpus/CorpusDocumensDisplay";
import { FormInputDisplay } from "../form/FormInputDisplay";
import { FormSelectDisplay } from "../form/FormSelectDisplay";
import { BrowserVoiceControlEditor } from "./BrowserVoiceControlEditor";
import { VoicePlayer } from "./VoicePlayer";

export const VoiceDisplay = ({ voiceId }: { voiceId: string }) => {
  const voice = useDataObject<AppVoice>(voiceId);
  if (!voice) {
    return <>VoiceDisplay: Missing voice: {voiceId}</>;
  }
  const { name, apiShape } = voice;
  return (
    <AppBorder defaultDisclosed={false} collapsable={true} title={name}>
      <Grid direction="row" gap="0.2em" cellSize={"min-content"}>
        <input
          onClick={() => deleteDataObject(voiceId)}
          type="button"
          value="delete"
        />
        <FormInputDisplay
          key={`${voiceId}-name`}
          onChange={(value) => {
            updateDataObject<AppVoice>(voiceId, (v) => {
              return { ...v, name: value };
            });
          }}
          title={"name"}
          defaultValue={name}
        />
        <VoicePlayer voiceId={voiceId} />
        <FormSelectDisplay
          title="apiShape"
          key={`${voiceId}-apiShape`}
          onChange={(value) => {
            updateDataObject<AppVoice>(voiceId, (v) => {
              return { ...v, apiShape: value as ApiShape };
            });
          }}
          defaultValue={apiShape}
        >
          {APP_SERVICE_API_SHAPES.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </FormSelectDisplay>
        {voice.apiShape === "BrowserTts" ? (
          <BrowserVoiceControlEditor voiceId={voiceId} />
        ) : undefined}

        {voice.apiShape === "CustomTts" ? (
          <CorpusDocumentsDisplay parentId={voice.id} />
        ) : undefined}
      </Grid>
    </AppBorder>
  );
};
