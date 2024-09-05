export const stringifyEq = (a: any, b: any) => {
  const result = JSON.stringify(a) === JSON.stringify(b);
  // if (!result) {
  //   console.log("stringifyEq", { a, b });
  // }
  return result;
};
