import { TypeBoxes } from "@mjtdev/engine";

export const StoryTypeInfo = TypeBoxes.createTypeInfo((Type) => {
  return Type.Object(
    {
      name: Type.String(),
      setting: Type.String(),
      genre: Type.Union([Type.Literal("Fantasy"), Type.Literal("Sci-Fi")]),
      locations: Type.Array(Type.String()),
      characters: Type.Array(Type.String()),
      entityDescriptions: Type.Record(Type.String(), Type.String(), {
        description:
          "A description of the entities such as locations and characters",
      }),
    },
    { $id: "Story" }
  );
});
