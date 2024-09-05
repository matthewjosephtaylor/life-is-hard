import { Arrays, Nlps, isUndefined } from "@mjtdev/engine";

// Function to set checkbox values

export const setCheckboxValues = ({
  query = 'input[type="checkbox"]',
  values,
}: {
  query?: string;
  values: string[];
}): void => {
  const checkboxes = Arrays.from(
    document.body.querySelectorAll<HTMLInputElement>(query)
  );
  console.log(`checkboxes for query: '${query}'`, checkboxes);
  const valueRecord = values.reduce((acc, cur) => {
    return { ...acc, [cur.toLocaleLowerCase()]: cur };
  }, {});
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  checkboxes.forEach((checkbox) => {
    const input = checkbox as HTMLInputElement;
    const closestAndConfidence = Nlps.valueOfClosestMatch(
      input.value.toLocaleLowerCase(),
      valueRecord
    );
    if (isUndefined(closestAndConfidence)) {
      return;
    }
    const [closest, confidence] = closestAndConfidence;

    if (confidence > 0.7) {
      input.checked = true;
    }
  });
};
