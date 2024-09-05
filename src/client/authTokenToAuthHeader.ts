export const authTokenToAuthHeader = (authToken: string) => {
  return { Authorization: `Bearer ${authToken}` };
};
