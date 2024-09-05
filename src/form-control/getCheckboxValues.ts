// Function to get all possible values of checkboxes

export const getCheckboxValues = (
  query: string = 'input[type="checkbox"]'
): string[] => {
  const checkboxes = document.body.querySelectorAll(query);
  return Array.from(checkboxes).map(
    (checkbox) => (checkbox as HTMLInputElement).value
  );
};
