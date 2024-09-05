export const extractCssUnit = (cssPropertyValue: string | number) => {
  if (typeof cssPropertyValue === "number") {
    return "";
  }
  return cssPropertyValue.replace(/[\d.]/g, ""); // Remove digits and dots
};
