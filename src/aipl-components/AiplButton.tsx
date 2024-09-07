import { type ButtonHTMLAttributes } from "react";
import type { AiplComponentContextState } from "./AiplComponentContextState";
import { useAiplComponentContext } from "./useAiplComponentContext";

export const AiplButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    aiplName: string;
    onAction?: (context: AiplComponentContextState, aiplName: string) => void;
  }
) => {
  const { children, aiplName, onAction, ...rest } = props;
  const context = useAiplComponentContext();

  return (
    <button
      onClick={async () => {
        onAction && context && onAction(context, aiplName);
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
