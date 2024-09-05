import {
  Border,
  Grid,
  Objects,
  closePopup,
  isUndefined,
  openCenteredPopup,
} from "@mjtdev/engine";
import { useCharactersState } from "../character/useCharactersState";
import { NoWrap } from "../ui/NoWrap";
import { useState } from "react";

export type SelectedCharacters = {
  userCharacterId: string | undefined;
  aiCharacterId: string | undefined;
};
export const openCharacterSelectionForm = (): Promise<
  SelectedCharacters | undefined
> => {
  const result: SelectedCharacters = {
    userCharacterId: undefined,
    aiCharacterId: undefined,
  } as const;
  type R = typeof result;
  return new Promise((resolve, reject) => {
    const name = "roleplay-popup";
    openCenteredPopup(
      <RoleplayCharactersForm resolve={resolve} name={name} />,
      {
        name,
      }
    );
  });
};

export const RoleplayCharactersForm = ({
  resolve,
  name,
}: {
  name: string;
  resolve: (value: SelectedCharacters | undefined) => void;
}) => {
  const [result, setResult] = useState<SelectedCharacters>({
    aiCharacterId: undefined,
    userCharacterId: undefined,
  });
  return (
    <Border title={"characters"}>
      <Grid direction="row" cellSize={"min-content"}>
        <Border title={<NoWrap>AI Character</NoWrap>}>
          <CharacterSelector
            onChange={(value) => {
              setResult({
                ...result,
                aiCharacterId: value,
              });
            }}
          />
        </Border>
        <Border title={<NoWrap>User Character</NoWrap>}>
          <CharacterSelector
            onChange={(value) => {
              setResult({
                ...result,
                userCharacterId: value,
              });
            }}
          />
        </Border>
        <button
          disabled={
            isUndefined(result.aiCharacterId) ||
            isUndefined(result.userCharacterId)
          }
          onClick={() => {
            resolve(result);
            closePopup(name);
          }}
        >
          OK
        </button>
        <button
          onClick={() => {
            resolve(undefined);
            closePopup(name);
          }}
        >
          Cancel
        </button>
      </Grid>
    </Border>
  );
};

export const CharacterSelector = ({
  onChange,
}: {
  onChange: (value: string) => void;
}) => {
  const { characters } = useCharactersState();

  const options = Objects.values(characters)
    .sort((a, b) => {
      if (!a.card.data.name || !b.card.data.name) {
        return 0;
      }
      return a.card.data.name.localeCompare(b.card.data.name);
    })
    .map((char, i) => (
      <option key={i} value={char.id}>
        {char.card.data.name}
      </option>
    ));

  options.unshift(<option value="" key={"empty"} />);
  return (
    <select
      defaultValue=""
      onChange={(evt) => {
        onChange(evt.target.value);
      }}
    >
      {options}
    </select>
  );
};
