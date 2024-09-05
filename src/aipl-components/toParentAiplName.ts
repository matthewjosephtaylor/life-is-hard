
export const toParentAiplName = (aiplName: string | undefined) => {
  if (aiplName === undefined) {
    return undefined;
  }
  return aiplName.replace(/\[.*\]/, "");
};
