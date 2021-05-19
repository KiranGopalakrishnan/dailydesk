export interface CookieData {
  key: string;
  maxAge: number;
  httpOnly: boolean;
}

export const getRefreshTokenCookieData = (expiry: number) => {
  return {
    key: 'REFRESH_TOKEN',
    maxAge: Math.floor(Date.now() / 1000),
    httpOnly: true,
  };
};
