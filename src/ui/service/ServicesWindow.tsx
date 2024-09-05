import {
  Button,
  Container,
  Flex,
  Section,
} from "@radix-ui/themes";
import { AppObjects } from "ai-worker-common";
import { CSSProperties, useEffect } from "react";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { openEditAppServicePopup } from "./openEditAppServicePopup";
import { AppServiceNodesDisplay } from "./AppServiceNodesDisplay";
import { AppServicesDisplay } from "./AppServicesDisplay";

export const ServicesWindow = () => {
  const services = DataObjectStates.useDataObjectsByType("app-service");
  const nodes = DataObjectStates.useDataObjectsByType("app-service-node");
  useEffect(() => {
    DataObjectStates.findAllDataObjectsByObjectType("app-service");
    DataObjectStates.findAllDataObjectsByObjectType("app-service-node");
  }, []);

  return (
    <Section>
      <Container>
        <Flex
          style={{ maxHeight: "calc(80vh - 5em)", overflow: "auto" }}
          align={"center"}
          direction={"column"}
          gap="2"
        >
          <Flex gap="9">
            <Button
              color="amber"
              onClick={() =>
                openEditAppServicePopup(AppObjects.create("app-service"))
              }
            >
              Create Service
            </Button>
            <Button
              onClick={() =>
                DataObjectStates.findAllDataObjectsByObjectType("app-service")
              }
            >
              Refresh
            </Button>
          </Flex>
          <Flex direction={"column"} gap="4" align={"start"}>
            <AppServicesDisplay services={services} />
            <AppServiceNodesDisplay nodes={nodes} />
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
};
