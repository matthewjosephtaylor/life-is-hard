import { Objects } from "@mjtdev/engine";
import { useCharactersState } from "../../character/useCharactersState";
import { sortCharactersByName } from "../character/sortCharactersByName";

export const useCharacterOptions = () => {
  const { characters } = useCharactersState();
  const empty = <option key="empty" value={undefined} />;
  return [
    empty,
    ...Objects.values(characters)
      .sort(sortCharactersByName)
      .map((c, i) => (
        <option key={i} value={c.id}>
          {c?.card?.data?.name ?? c.id}
        </option>
      )),
  ];
};
