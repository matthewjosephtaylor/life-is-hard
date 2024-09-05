export const log = (message: string, ...extra: unknown[]): void => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`, ...extra);
};
