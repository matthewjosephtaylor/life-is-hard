import { ButtonGroup, Center, openCenteredPopup } from "@mjtdev/engine";
import {
  Box,
  Container,
  Em,
  Flex,
  Heading,
  Section,
  Strong,
  Text,
} from "@radix-ui/themes";
import {
  updateAppState,
  storeAppState,
  getAppState,
} from "../state/app/AppState";
import { switchWindow } from "./switchWindow";
import { AsrCustoms } from "../asr-custom/AsrCustoms";
import { Ttss } from "../tts/Ttss";
import { AppModes } from "../state/location/AppModes";
import { AppButtonGroup } from "./common/AppButtonGroup";
import { DataObjectStates } from "../state/data-object/DataObjectStates";

export const WelcomeWindow = () => {
  const copy = ` 
  
  Welcome to our Application!
  Important Notice: This application employs artificial intelligence (AI) technology to generate content. Please note that we do not moderate or filter the output produced by the AI. As such, it is crucial that users acknowledge their responsibility for using this application. By continuing, you confirm that you are of legal adult age and voluntarily assume all risks associated with the use of this AI-powered tool, including any potentially explicit, offensive, or otherwise inappropriate content that may be generated.`;

  return (
    <Section>
      <Container size="1">
        <Flex gap="4" direction={"column"}>
          <Heading style={{ margin: "1em" }} align={"center"}>
            Welcome!
          </Heading>
          <Text size={"1"} style={{ margin: "1em" }} align={"center"}>
            Our app uses artificial intelligence to create content. For details
            on what to expect and your responsibilities when using our
            AI-powered tool, please review our{" "}
            <a href="https://intelligage.io/terms-and-conditions/">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="https://intelligage.io/privacy-policy/">Privacy Policy</a>.
          </Text>
          <Center>
            <AppButtonGroup
              style={{ padding: "2em" }}
              actions={{
                "I agree": async () => {
                  console.log("agreed to terms");
                  updateAppState((state) => {
                    state.agreedToTerms = true;
                  });
                  storeAppState();

                  await Ttss.enableTts();
                  await AsrCustoms.startCustomAsr();

                  if (AppModes.getAppModesAndParams().modes.includes("pap")) {
                    // AppModes.addAppMode("vox");
                    // const chat = await DataObjectStates.getChildDataObjects(
                    //   getAppState().appInterfaceId,
                    //   "chat",
                    //   "active"
                    // );
                    // console.log("active chat", chat);
                    return switchWindow("chat");
                  }
                  switchWindow("characters");
                },
                // "I disagree": () => {
                //   console.log("disagreed to terms");
                //   updateAppState((state) => {
                //     state.agreedToTerms = false;
                //   });
                //   storeAppState();
                //   openCenteredPopup(<div>Goodbye</div>);
                // },
              }}
            />
          </Center>
        </Flex>
      </Container>
    </Section>
  );
  {
    /* return (
    <TextScreen
      actions={{
        agree: async () => {
          console.log("agreed to terms");
          updateAppState((state) => {
            state.agreedToTerms = true;
          });
          storeAppState();
          // await openCreateUserPopup();
          switchWindow("user");
        },
        disagree: () => {
          console.log("disagreed to terms");
          updateAppState((state) => {
            state.agreedToTerms = false;
          });
          storeAppState();
          openCenteredPopup(<div>Goodbye</div>);
        },
      }}
      text={WELCOME_TEXT}
    />
  ); */
  }
};
