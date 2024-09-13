import { AiplComponentProvider } from "../../../src/provider/AiplComponentProvider";

import { GoalsListContent } from "./GoalsListContent";

export const GoalsMainContent = () => {
  return (
    <AiplComponentProvider config={{}}>
      <GoalsListContent />
    </AiplComponentProvider>
  );
};
