import type { ReactNode } from "react";


export const NoWrap = ({ children }: { children: ReactNode; }) => {
  return <div style={{ whiteSpace: "nowrap" }}>{children}</div>;
};
