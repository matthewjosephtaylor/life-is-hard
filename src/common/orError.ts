export const orError = async <T>(
  func: () => Promise<T>
): Promise<Promise<T | Error> | Error> => {
  try {
    const value = await func();
    return value;
  } catch (err) {
    if (err instanceof Error) {
      return err;
    }
    return new Error(String(err));
  }
};
