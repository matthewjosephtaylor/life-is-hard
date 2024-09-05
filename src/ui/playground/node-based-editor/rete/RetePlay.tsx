import { useRete } from "rete-react-plugin";
import { createReteEditor } from "./createReteEditor";

export function RetePlay() {
  const [ref] = useRete(createReteEditor);

  return (
    <div ref={ref} style={{ color: "black", height: "20em", width: "40ch" }} />
  );
}


