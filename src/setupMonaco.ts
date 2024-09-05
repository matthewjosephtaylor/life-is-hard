import { loader } from "@monaco-editor/react";

import * as monaco from "monaco-editor";
export const setupMonaco = () => {
  loader.config({ monaco });
};
