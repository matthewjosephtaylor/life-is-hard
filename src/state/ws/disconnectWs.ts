import { getAppState } from "../app/AppState";


export const disconnectWs = () => {
  const { ws } = getAppState();
  if (!ws) {
    return;
  }
  ws.close();
};
