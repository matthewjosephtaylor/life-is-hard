
export const orErrorSync = <T>(func: () => T): T | Error => {
  try {
    const value = func();
    return value;
  } catch (err) {
    if (err instanceof Error) {
      return err;
    }
    return new Error(String(err));
  }
};
