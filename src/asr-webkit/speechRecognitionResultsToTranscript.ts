export type AsrUtterance = {
  text: string;
  confidence: number;
  isFinal: boolean;
};

export const speechRecognitionResultsToUtterances = (
  results: SpeechRecognitionResultList
) => {
  const utterances: AsrUtterance[] = [];
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    // console.log(`final: ${result.isFinal}`);
    result.isFinal;
    for (let j = 0; j < result.length; j++) {
      const item = result.item(j);
      // console.log(item.confidence);
      // console.log(item.transcript);

      utterances.push({
        confidence: item.confidence,
        text: item.transcript,
        isFinal: result.isFinal,
      });
    }
  }
  return utterances;
};
