import type { ReactNode } from "react";
import type { TAB_NAME } from "./TAB_NAME";
import { WelcomeWindow } from "./WelcomeWindow";
import { AppReportsWindow } from "./app-report/AppReportsWindow";
import { CharactersWindow } from "./character/CharactersWindow";
import { ChatWindow } from "./chat/ChatWindow";
import { ChatHistoryWindow } from "./chat/history/ChatHistoryWindow";
import { SecretsWindow } from "./secrets/SecretsWindow";
import { ServicesWindow } from "./service/ServicesWindow";
import { SpecialActionsWindow } from "./upgrade/UpgradeWindow";
import { UsersWindow } from "./user/UsersWindow";

export const WINDOWS: Record<TAB_NAME, ReactNode> = {
  chat: <ChatWindow />,
  welcome: <WelcomeWindow />,
  characters: <CharactersWindow />,
  users: <UsersWindow />,
  reports: <AppReportsWindow />,
  chatHistory: <ChatHistoryWindow />,
  services: <ServicesWindow />,
  specialActions: <SpecialActionsWindow />,
  secrets: <SecretsWindow />,
} as const;
