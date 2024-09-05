import { isDefined, isEmpty } from "@mjtdev/engine";
import { Strong } from "@radix-ui/themes";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import type { BaseEditor, Descendant, Element, Text } from "slate";
import { Editor, Node, Transforms, createEditor } from "slate";
import type { ReactEditor, RenderLeafProps } from "slate-react";
import { Editable, Slate, withReact } from "slate-react";
import type { EditableProps } from "slate-react/dist/components/editable";

const isSlateText = (maybe: unknown): maybe is Text => {
  const straw = maybe as Text;
  return typeof straw === "object" && typeof straw.text === "string";
};
const isSlateElement = (maybe: unknown): maybe is Element => {
  const straw = maybe as Element;
  return typeof straw === "object" && Array.isArray(straw.children);
};

export const slateDecendantsToText = (decendants: Descendant[]) => {
  const results: string[] = [];
  for (const decendant of decendants) {
    if (isSlateText(decendant)) {
      results.push(decendant.text);
    }
    if (isSlateElement(decendant)) {
      results.push(slateDecendantsToText(decendant.children));
    }
  }
  return results.filter(isDefined).join("\n");
};

export const textToSlateDefendants = (text?: string): Descendant[] => {
  if (!text || isEmpty(text)) {
    return [{ children: [{ text: "" }] }];
  }
  return text.split("\n").map((text) => ({ children: [{ text }] } as const));
};

const SlateLeaf: React.FC<RenderLeafProps & { isMasked?: boolean }> = ({
  attributes,
  children,
  leaf,
  isMasked,
}) => {
  return (
    <span {...attributes}>
      {isMasked
        ? leaf.text.split("").map((char, index) => <span key={index}>*</span>)
        : leaf.text}
    </span>
  );
};

export type AppTextAreaRef = {
  setValue: (value: string) => void;
  getValue: () => string | undefined;
  focus: () => void;
};

export const AppTextArea = forwardRef<
  AppTextAreaRef,
  Partial<{
    hotKey?: string;
    defaultValue: string;
    isMasked?: boolean;
    onChange?:
      | ((value: string, editor: BaseEditor & ReactEditor) => void)
      | undefined;
  }> &
    Omit<EditableProps, "defaultValue" | "onChange">
>(
  (
    {
      isMasked,
      hotKey,
      defaultValue,
      style = {},
      onChange = () => {},
      ...rest
    },
    ref
  ) => {
    const [editor] = useState(() => withReact(createEditor()));

    useImperativeHandle(ref, () => ({
      setValue: (value) => {
        Transforms.delete(editor, {
          at: {
            anchor: Editor.start(editor, []),
            focus: Editor.end(editor, []),
          },
        });
        if (!isEmpty(value)) {
          Transforms.insertNodes(editor, textToSlateDefendants(value));
        }
      },
      getValue: () => {
        return Node.string(editor);
      },
      focus: () => {
        Transforms.select(editor, { offset: 0, path: [0, 0] });
      },
    }));

    useMemo(() => {
      Transforms.select(editor, { offset: 0, path: [0, 0] });
    }, [editor]);
    const renderLeaf = (props: RenderLeafProps) => {
      return <SlateLeaf {...props} isMasked={isMasked} />;
    };
    return (
      <Slate
        onChange={(value) => {
          onChange(slateDecendantsToText(value), editor);
        }}
        editor={editor}
        initialValue={textToSlateDefendants(defaultValue)}
      >
        <Editable
          readOnly={isMasked}
          renderLeaf={isMasked ? renderLeaf : undefined}
          className="rt-reset rt-TextAreaInput"
          style={{
            fontSize: "var(--font-size-2)",
            lineHeight: "var(--line-height-2)",
            letterSpacing: "var(--letter-spacing-2)",
            overflow: "auto",
            maxWidth: "80ch",
            minWidth: "5ch",
            padding: "0.5em",
            outline: "1px solid var(--gray-8)",

            // outline: "none",
            borderRadius: "0.5em",
            ...style,
          }}
          {...rest}
        />
      </Slate>
    );
  }
);
