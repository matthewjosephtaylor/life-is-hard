import { useTtsState } from "../../tts/TtsState";
import { useUserState } from "../../state/user/UserState";

export const BrowserVoiceControlEditor = ({ voiceId }: { voiceId: string }) => {
  const { id: userId } = useUserState();
  const { voices } = useTtsState();
  if (!userId) {
    return <>No userId</>;
  }
  return <>TBD BrowserVoiceControlEditor</>;

  // const voice = DataIndexesStates.useUserDataIndexStateRecord({
  //   objectType: "voice",
  //   recordId: voiceId,
  //   userId,
  // });
  // if (!voice) {
  //   return <>Missing voice: {voiceId}</>;
  // }
  // const { browserVoiceConfig } = voice;

  // const { voiceName, delay = 0, pitch = 1, rate = 1 } = browserVoiceConfig;
  // return (
  //   <AppBorder title="browser voice controls">
  //     <Grid
  //       style={{ width: "min-content", height: "min-content" }}
  //       cellSize={"min-content"}
  //       direction="row"
  //     >
  //       <FormSelectDisplay
  //         onChange={(value) => {
  //           DataIndexesStates.updateUserDataIndexStateRecord({
  //             userId,
  //             objectType: "voice",
  //             recordId: voiceId,
  //             updater: (v) => {
  //               v.browserVoiceConfig.voiceName = value;
  //             },
  //           });
  //           setupAsr(true);
  //         }}
  //         defaultValue={voiceName}
  //         title="voice names"
  //       >
  //         {voices.map((v, i) => (
  //           <option key={i} value={v.name}>
  //             {v.name}
  //           </option>
  //         ))}
  //       </FormSelectDisplay>
  //       <Grid
  //         style={{ width: "min-content", height: "min-content" }}
  //         direction="row"
  //         cellSize={"min-content"}
  //       >
  //         <Grid direction="column">
  //           <Border resizable={false} title={`pitch ${pitch}`}>
  //             <input
  //               type="range"
  //               min="0"
  //               max="2"
  //               step={"0.01"}
  //               defaultValue={`${pitch}`}
  //               onChange={(evt) => {
  //                 DataIndexesStates.updateUserDataIndexStateRecord({
  //                   userId,
  //                   objectType: "voice",
  //                   recordId: voiceId,
  //                   updater: (v) => {
  //                     v.browserVoiceConfig.pitch = Number(
  //                       evt.currentTarget.value
  //                     );
  //                   },
  //                 });
  //                 setupAsr(true);
  //               }}
  //             />
  //           </Border>
  //           <Border resizable={false} title={`rate ${rate}`}>
  //             <input
  //               type="range"
  //               min="0"
  //               max="2"
  //               step={"0.01"}
  //               defaultValue={`${rate}`}
  //               onChange={(evt) => {
  //                 DataIndexesStates.updateUserDataIndexStateRecord({
  //                   userId,
  //                   objectType: "voice",
  //                   recordId: voiceId,
  //                   updater: (v) => {
  //                     v.browserVoiceConfig.rate = Number(
  //                       evt.currentTarget.value
  //                     );
  //                   },
  //                 });
  //                 setupAsr(true);
  //               }}
  //             />
  //           </Border>
  //           <Border resizable={false} title={`delay ${delay}`}>
  //             <input
  //               type="range"
  //               min="0"
  //               max="5000"
  //               step={"1"}
  //               defaultValue={`${delay}`}
  //               onChange={(evt) => {
  //                 DataIndexesStates.updateUserDataIndexStateRecord({
  //                   userId,
  //                   objectType: "voice",
  //                   recordId: voiceId,
  //                   updater: (v) => {
  //                     v.browserVoiceConfig.delay = Number(
  //                       evt.currentTarget.value
  //                     );
  //                   },
  //                 });
  //                 setupAsr(true);
  //               }}
  //             />
  //           </Border>
  //         </Grid>
  //       </Grid>
  //     </Grid>
  //   </AppBorder>
  // );
};
