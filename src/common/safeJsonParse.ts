import { safe } from "@mjtdev/engine";



export const safeJsonParse = <T>(text: string): T | undefined => {
  return safe(() => JSON.parse(text), { quiet: true });
};
