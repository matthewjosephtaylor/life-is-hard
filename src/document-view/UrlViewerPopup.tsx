import { Center } from "@mjtdev/engine";
import { AppBorder } from "../ui/agent/AppBorder";
import { Flex, Strong } from "@radix-ui/themes";

export const UrlViewerPopup = ({
  title,
  src,
  onSubmit,
}: {
  title?: string;
  src: string;
  onSubmit: () => void;
}) => {
  const okButton = (
    <Center>
      <input
        style={{ margin: "1em" }}
        onClick={() => onSubmit()}
        type="button"
        value="ok"
      />
    </Center>
  );
  // {/* {okButton} */}

  return (
    <Flex
      align={"center"}
      gap="4"
      direction={"column"}
      style={{
        overflow: "auto",
        maxWidth: "80vw",
        maxHeight: "80vh",
        width: "80vw",
        height: "80vh",
      }}
      // resizable={true}
    >
      <Strong>{title ?? src}</Strong>
      <object
        style={{ width: "100%", height: "100%" }}
        data={`${src}#toolbar=0&navpanes=0&scrollbar=0`}
      />
    </Flex>
  );
};
