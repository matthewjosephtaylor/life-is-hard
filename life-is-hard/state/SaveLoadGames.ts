import { BrowserFiles, Bytes } from "@mjtdev/engine";
import { storeGamePack, loadGamePack } from "./GAME_PACK_DB";
import { storeGameState, loadGameState } from "./GAME_STATE_DB";
import { getGameState, updateGameState, type GameState } from "./GameState";
import { getLihState, updateLihState } from "./LihState";
import { muffleAsr } from "../../src/asr-webkit/muffleAsr";
import type { GamePack } from "./GamePack";

export const storeGameFromStateToBrowser = () => {
  return storeGameState(getLihState().currentGameStateKey, getGameState());
};

export const storeGamePackFromStateToBrowser = () => {
  return storeGamePack(getLihState().gamePack);
};

export const loadGamePackIntoBrowserState = async () => {
  const gamePack = await loadGamePack("default");
  return updateLihState((s) => {
    s.gamePack = gamePack;
  });
};

export const loadGameIntoBrowserState = async () => {
  const gameState = await loadGameState(getLihState().currentGameStateKey);
  return updateGameState(gameState);
};

export const loadGameSaveFromDisk = async () => {
  const fhs = await BrowserFiles.openFileHandle({ multiple: false });
  const fh = fhs[0];
  if (!fh) {
    return;
  }
  const ab = await (await fh.getFile()).arrayBuffer();
  const gameSave = Bytes.msgPackToObject(new Uint8Array(ab)) as GameState;
  updateGameState(gameSave);
};

export const loadGamePackFromDisk = async () => {
  const fhs = await BrowserFiles.openFileHandle({ multiple: false });
  const fh = fhs[0];
  if (!fh) {
    return;
  }
  const ab = await (await fh.getFile()).arrayBuffer();
  const gamePack = Bytes.msgPackToObject(new Uint8Array(ab)) as GamePack;
  updateLihState((s) => {
    s.gamePack = gamePack;
  });
};

export const storeGamePackFromStateToDisk = () => {
  const { gamePack } = getLihState();
  const bytes = Bytes.toMsgPack(gamePack);
  return BrowserFiles.writeFileBrowser(
    `gamePack-${gamePack.name}.gamepack`,
    bytes
  );
};

export const storeGameFromStateToDisk = () => {
  const { currentGameStateKey } = getLihState();
  const gameState = getGameState();
  const bytes = Bytes.toMsgPack(gameState);
  return BrowserFiles.writeFileBrowser(
    `gamePack-${currentGameStateKey}.gamesave`,
    bytes
  );
};
