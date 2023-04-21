export const extractAuthToken = (authHeader: string) => {
  const [, token] = authHeader.split(' ');
  return token;
};
