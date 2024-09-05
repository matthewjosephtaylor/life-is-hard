export const findFirstPapId = (): string | undefined => {
  const scripts = document.getElementsByTagName("script");

  for (let i = 0; i < scripts.length; i++) {
    const papId = scripts[i].getAttribute("data-pap-id");
    if (papId !== null) {
      return papId;
    }
  }
  if (location.pathname.startsWith("/access-point")) {
    return location.pathname.replaceAll("/", "");
  }
  return __PAP_ID__;
};
