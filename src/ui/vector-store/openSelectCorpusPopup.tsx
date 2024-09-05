import { closePopup, openCenteredPopup } from "@mjtdev/engine";
import type { Corpus } from "ai-worker-common";
import { SelectCorpusPopup } from "./SelectCorpusPopup";

export const openSelectCorpusPopup = (): Promise<Corpus | undefined> => {
  return new Promise((resolve, reject) => {
    const name = openCenteredPopup(
      <SelectCorpusPopup
        onSubmit={(corpus) => {
          closePopup(name);
          resolve(corpus);
        }}
      />,
      {
        onClose: () => {
          resolve(undefined);
        },
      }
    );
  });
};
