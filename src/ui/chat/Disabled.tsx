import type { ReactCssProperties } from "@mjtdev/engine";
import { produce } from "immer";
import type { ReactNode} from "react";
import { useEffect, useRef, useState } from "react";

import { FcCancel } from "react-icons/fc";

export const Disabled = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [style, setStyle] = useState(
    produce(
      {
        width: undefined as number | undefined,
        height: undefined as number | undefined,
        opacity: "50%",
      } satisfies ReactCssProperties,
      () => {}
    )
  );

  useEffect(() => {
    if (!ref.current?.parentElement) {
      return;
    }
    const observer = new ResizeObserver(() => {
      if (!ref.current?.parentElement) {
        return;
      }
      const bbox = ref.current.parentElement.getBoundingClientRect();
      const { width, height } = bbox;
      setStyle(
        produce(style, (s) => {
          (s.width = width), (s.height = height);
        })
      );
    });

    observer.observe(ref.current.parentElement);

    return () => {
      observer.disconnect();
    };
  }, [children, ref]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
      }}
    >
      {children}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: "0",
        }}
      >
        <FcCancel style={{ ...style }} />
      </div>
    </div>
  );
};
