import { TypeBoxes } from "@mjtdev/engine";
import type { AiplComponentContextConfig } from "./AiplComponentContextState";

export const mockConfig: AiplComponentContextConfig = {
  // homeUrl: "http://localhost:8787",
  // papId: "access-point-1723587253991-ff3eef0f-6a7f-415f-943a-a5fc81d0d3b4",
  homeUrl: "https://ai-worker.intelligage.workers.dev",
  papId: "access-point-1723591970176-b702a779-664d-47e1-9282-59ac12cbad73",
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
