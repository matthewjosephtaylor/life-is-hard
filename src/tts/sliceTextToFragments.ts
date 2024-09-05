import { detectStopAfter } from "../chat/detectStopAfter";


export const sliceTextToFragments = (text: string, delimiters: string[]) => {
  let unparsed = text;
  const fragments: string[] = [];
  while (unparsed.length > 0) {
    const [stoppedFragment, isStopped] = detectStopAfter(unparsed, delimiters);
    if (stoppedFragment) {
      fragments.push(stoppedFragment);
      unparsed = unparsed.slice(stoppedFragment.length);
      continue;
    }
    break;
  }
  return fragments;
};
