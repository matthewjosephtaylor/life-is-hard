import { useContext } from "react";
import { AiplComponentContext } from "../provider/AiplComponentContext";

export const useAiplComponentContext = () => {
  return useContext(AiplComponentContext);
};
