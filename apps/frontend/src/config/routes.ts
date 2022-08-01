export interface Route {
  isPublic: boolean;
  url: string;
  as: (
    this: Route,
    params: Record<string, string>,
    query?: Record<string, string>
  ) => string;
}

function as(
  this: Route,
  params: Record<string, string>,
  query?: Record<string, string>
): string {
  const url = this.url;
  if (!params) return url;

  const keys = Object.keys(params);
  return keys.reduce((acc, current) => {
    return url.replace(`[${current}]`, params[current]);
  }, url);
}

export enum Routes {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  HOME = 'HOME',
}

export const routes: Record<Routes, Route> = {
  [Routes.SIGN_IN]: {
    url: '/sign-in',
    as,
    isPublic: true,
  },
  [Routes.SIGN_UP]: {
    url: '/sign-up',
    as,
    isPublic: true,
  },
  [Routes.HOME]: {
    url: '/home',
    as,
    isPublic: false,
  },
};

export const isPublic = (url: string) => {
  const route = Object.entries(routes).find(
    ([key, value]) => value.url === url
  )?.[1];
  console.error(route);
  return !!route?.isPublic;
};
