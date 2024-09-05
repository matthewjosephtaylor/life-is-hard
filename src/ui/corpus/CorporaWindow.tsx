import { Grid } from "@mjtdev/engine";
import { CorpusList } from "./CorpusList";
import { openEditCorpusPopup } from "./openEditCorpusPopup";
import { AppWindow } from "../AppWindow";

export const CorporaWindow = () => {
  return (
    <AppWindow title="corpora window">
      <input
        onClick={() => openEditCorpusPopup({ name: "New Corpus" })}
        type="button"
        value="Create Corpus"
      />
      <CorpusList />
    </AppWindow>
  );
};
