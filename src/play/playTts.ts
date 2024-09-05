import { speak } from "../tts/speak";

export const playTTS = async () => {
  // const resp = await fetch("http://gamepc.local:8020/tts_to_audio", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     // text: "Hello I am Alice, I wan to make you happy.",
  //     text: "Mmm, yeah I bet you'll love it. It's so good for you too, all those vegetables.",
  //     // speaker_wav: "female2",
  //     speaker_wav: "female",
  //     // speaker_wav: "anna-belle",
  //     // speaker_wav: "Emma Watson",
  //     language: "en",
  //   }),
  // });
  // const wav = await resp.blob();
  // const wav = await fetchAudioBlob("Hello there!");
  // console.log({ wav });
  // playAudioBlob(wav!);

  const text = `Here is a simple chicken soup recipe:

  Ingredients:
  
  * 2 lbs boneless, skinless chicken breast or thighs
  * 1 large onion, chopped
  * 3 cloves garlic, minced
  * 2 carrots, peeled and chopped
  * 2 celery stalks, chopped
  * 4 cups chicken broth
  * 1 tsp dried thyme
  * 1 tsp dried basil
  * Salt and pepper, to taste
  
  Instructions:
  
  1. In a large pot or Dutch oven, sauté the chicken, onion, and garlic over
  medium-high heat for about 5 minutes or until the chicken is browned.
  2. Add the carrots and celery to the pot and continue cooking for another 5
  minutes.
  3. Pour in the chicken broth and add the thyme and basil.
  4. Bring the soup to a boil, then reduce the heat and let simmer for 30 minutes.
  5. Season with salt and pepper to taste.
  6. Serve hot with some crusty bread.
  
  Enjoy!`;

  const text2 = `[I am so angry,] I went to the park and threw a ball`;

  // const fragments = sliceTextToFragments(text, TTS_LINE_DELIMITERS);
  // console.log(fragments);
  // AppEvents.dispatchEvent("aiResponseFragment", {
  //   time: Date.now(),
  //   value: text,
  // });

  speak({ text: text2 });
};
