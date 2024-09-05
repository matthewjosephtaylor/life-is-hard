export async function getMicrophoneInput() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);

    return { audioContext, source, stream }; // Returning the audio context and analyser
  } catch (error) {
    throw new Error("Unable to access microphone", { cause: error });
  }
}
