import { memo } from "react";
import Markdown from "react-markdown";
import { stringifyEq } from "../stringifyEq";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
export const MarkdownTextDisplay = memo(({ text }: { text: string }) => {
  return (
    <Markdown
      rehypePlugins={[
        remarkGfm,
        [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }],
      ]}
    >
      {text}
    </Markdown>
  );
}, stringifyEq);
