import { capitalizeFirstLetter } from "./capitalizeFirstLetter";


export const toCommonCases = (text: string) => {
  return [
    text.toLocaleLowerCase(),
    text.toLocaleUpperCase(),
    capitalizeFirstLetter(text),
  ];
};
