export const isValidMP3 = (arrayBuffer: ArrayBuffer): boolean => {
  const dataView = new DataView(arrayBuffer);

  // Check for 'ID3' tag at the beginning of the file
  console.log("0", dataView.getUint8(0));
  console.log("1", dataView.getUint8(1));
  console.log("2", dataView.getUint8(2));
  if (
    dataView.getUint8(0) === 73 &&
    dataView.getUint8(1) === 68 &&
    dataView.getUint8(2) === 51
  ) {
    return true; // ID3 tag present
  }

  // Check for MP3 frame sync bits (11 bits set to 1)
  const frameSync =
    dataView.getUint8(0) === 255 && (dataView.getUint8(1) & 224) === 224;
  return frameSync;
};
