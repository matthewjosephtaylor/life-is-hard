export const setCookie = (name: string, value: string) => {
  // domain=example.com;
  const domain = "ai-worker.mjtdev.workers.dev";
  document.cookie =
    name + "=" + (value || "") + `; path=/; ${domain}; Secure; SameSite=None`;
  console.log(document.cookie);
};
