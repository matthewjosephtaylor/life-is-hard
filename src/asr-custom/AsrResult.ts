export type AsrFastWhisperSegment = [
  id: number,
  seek: number,
  start: number,
  end: number,
  text: string,
  tokens: number[],
  temperature: number,
  avg_logprob: number,
  compression_ratio: number,
  no_speech_prob: number
];

export type AsrWhisperSegment = {
  id: number;
  seek: number;
  start: number;
  end: number;
  text: string;
  tokens: Array<number>;
  temperature: number;
  avg_logprob: number;
  compression_ratio: number;
  no_speech_prob: number;
};

export type AsrSegment = AsrFastWhisperSegment | AsrWhisperSegment;

export type AsrResult<T extends AsrSegment> = {
  text: string;
  segments: T[];
  language: string;
};

export const toAsrWhisperSegment = (value: AsrSegment): AsrWhisperSegment => {
  if (Array.isArray(value)) {
    return {
      id: value[0],
      seek: value[1],
      start: value[2],
      end: value[3],
      text: value[4],
      tokens: value[5],
      temperature: value[6],
      avg_logprob: value[7],
      compression_ratio: value[8],
      no_speech_prob: value[9],
    };
  }

  return value as AsrWhisperSegment;
};

export const toStandardAsrResult = <T extends AsrSegment>(
  value: AsrResult<T>
): AsrResult<AsrWhisperSegment> => {
  const { segments = [], ...rest } = value;
  return {
    ...rest,
    segments: segments.map((s) => toAsrWhisperSegment(s)),
  };
};
