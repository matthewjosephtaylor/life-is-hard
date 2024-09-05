
export const isUrlLike = (text: string | undefined) => {
  if (!text) {
    return false;
  }

  return /^http/i.test(text.trim());
};
