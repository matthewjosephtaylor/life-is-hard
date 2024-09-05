export const sortByName = <T extends { name?: string | undefined }>(
  a: T | undefined,
  b: T | undefined
) => {
  const aName = a?.name ?? "";
  const bName = b?.name ?? "";
  return aName.localeCompare(bName);
};
