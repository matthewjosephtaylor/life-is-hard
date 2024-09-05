export const releaseSpeakerAccess = async (
  audioContext: AudioContext | null
): Promise<void> => {
  if (audioContext && audioContext.state !== "closed") {
    try {
      await audioContext.close();
      console.log("Speaker access released");
    } catch (error) {
      console.error("Error closing audio context:", error);
    }
  } else {
    console.log("Audio context is already closed or not initialized");
  }
};
