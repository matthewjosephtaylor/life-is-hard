
export const nameOfValue = (value: unknown) => {
  if (typeof value === "object") {
    return (value as { name: string; })["name"];
  }
  return undefined;
};
