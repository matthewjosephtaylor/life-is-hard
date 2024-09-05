async function decodeAudioData(
  audioContext: AudioContext,
  arrayBuffer: ArrayBuffer
): Promise<AudioBuffer> {
  return audioContext.decodeAudioData(arrayBuffer);
}

function concatenateAudioBuffers(
  audioBuffers: AudioBuffer[],
  audioContext: AudioContext
): AudioBuffer {
  const numberOfChannels = audioBuffers[0].numberOfChannels;
  const length = audioBuffers.reduce((sum, buffer) => sum + buffer.length, 0);
  const sampleRate = audioBuffers[0].sampleRate;
  const outputBuffer = audioContext.createBuffer(
    numberOfChannels,
    length,
    sampleRate
  );

  let offset = 0;
  for (const buffer of audioBuffers) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      outputBuffer
        .getChannelData(channel)
        .set(buffer.getChannelData(channel), offset);
    }
    offset += buffer.length;
  }

  return outputBuffer;
}

function encodeWAV(audioBuffer: AudioBuffer): ArrayBuffer {
  const numberOfChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const length = audioBuffer.length * numberOfChannels * 2 + 44;
  const arrayBuffer = new ArrayBuffer(length);
  const view = new DataView(arrayBuffer);

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  let offset = 0;

  // RIFF chunk descriptor
  writeString(view, offset, "RIFF");
  offset += 4;
  view.setUint32(offset, 36 + audioBuffer.length * numberOfChannels * 2, true);
  offset += 4;
  writeString(view, offset, "WAVE");
  offset += 4;

  // fmt sub-chunk
  writeString(view, offset, "fmt ");
  offset += 4;
  view.setUint32(offset, 16, true);
  offset += 4;
  view.setUint16(offset, 1, true);
  offset += 2;
  view.setUint16(offset, numberOfChannels, true);
  offset += 2;
  view.setUint32(offset, sampleRate, true);
  offset += 4;
  view.setUint32(offset, sampleRate * numberOfChannels * 2, true);
  offset += 4;
  view.setUint16(offset, numberOfChannels * 2, true);
  offset += 2;
  view.setUint16(offset, 16, true);
  offset += 2;

  // data sub-chunk
  writeString(view, offset, "data");
  offset += 4;
  view.setUint32(offset, audioBuffer.length * numberOfChannels * 2, true);
  offset += 4;

  for (let i = 0; i < audioBuffer.length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = audioBuffer.getChannelData(channel)[i];
      view.setInt16(
        offset,
        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
        true
      );
      offset += 2;
    }
  }

  return arrayBuffer;
}

export async function stitchAudioArrayBuffers(
  arrayBuffers: ArrayBuffer[]
): Promise<ArrayBuffer> {
  const audioContext = new AudioContext();
  const audioBuffers = await Promise.all(
    arrayBuffers.map((buffer) => decodeAudioData(audioContext, buffer))
  );
  const concatenatedBuffer = concatenateAudioBuffers(
    audioBuffers,
    audioContext
  );
  return encodeWAV(concatenatedBuffer);
}
