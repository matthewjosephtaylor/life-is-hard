import { Border, Htmls } from "@mjtdev/engine";
import type { CSSProperties} from "react";
import { useEffect, useRef } from "react";

export const ResizableImage = ({
  title,
  src,
  style,
}: {
  title?: string;
  src: string | undefined;
  style?: CSSProperties;
}) => {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (!src) {
      return;
    }
    //@ts-ignore
    Htmls.updateStyle({ element: ref.current, style: style as unknown });
  }, [src]);

  return (
    <Border
      resizable={true}
      title={title}
      onResize={(bbox) => {
        const { width, height } = bbox;
        if (width === 0 || height === 0) {
          return;
        }
        if (!ref.current) {
          return;
        }
        ref.current.style.width = `${bbox.width}px`;
        ref.current.style.height = `${bbox.height}px`;
      }}
    >
      <img ref={ref} src={src} />
    </Border>
  );
};
