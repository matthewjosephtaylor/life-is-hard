// export const chunkString = (str: string, size: number) => {
//   const numChunks = Math.ceil(str.length / size);
//   const chunks = new Array(numChunks);
//   for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
//     chunks[i] = str.substr(o, size);
//   }

//   return chunks;
// };

export const chunkString = (str: string, size: number): string[] => {
  // Initialize an array to hold the chunks
  const chunks: string[] = [];

  // Use a for loop to go over the string in increments of 'size'
  for (let i = 0; i < str.length; i += size) {
    // Slice the string from the current index 'i' up to 'i + size'
    // and push it into the 'chunks' array
    chunks.push(str.slice(i, i + size));
  }

  // Return the array of chunks
  return chunks;
};
