import {
  Animates,
  Canvas,
  Colors, xOf,
  yOf
} from "@mjtdev/engine";
import { calcThoughtTextToDocumentLines } from "./ThoughtCloud";


export const ThoughtLines = () => {
  return (
    <Canvas
      style={{ position: "absolute" }}
      painter={(c) => {
        const ctx = c.getContext("2d");
        if (!ctx) {
          return;
        }
        const parent = c.parentElement;
        const pbb = parent?.getBoundingClientRect();
        if (pbb) {
          // console.log("pbb", [c, pbb, parent]);
          c.width = pbb.width;
          c.height = pbb.height;
        }
        // ctx.fillStyle = Colors.from("purple").alpha(0.5).toString();
        // console.log(`wtf ${c.width}/${c.height}`, [c.width, c.height]);
        const ticker = () => {
          if (!pbb) {
            return;
          }
          ctx.clearRect(0, 0, c.width, c.height);
          const lines = calcThoughtTextToDocumentLines(pbb);
          // console.log("lines-length", lines.length);
          // ctx.strokeStyle = Colors.from("white").alpha(0.02).toString();
          lines.forEach((line) => {
            const { thoughtPoint, documentPoint, color, thickness } = line;
            ctx.lineWidth = thickness;
            ctx.strokeStyle = Colors.from(color).alpha(0.1).toString();
            ctx.beginPath();
            ctx.moveTo(xOf(thoughtPoint), yOf(thoughtPoint));
            ctx.lineTo(xOf(documentPoint), yOf(documentPoint));
            ctx.closePath();
            ctx.stroke();
          });
        };
        const anim = Animates.create({ ticker });
        return () => {
          anim.abortController.abort();
        };
      }} />
  );
};
