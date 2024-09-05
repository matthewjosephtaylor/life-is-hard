import { TypeBoxes } from "@mjtdev/engine";
import type { AiplComponentContextConfig } from "./AiplComponentContextState";

export const mockConfig: AiplComponentContextConfig = {
  // homeUrl: "http://localhost:8787",
  // papId: "access-point-1723587253991-ff3eef0f-6a7f-415f-943a-a5fc81d0d3b4",
  homeUrl: "https://ai-worker.intelligage.workers.dev",
  papId: "access-point-1725394696984-a760a179-851e-48d0-b276-85e7a426239c",
  typeInfo: TypeBoxes.createTypeInfo((Type) => {
    return Type.Object(
      {
        size: Type.Union([
          Type.Literal("small"),
          Type.Literal("medium"),
          Type.Literal("large"),
        ]),
        crust: Type.Union([
          Type.Literal("thin"),
          Type.Literal("thick"),
          Type.Literal("stuffed"),
        ]),
        cheeseKind: Type.Union([
          Type.Literal("light"),
          Type.Literal("normal"),
          Type.Literal("extra"),
        ]),
        toppings: Type.Array(
          Type.Union([
            Type.Literal("pepperoni"),
            Type.Literal("mushrooms"),
            Type.Literal("onions"),
            Type.Literal("sausage"),
            Type.Literal("bacon"),
          ])
        ),
        peperoniSegment: Type.Union([
          Type.Literal("whole"),
          Type.Literal("left"),
          Type.Literal("right"),
        ]),
        mushroomsSegment: Type.Union([
          Type.Literal("whole"),
          Type.Literal("left"),
          Type.Literal("right"),
        ]),
        onionsSegment: Type.Union([
          Type.Literal("whole"),
          Type.Literal("left"),
          Type.Literal("right"),
        ]),
        sausageSegment: Type.Union([
          Type.Literal("whole"),
          Type.Literal("left"),
          Type.Literal("right"),
        ]),
        baconSegment: Type.Union([
          Type.Literal("whole"),
          Type.Literal("left"),
          Type.Literal("right"),
        ]),
        specialInstructions: Type.String(),
      },
      { $id: "Pizza" }
    );
  }),
};
