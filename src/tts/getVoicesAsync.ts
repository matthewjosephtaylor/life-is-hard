// poor API design means we need this workaround

export const getVoicesAsync = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve, reject) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      return resolve(voices);
    }
    setTimeout(() => {
      //recursive timeout, what could go wrong?
      resolve(getVoicesAsync());
    }, 100);
  });
};
