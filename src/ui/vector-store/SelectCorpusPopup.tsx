import { ButtonGroup } from "@mjtdev/engine";
import type { Corpus } from "ai-worker-common";
import { useState } from "react";
import { sortByName } from "../../common/sortByName";
import { AppBorder } from "../agent/AppBorder";
import { useUserCorpusList } from "../corpus/useUserCorpusList";
import { FormSelectDisplay } from "../form/FormSelectDisplay";

export const SelectCorpusPopup = ({
  onSubmit,
}: {
  onSubmit: (corpus: Corpus | undefined) => void;
}) => {
  const corpusList = useUserCorpusList().sort(sortByName);
  const [selected, setSelected] = useState<Corpus | undefined>(corpusList[0]);

  return (
    <AppBorder title="select corpus">
      <FormSelectDisplay
        defaultValue={selected?.id}
        onChange={(id) => setSelected(corpusList.find((c) => c.id === id))}
        title={"corpus"}
      >
        {corpusList.map((c, i) => (
          <option key={i} value={c.id}>
            {c.name}
          </option>
        ))}
      </FormSelectDisplay>
      <ButtonGroup
        actions={{
          ok: () => onSubmit(selected),
          cancel: () => onSubmit(undefined),
        }}
      />
    </AppBorder>
  );
};
