import { produce, type Draft } from "immer";
import { useState } from "react";

// export const useImmutableState = <T>(draft: T) => {
//   const [state, setState] = useState<T>(produce(draft, () => {}));

//   return [
//     state as Readonly<T>,
//     (mutator: (s: Draft<T>) => void) => {
//       setState(
//         produce(state, (s) => {
//           mutator(s);
//         })
//       );
//     },
//   ] as const;
// };
