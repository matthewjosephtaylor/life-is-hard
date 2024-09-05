import type { TextAreaProps } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes";
import { useState, useRef, useEffect } from "react";

export const ResizableTextarea: React.FC<TextAreaProps> = ({ ...props }) => {
  const [state, setState] = useState<Pick<TextAreaProps, "defaultValue">>({
    defaultValue: "",
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    setState((prevState) => ({ ...prevState, value: target.value }));
  };

  const updateCols = () => {
    if (textareaRef.current) {
      const cols = Math.floor((textareaRef?.current?.clientWidth ?? 0) / 12);
      console.log(`cols: ${cols}`);
      setState((prevState) => ({
        ...prevState,
        cols,
      }));
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateCols);
    updateCols();

    return () => {
      window.removeEventListener("resize", updateCols);
    };
  }, []);

  return (
    <TextArea
      ref={textareaRef}
      // value={state.value}
      defaultValue={state.defaultValue}
      {...props}
      onChange={handleChange}
    />
  );
};
