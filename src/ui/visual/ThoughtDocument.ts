export type ThoughtDocument = {
  id: string;
  name?: string;
  mediaType?: string;
  dataId?: string;
  size?: number;
  text?: string;
};

export const createThoughtDocument = (
  draft: Partial<ThoughtDocument> = {}
): ThoughtDocument => {
  const {
    dataId,
    id = dataId ?? `thought-document-${crypto.randomUUID()}`,
    mediaType,
    name,
    size,
    text,
  } = draft;

  return {
    id,
    dataId,
    mediaType,
    name,
    size,
    text,
  };
};
