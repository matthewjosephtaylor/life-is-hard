
export const resumeAudioContext = async (audioContext: AudioContext) => {
  if (audioContext.state === "suspended") {
    try {
      await audioContext.resume();
      console.log("Speaker access granted");
    } catch (error) {
      // AppEvents.dispatchEvent(
      //   "toast",
      //   `error while resuming: ${
      //     error instanceof Error ? error.message : "not an error in catch"
      //   }`
      // );
      console.error("Error resuming audio context:", error);
      return undefined;
    }
  } else {
    console.log("Speaker access granted");
  }
};
