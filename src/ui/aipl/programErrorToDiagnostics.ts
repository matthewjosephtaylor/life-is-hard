import type { Aipls } from "ai-worker-common";
import type { editor } from "monaco-editor";
import { MarkerSeverity } from "monaco-editor";

export function programErrorToDiagnostics(
  programOrError: ReturnType<typeof Aipls.parseAipl>
): editor.IMarkerData[] {
  if (!programOrError.status && programOrError.expected) {
    return [
      {
        startLineNumber: programOrError.index.line,
        startColumn: programOrError.index.column,
        endLineNumber: programOrError.index.line,
        endColumn: programOrError.index.column + 1, // Adjust according to the error length
        message: `Expected: ${programOrError.expected.join(", ")}`,
        severity: MarkerSeverity.Error, // Use monaco.MarkerSeverity.Warning or monaco.MarkerSeverity.Info for different levels
      },
    ];
  }

  return []; // No errors found
}
