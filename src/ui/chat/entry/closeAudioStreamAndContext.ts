export const closeAudioStreamAndContext = async ({
  stream,
  audioContext,
}: {
  stream?: MediaStream;
  audioContext?: AudioContext;
}) => {
  console.log("closeAudioStreamAndContext", { stream, audioContext });
  // Stop all tracks of the media stream
  stream?.getTracks().forEach((track) => track.stop());

  // Close the audio context
  // Close the audio context and wait for it to close
  await audioContext?.close();

  // Check if the audio context is closed
  if (audioContext?.state === "closed") {
    console.log("Audio context is closed");
  } else {
    console.log("Failed to close audio context");
  }
};
