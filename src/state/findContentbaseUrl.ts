
export const findContentbaseUrl = (): string | undefined => {
  const script = document.querySelector<HTMLScriptElement>(
    "script[data-homebase-url]"
  );
  if (script) {
    const src = script.src;
    const baseUrl = src.substring(0, src.indexOf("/assets"));
    return baseUrl;
  }
  return undefined;
};
