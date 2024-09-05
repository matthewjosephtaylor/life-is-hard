import { Colors, Noises, Strings } from "@mjtdev/engine";
import { Box, Text } from "@radix-ui/themes";
import type { Thought } from "ai-worker-common";
import { waitTimeout } from "../../../common/waitTimeout";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { AnimatableDiv } from "../../animation/AnimatableDiv";
import { Easings } from "../../animation/Easings";
import { ElementAnimations } from "../../animation/ElementAnimations";
import { minusOneToOneRandom } from "../../animation/minusOneToOneRandom";
import { useThoughtDocumentsState } from "../ThoughtDocumentDisplay";

export const AnimatedThoughtItemDisplay = ({
  thoughtId,
  parentWidth,
  parentHeight,
  parentX,
  parentY,
  index,
}: {
  index: number;
  thoughtId: string;
  parentX: number | undefined;
  parentY: number | undefined;
  parentWidth: number | undefined;
  parentHeight: number | undefined;
}) => {
  console.log("ThoughtItemDisplay redrawing");
  const thought = DataObjectStates.useDataObject<Thought>(thoughtId);
  const { documentToPosition: documentToElement } = useThoughtDocumentsState();
  if (!thought) {
    return <></>;
  }
  if (!parentWidth || !parentHeight) {
    return <></>;
  }

  const { documents, score, texts, image, match } = thought;
  const originDoc = documents[0];
  const originElement = documentToElement[originDoc];

  // const originX =
  //   originElement && parentX
  //     ? originElement.getBoundingClientRect().left - parentX
  //     : 0;

  // const originY =
  //   originElement && parentY
  //     ? parentY - originElement.getBoundingClientRect().top
  //     : 0;

  // console.log("origins", { originX, originY, originDoc, originElement });

  const delay = Math.random() * 15 * index;
  // const delay = 0;
  const freezeDelay = 1000 * 10;
  const itemMargin = 200;
  // const originX = itemMargin / 2;
  // const originX = Math.random() * parentWidth;
  const originX = Math.random() * itemMargin;
  const opacityAnimation = ElementAnimations.createElementAnimation({
    // easing: Easings.easeInBounce,
    easing: Easings.linear,
    cssProperty: "opacity",
    frames: 60 * 3,
    from: 0,
    to: 1,
    delay,
    onEnd: async () => {
      await waitTimeout(freezeDelay);
      DataObjectStates.forgetDataObject(thoughtId);
    },
  });

  const positionXAnimation = ElementAnimations.createElementAnimation({
    easing: Easings.linear,
    cssProperty: "left",
    frames: 60 * 5,
    // from: originX,
    // from: originX,
    // from: originX,
    from: (parentWidth - itemMargin) * Math.random(),
    to: (parentWidth - itemMargin) * Math.random(),
    delay,
  });
  const positionYAnimation = ElementAnimations.createElementAnimation({
    easing: Easings.linear,
    cssProperty: "top",
    frames: 60 * 5,
    // from: originY,
    // from: 500,
    // from: parentHeight - itemMargin / 2,
    // from: 0 + itemMargin / 4,
    // from: (parentHeight - itemMargin) * Math.random(),
    from: 0,
    to: (parentHeight - itemMargin * 2) * Math.random(),
    delay,
  });
  const random = Noises.noiseStream(Strings.hashFnv32a({ str: thought.id }));

  const highlightBackgroundColor = Colors.from("yellow")
    .lighten(0.8)
    .toString();

  const highlighColor = Colors.textColor([highlightBackgroundColor]);

  return (
    <AnimatableDiv
      key={thought.id}
      animations={[opacityAnimation, positionXAnimation, positionYAnimation]}
      style={{
        position: "absolute",
        textAlign: "center",
        border: "1px solid grey",
        padding: "0.3em",
        borderRadius: "1em",
        maxWidth: "300px",
        maxHeight: "300px",
        // width: "20em",
        textOverflow: "ellipsis",
        overflow: "hidden",
        backgroundColor: "black",
        userSelect: "none",
        pointerEvents: "none",

        transform: `rotate(${5 * minusOneToOneRandom(random)}deg)`,
        // left: 100,
        // top: 100,
        opacity: 0,
      }}
    >
      <Box>
        {texts.map((t, i) => (
          <Text
            m="1"
            style={{
              color: t === match?.metadata.text ? "black" : undefined,
              backgroundColor:
                t === match?.metadata.text
                  ? highlightBackgroundColor
                  : undefined,
            }}
            key={i}
          >
            {t}
          </Text>
        ))}
      </Box>
    </AnimatableDiv>
  );
};
