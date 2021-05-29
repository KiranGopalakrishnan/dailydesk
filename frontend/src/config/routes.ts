import webpack from 'webpack';

export interface Route {
  isPublic: boolean;
  url: string;
}

export const routes: Record<string, Route> = {
  SIGN_IN: {
    url: '/sign-in',
    isPublic: true,
  },
  SIGN_UP: {
    url: '/sign-in',
    isPublic: true,
  },
  HOME: {
    url: '/home',
    isPublic: false,
  },
};

export const isPublic = (url: string) => {
  const route = Object.entries(routes).find(([key, value]) => value.url === url)?.[1];
  return !!route?.isPublic;
};
