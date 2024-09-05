import { Flex, Grid, Strong, Text } from "@radix-ui/themes";
import type { AppMessageMap } from "ai-worker-common";
import { MarkdownTextDisplay } from "../ui/chat/message/MarkdownTextDisplay";
const isLogDetail = (maybe: unknown): maybe is AppMessageMap["log"] => {
  const straw = maybe as AppMessageMap["log"];
  return typeof straw === "object" && typeof straw.level === "string";
};

const parseStackTrace = (stackTrace: string) => {
  const regex = /^\s*at\s+(.*?)\s+\((.*?)\)/gm;
  let match;
  const parsed = [];

  while ((match = regex.exec(stackTrace))) {
    parsed.push({
      functionName: match[1],
      fileDetails: match[2],
    });
  }

  return parsed;
};

export const StackTrace = ({ stackTrace }: { stackTrace?: string }) => {
  if (!stackTrace) {
    return <></>;
  }
  const parsedStackTrace = parseStackTrace(stackTrace);

  return (
    <Grid columns="2" gap="2">
      {parsedStackTrace.flatMap((item, index) => [
        <Text key={`${index}-functionName`} color="amber">
          {item.functionName}
        </Text>,
        <Text size={"1"} key={`${index}-fineDetails`} color="brown">
          {item.fileDetails}
        </Text>,
      ])}
    </Grid>
  );
};

export const UnknownErrorDisplay = ({ error }: { error: unknown }) => {
  // if (error instanceof Error) {
  //   return error.message;
  // }
  // if (typeof error === "string") {
  //   return error;
  // }
  if (isLogDetail(error) || error instanceof Error) {
    return (
      <Flex
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          overflowWrap: "break-word",
        }}
        gap="2"
        direction="column"
      >
        <Flex>
          <Text color="cyan">{error.message ?? ""}</Text>
        </Flex>
        <StackTrace stackTrace={error.stack} />
        <Flex>
          <Text color="orange">
            {isLogDetail(error)
              ? error?.extra
                ? JSON.stringify(error?.extra, undefined, 2)
                : ""
              : ""}
          </Text>
        </Flex>
        <Flex>
          {error.cause ? (
            <UnknownErrorDisplay error={error.cause} />
          ) : undefined}
        </Flex>
      </Flex>
    );
  }

  return (
    <Text
      style={{
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        overflowWrap: "break-word",
      }}
    >
      {String(error)}
    </Text>
  );
};

export const ErrorPopup = ({ error }: { error: unknown }) => {
  console.log("ErrorPopup", { error });
  return (
    <Flex
      style={{ maxHeight: "50vh", overflow: "auto" }}
      direction={"column"}
      gap="4"
      align={"center"}
    >
      <Strong>
        <Text color="red">Unexpected Error</Text>
      </Strong>
      <UnknownErrorDisplay error={error} />
    </Flex>
  );
};
