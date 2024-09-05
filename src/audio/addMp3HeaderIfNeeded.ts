// export const addMp3HeaderIfNeeded = (arrayBuffer: ArrayBuffer): ArrayBuffer => {
//   const dataView = new DataView(arrayBuffer);
//   const hasId3Tag =
//     dataView.getUint8(0) === 73 &&
//     dataView.getUint8(1) === 68 &&
//     dataView.getUint8(2) === 51;
//   const frameSync =
//     dataView.getUint8(0) === 255 && (dataView.getUint8(1) & 224) === 224;

import { isValidMP3 } from "./isValidMP3";


//   if (hasId3Tag || frameSync) {
//     return arrayBuffer; // Already valid MP3
//   }

//   const createMp3Header = (size: number): Uint8Array => {
//     const header = new Uint8Array(10);
//     header[0] = 73; // 'I'
//     header[1] = 68; // 'D'
//     header[2] = 51; // '3'
//     header[3] = 3; // Version 2.3.0
//     header[4] = 0; // Revision
//     header[5] = 0; // Flags

//     // Size is encoded in "syncsafe" integer, where each byte has 7 bits of data
//     header[6] = (size >> 21) & 127;
//     header[7] = (size >> 14) & 127;
//     header[8] = (size >> 7) & 127;
//     header[9] = size & 127;

//     return header;
//   };

//   // Calculate the size of the audio buffer and set the size in the header
//   const size = arrayBuffer.byteLength;
//   const mp3Header = createMp3Header(size);

//   // Add MP3 header
//   const combinedBuffer = new Uint8Array(
//     mp3Header.byteLength + arrayBuffer.byteLength
//   );
//   combinedBuffer.set(mp3Header, 0);
//   combinedBuffer.set(new Uint8Array(arrayBuffer), mp3Header.byteLength);

//   return combinedBuffer.buffer;
// };

export interface Mp3HeaderParams {
  version: number;
  revision: number;
  flags: number;
  size: number;
}

export const readMp3Header = (arrayBuffer: ArrayBuffer): Mp3HeaderParams => {
  const dataView = new DataView(arrayBuffer);

  if (
    !isValidMP3(arrayBuffer)
    // dataView.getUint8(0) !== 0x49 ||
    // dataView.getUint8(1) !== 0x44 ||
    // dataView.getUint8(2) !== 0x33
  ) {
    throw new Error("Invalid MP3 header");
  }

  const version = dataView.getUint8(3);
  const revision = dataView.getUint8(4);
  const flags = dataView.getUint8(5);
  const size =
    ((dataView.getUint8(6) & 0x7f) << 21) |
    ((dataView.getUint8(7) & 0x7f) << 14) |
    ((dataView.getUint8(8) & 0x7f) << 7) |
    (dataView.getUint8(9) & 0x7f);

  return { version, revision, flags, size };
};

export const createMp3Header = (
  params: Mp3HeaderParams,
  size: number
): Uint8Array => {
  const header = new Uint8Array(10);
  header[0] = 0x49; // 'I'
  header[1] = 0x44; // 'D'
  header[2] = 0x33; // '3'
  header[3] = params.version;
  header[4] = params.revision;
  header[5] = params.flags;

  // Size is encoded in "syncsafe" integer, where each byte has 7 bits of data
  header[6] = (size >> 21) & 0x7f;
  header[7] = (size >> 14) & 0x7f;
  header[8] = (size >> 7) & 0x7f;
  header[9] = size & 0x7f;

  return header;
};
export const addMp3Header = (
  arrayBuffer: ArrayBuffer,
  headerParams: Mp3HeaderParams
): ArrayBuffer => {
  const dataView = new DataView(arrayBuffer);
  const hasId3Tag =
    dataView.getUint8(0) === 0x49 &&
    dataView.getUint8(1) === 0x44 &&
    dataView.getUint8(2) === 0x33;
  const frameSync =
    dataView.getUint8(0) === 0xff && (dataView.getUint8(1) & 0xe0) === 0xe0;

  if (hasId3Tag || frameSync) {
    return arrayBuffer; // Already valid MP3
  }

  const size = arrayBuffer.byteLength;
  const mp3Header = createMp3Header(headerParams, size);

  // Add MP3 header
  const combinedBuffer = new Uint8Array(
    mp3Header.byteLength + arrayBuffer.byteLength
  );
  combinedBuffer.set(mp3Header, 0);
  combinedBuffer.set(new Uint8Array(arrayBuffer), mp3Header.byteLength);

  return combinedBuffer.buffer;
};
