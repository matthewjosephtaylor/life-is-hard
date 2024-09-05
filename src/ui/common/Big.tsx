import { Flex } from "@radix-ui/themes";
import type { ReactNode } from "react";
import type React from "react";
import { useRef, useEffect } from "react";

interface BigProps {
  children: ReactNode;
}

export const Big: React.FC<BigProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const adjustSize = () => {
    if (ref.current && ref.current.parentElement) {
      const parent = ref.current.parentElement;
      const { width, height } = parent.getBoundingClientRect();

      ref.current.style.width = `${width}px`;
      ref.current.style.height = `${height}px`;
    }
  };

  useEffect(() => {
    adjustSize();
    window.addEventListener("resize", adjustSize);
    return () => window.removeEventListener("resize", adjustSize);
  }, []);

  return (
    <Flex ref={ref} flexGrow="1">
      {children}
    </Flex>
  );
};
