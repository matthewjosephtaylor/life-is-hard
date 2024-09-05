export const findHomebaseUrl = (): string | undefined => {
  const scripts = document.getElementsByTagName("script");

  for (let i = 0; i < scripts.length; i++) {
    const homeBaseUrl = scripts[i].getAttribute("data-homebase-url");
    if (homeBaseUrl !== null) {
      return homeBaseUrl;
    }
  }

  // DANGER we need to determine which backend to connect to based on how the UI is accessed
  // IF/when new environments are added this will need to be updated/maintained
  // let homeBaseUrl: string | undefined = "http://localhost:8787";
  // let homeBaseUrl = "https://ai-worker.mjtdev.workers.dev";
  // let homeBaseUrl = "https://ai-worker.intelligage.workers.dev";
  let homeBaseUrl: string | undefined = __HOME_BASE__;
  if (/intelligage/i.test(location.hostname)) {
    homeBaseUrl = "https://ai-worker.intelligage.workers.dev";
  }
  if (/ai-thing/i.test(location.hostname)) {
    homeBaseUrl = "https://ai-worker.mjtdev.workers.dev";
  }
  return homeBaseUrl;
};
