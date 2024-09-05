import { Colors } from "@mjtdev/engine";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode} from "react";
import { useEffect, useRef, useState } from "react";

export const Waitable = ({
  waiting = true,
  children,
  options = {},
}: {
  waiting?: boolean;
  children: ReactNode;
  options?: Partial<{ count: number; dotSize: number; dotColor: string }>;
}) => {
  const {
    count = 20,
    dotSize = 10,
    dotColor = Colors.from("blue").alpha(0.5).toString(),
  } = options;
  const ref = useRef<HTMLDivElement>(null);

  const [state, setState] = useState({
    width: undefined as number | undefined,
    height: undefined as number | undefined,
  } as const);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new ResizeObserver(() => {
      if (!ref.current) {
        return;
      }
      const bbox = ref?.current.getBoundingClientRect();
      const { width, height } = bbox;
      setState({ width, height });
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [children, ref]);

  const dots = Array.from({ length: count }, (_, i) => i);

  const calculateWaveAnimation = (
    index: number,
    width: number,
    height: number
  ) => {
    const x = (index / count) * width;
    const yOffset = -height / 4;
    return {
      initial: { x, y: height / 2 },
      animate: {
        y: [height / 2, height, height / 2, height, height / 2].map(
          (x) => x + yOffset
        ), // Simulate a sine wave pattern
        transition: {
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
          delay: index * 0.2, // Stagger the animation start for each dot
        },
      },
    };
  };

  return (
    <span
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {children}
      <AnimatePresence>
        {waiting && state.width ? (
          <motion.div
            key="wait-animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              left: 0,
              top: 0,
              position: "absolute",
              pointerEvents: "none",
              ...state,
            }}
          >
            {dots.map((dot, index) => (
              <motion.div
                key={dot}
                variants={calculateWaveAnimation(
                  index,
                  state.width ?? 1,
                  state.height ?? 1
                )}
                initial="initial"
                animate="animate"
                style={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: "50%",
                  backgroundColor: dotColor,
                  // margin: "0 2px",
                  position: "absolute",
                }}
              />
            ))}
          </motion.div>
        ) : undefined}
      </AnimatePresence>
    </span>
  );
};
