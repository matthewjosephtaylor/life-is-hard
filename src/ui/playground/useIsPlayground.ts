
export const useIsPlayground = () => {
  return location.pathname.startsWith("/playground");
};
