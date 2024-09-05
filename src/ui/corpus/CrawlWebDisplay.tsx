import {
  Button,
  Flex, Slider, Text
} from "@radix-ui/themes";
import { useState } from "react";
import { AppMessagesState } from "../../state/ws/AppMessagesState";
import { FormInputDisplay } from "../form/FormInputDisplay";


export const CrawlWebDisplay = ({ parentId }: { parentId: string; }) => {
  const [maxRequestsPerCrawl, setMaxRequestsPerCrawl] = useState(1);
  const [url, setUrl] = useState("https://www.example.com");
  return (
    <Flex align={"center"} gap="9">
      <Flex gap="4" direction={"column"}>
        <FormInputDisplay
          title="URL"
          style={{ width: "20em" }}
          defaultValue={url}
          onChange={(value) => {
            setUrl(value);
          }} />
        <Flex gap="1" direction={"column"}>
          <Text as="label" size="2" mb="1" weight="bold">
            Max Requests per Crawl: {maxRequestsPerCrawl}
          </Text>
          <Slider
            onValueChange={(value) => setMaxRequestsPerCrawl(value[0])}
            defaultValue={[maxRequestsPerCrawl]}
            min={1}
            max={20} />
        </Flex>
      </Flex>
      <Button
        onClick={() => {
          const cleanUrl = url.startsWith("http") ? url : `https://${url}`;
          AppMessagesState.dispatch({
            type: "webCrawl",
            detail: {
              parentId,
              url: cleanUrl,
              maxRequestsPerCrawl: maxRequestsPerCrawl,
            },
          });
        }}
      >
        Crawl Website
      </Button>
    </Flex>
  );
};
