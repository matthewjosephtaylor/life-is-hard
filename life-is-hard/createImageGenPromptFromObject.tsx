import { safe } from "@mjtdev/engine";

export const createImageGenPromptFromObject = ({
  object,
  schemaName,
}: {
  object: unknown;
  schemaName?: string;
}) => {
  const objectText = safe(() => JSON.stringify(object), {
    quiet: true,
  });

  const info = `${schemaName} with the following properties: ${objectText}`;
  return {
    systemMessage:
      "use all image generation prompt engineering techniques to generate the best image possible. Only return the prompt itself!",
    userMessage: `Create an image generation prompt from the following: ${info}`,
  };
};
