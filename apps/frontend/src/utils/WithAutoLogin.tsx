import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isPublic, routes } from '@config/routes';
import { AuthStatus, useAuthState } from '@store/auth/use-auth';

interface Props {
  children?: ReactNode;
}

export const WithAutoLogin: FC<Props> = ({ children }) => {
  const router = useRouter();
  const path = router.route;
  const isPublicRoute = isPublic(path);
  const { status } = useAuthState();

  useEffect(() => {
    console.error({ status, isPublicRoute, path });
    if (isPublicRoute) return;
    if (status === AuthStatus.LOGGED_IN) {
      router.push(routes.HOME.url);
      return;
    }
    router.push(routes.SIGN_IN.url);
    return;
  }, [isPublicRoute, status]);

  return <>{children}</>;
};
