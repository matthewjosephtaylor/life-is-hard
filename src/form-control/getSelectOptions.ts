export const getSelectOptions = (selectElement: HTMLSelectElement): string[] => {
  return Array.from(selectElement.options).map((option) => option.value);
};
