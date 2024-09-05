function createWavHeader(
  dataLength: number,
  sampleRate: number,
  numChannels: number = 1,
  bitDepth: number = 16
): ArrayBuffer {
  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  const writeString = (
    view: DataView,
    offset: number,
    string: string
  ): void => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(view, 0, "RIFF"); // ChunkID
  view.setUint32(4, 36 + dataLength, true); // ChunkSize
  writeString(view, 8, "WAVE"); // Format
  writeString(view, 12, "fmt "); // Subchunk1ID
  view.setUint32(16, 16, true); // Subchunk1Size
  view.setUint16(20, 1, true); // AudioFormat
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, (sampleRate * numChannels * bitDepth) / 8, true); // ByteRate
  view.setUint16(32, (numChannels * bitDepth) / 8, true); // BlockAlign
  view.setUint16(34, bitDepth, true); // BitsPerSample
  writeString(view, 36, "data"); // Subchunk2ID
  view.setUint32(40, dataLength, true); // Subchunk2Size

  return header;
}

export function pcmToWav(
  pcmData: ArrayBuffer,
  sampleRate: number
): ArrayBuffer {
  const wavHeader = createWavHeader(pcmData.byteLength, sampleRate);
  const wavBuffer = new Uint8Array(wavHeader.byteLength + pcmData.byteLength);
  wavBuffer.set(new Uint8Array(wavHeader), 0);
  wavBuffer.set(new Uint8Array(pcmData), wavHeader.byteLength);

  return wavBuffer.buffer;
}
