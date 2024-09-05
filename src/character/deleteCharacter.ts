import { DataObjectStates } from "../state/data-object/DataObjectStates";


export const deleteCharacter = async (id: string): Promise<void> => {
  return DataObjectStates.deleteDataObject(id);
  // throw new Error("TBD");
  // const character = getCharacter(id);
  // if (!character) {
  //   return;
  // }
  // await Idbs.remove(CharactersDB, id);
  // await loadCharactersState();
};
