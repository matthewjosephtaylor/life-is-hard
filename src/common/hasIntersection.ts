
export const hasIntersection = (arr1: string[], arr2: string[]): boolean => {
  const set1 = new Set(arr1);
  return arr2.some((element) => set1.has(element));
};
