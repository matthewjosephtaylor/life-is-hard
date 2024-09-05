import { Grid, isEmpty } from "@mjtdev/engine";
import { useEffect, useState } from "react";
import { useCharacter } from "../../character/useCharacter";
import { useChatState } from "../../chat/ChatState";
import { askQuestionOfChatId } from "../../chat/askQuestionOfChatId";
import { PALLET } from "../PALLET";
import { AppBorder } from "../agent/AppBorder";
import { parseTextToList } from "../common/parseTextToList";
import { useGoalsState, updateGoalsState } from "./useGoalsState";
import { toCommonCases } from "./toCommonCases";
import { constrainString } from "./constrainString";

const GOAL_RESPONSES = ["unknown", "achieved", "failed"] as const;

type GoalResponseType = (typeof GOAL_RESPONSES)[number];

const GOAL_COLORS: Record<GoalResponseType, string> = {
  achieved: PALLET.success,
  failed: PALLET.fail,
  unknown: PALLET.unknown,
};

export const GoalDisplay = ({ goal }: { goal: string }) => {
  const { messageIds, aiCharacterId } = useChatState();
  const aiCharacter = useCharacter(aiCharacterId);
  const [ans, setAns] = useState("");
  useEffect(() => {
    if (!goal || isEmpty(goal) || !aiCharacter) {
      return;
    }
    const question = `yes, no, or unknown. Has the goal of '${goal}' for ${aiCharacter?.card.data.name} been achieved in the above conversation?`;
    const stopAfter = GOAL_RESPONSES.map(toCommonCases).flat();
    const directions = [
      "You are an expert conversation analyst.",
      "You only answer questions about the current conversation",
      "You only answer 'achieved'or 'failed' if you are 100% sure of the answer, otherwise answer 'unknown'.",
      "You are a truthful AI program that only responds with 'achieved', 'failed', or 'unknown'",
    ].join("\n");
    askQuestionOfChatId({
      systemMessage: directions,
      userMessage: question,
      stopAfter,
    }).then((resp) => {
      if (!resp) {
        return;
      }
      setAns(resp);
    });
  }, [goal, aiCharacter, messageIds]);

  const constrainedAnswer = constrainString({
    value: ans,
    possibles: GOAL_RESPONSES,
    defaultValue: GOAL_RESPONSES[0],
  });
  const color = GOAL_COLORS[constrainedAnswer] ?? GOAL_COLORS.unknown;
  return [
    <div style={{ color }} key={ans}>
      {constrainedAnswer}
    </div>,
    <div style={{ width: "40em" }} key={goal}>
      {goal}
    </div>,
  ];
};

export const GoalsDisplay = () => {
  const { id, aiCharacterId } = useChatState();
  const character = useCharacter(aiCharacterId);
  const { enabled, goals } = useGoalsState();

  useEffect(() => {
    if (!character || !enabled) {
      console.log("bailing...");
      updateGoalsState((state) => {
        state.goals = [];
      });
      return;
    }
    const question = `Give me a an ordered numbered list of the goals for ${character.card.data.name}`;
    askQuestionOfChatId({
      systemMessage: "You are a truthful AI",
      userMessage: question,
    }).then((resp) => {
      if (!resp) {
        return;
      }
      updateGoalsState((state) => {
        const goals = parseTextToList(resp);
        state.goals = goals;
      });
    });
  }, [enabled, character, id]);
  return (
    <AppBorder key={id} title="goals">
      <AppBorder title="enabled">
        <input
          onChange={(evt) => {
            updateGoalsState((state) => {
              state.enabled = evt.currentTarget.checked;
            });
          }}
          type="checkbox"
          checked={enabled}
        />
      </AppBorder>
      <Grid direction="column" gap="1em" count={2} cellSize={"min-content"}>
        <h4>status</h4>
        <h4>goal</h4>
        {enabled
          ? goals.map((g, i) => <GoalDisplay key={i} goal={g} />).flat()
          : undefined}
      </Grid>
    </AppBorder>
  );
};
