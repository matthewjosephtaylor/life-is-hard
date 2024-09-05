export const selectCheckableButton = (
  querySelector: string,
  value: string
): void => {
  const buttons = document.querySelectorAll<HTMLInputElement>(querySelector);

  if (buttons.length === 1) {
    const button = buttons[0];
    if (button.value === value) {
      button.checked = true;
      return;
    }
    button.checked = toBoolean(value);
    return;
  }

  buttons.forEach((checkableButton) => {
    if (checkableButton.value === value) {
      checkableButton.checked = true;
    }
  });
};
const toBoolean = (value: string): boolean => {
  const truthyValues = ["true", "1", "yes", "on"];
  const falsyValues = ["false", "0", "no", "off"];

  if (truthyValues.includes(value.toLowerCase())) return true;
  if (falsyValues.includes(value.toLowerCase())) return false;

  return false; // Return false by default
};
