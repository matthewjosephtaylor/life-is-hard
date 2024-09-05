// import { openCenteredPopup } from "@mjtdev/engine";
// import { ImageGenerationPopup } from "./ImageGenerationPopup";
// import { GeneratedImage } from "./GeneratedImage";

// export const openImageGenerationPopup = ({
//   defaultImage,
//   defaultPrompt,
//   onGeneratePrompt,
// }: Partial<{
//   defaultImage: Blob;
//   defaultPrompt: string;
//   onGeneratePrompt?: (prompt: string) => Promise<string|undefined>;
// }> = {}): Promise<GeneratedImage | undefined> => {
//   return new Promise((resolve, reject) => {
//     const name = crypto.randomUUID();
//     openCenteredPopup(
//       <ImageGenerationPopup
//         defaultImageId={defaultImage}
//         defaultPrompt={defaultPrompt}
//         onSubmit={(value) => resolve(value)}
//         onGeneratePrompt={onGeneratePrompt}
//         name={name}
//       />,
//       { name, onClose: () => resolve(undefined) }
//     );
//   });
// };
