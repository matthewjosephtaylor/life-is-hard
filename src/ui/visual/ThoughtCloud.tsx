import type { PointObject2} from "@mjtdev/engine";
import { Maths, Point2, isDefined } from "@mjtdev/engine";
import { normalize } from "../animation/normalize";
import { parseCssValue } from "../animation/parseCssValue";
import {
  getThoughtCloudState,
  useThoughtCloudState,
} from "./ThoughtCloudState";
import { ThoughtDisplay } from "./ThoughtDisplay";
import { idToColor } from "./idToColor";
// import { ThoughtDocuments } from "./ThoughtDocuments";
import { ThoughtLines } from "./ThoughtLines";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";

export const ThoughtCloud = () => {
  // const { thoughts } = useThoughtCloudState();

  const thoughts = DataObjectStates.useDataObjectsByType("thought");

  const thoughDisplays = thoughts
    .slice(0, 100)
    .map((t, i) => <ThoughtDisplay key={`${t.id}`} thoughtId={t.id} />);
  return (
    <div
      id="thought-cloud-container"
      style={{
        position: "relative",
        backgroundColor: "black",
        width: "80vw",
        height: "40em",
      }}
    >
      {thoughDisplays}
      {/* <ThoughtDocuments /> */}
      {/* <ThoughtLines /> */}
    </div>
  );
};

export const domRectToCenter = (domRect: DOMRect): PointObject2 => {
  const x = domRect.x + domRect.width / 2;
  const y = domRect.y + domRect.height / 2;
  return { x, y };
};

// export const calcThoughtTextToDocumentLines = (offset: Point2) => {
//   const {
//     // thoughts,
//     thoughtDocumentIdToElements,
//     thoughtIdToElements,
//     activeThoughtIds,
//     maxScore,
//     minScore,
//   } = getThoughtCloudState();
//   const thoughts = DataObjectStates.getDataObjects("thought");
//   return (
//     thoughts
//       // .filter((t) => activeThoughtIds.includes(t.id))
//       .map((t) => {
//         const doc = t.documents[0];
//         if (!doc) {
//           return;
//         }
//         const thoughtElement = thoughtIdToElements[t.id];
//         const documentElement = thoughtDocumentIdToElements[doc.id];
//         if (!thoughtElement || !documentElement) {
//           return undefined;
//         }
//         if (parseCssValue(thoughtElement.style.opacity) < 0.01) {
//           return;
//         }
//         // TODO handle multiple documents per thought
//         const rawThoughtPoint = domRectToCenter(
//           thoughtElement.getBoundingClientRect()
//         );
//         const rawDocumentPoint = domRectToCenter(
//           documentElement.getBoundingClientRect()
//         );
//         // const rawDocumentPoint = documentElement.getBoundingClientRect();
//         return {
//           thoughtPoint: Maths.subtractPoint(rawThoughtPoint, offset),
//           documentPoint: Maths.subtractPoint(rawDocumentPoint, offset),
//           color: idToColor(doc.id),
//           thickness: 10 * normalize(t.score, minScore, maxScore),
//         } as const;
//       })
//       .filter(isDefined)
//   );
// };
