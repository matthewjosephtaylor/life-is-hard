import { AiplComponentProvider } from "../../../src/provider/AiplComponentProvider";
import type { GameEntity } from "../../state/GameEntity";

import { CategoryListContent } from "./CategoryListContent";

export const CategoryMainContent = ({ category }: { category: GameEntity['category']}) => {
  return (
    <AiplComponentProvider config={{}}>
      <CategoryListContent category={category} />
    </AiplComponentProvider>
  );
};
