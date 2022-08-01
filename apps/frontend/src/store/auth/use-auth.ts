import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Profile {
  email: string | null;
}

export enum AuthStatus {
  LOGGED_IN = 'LOGGED_IN',
  UNDETERMINED = 'UNDETERMINED',
  LOGGED_OUT = 'LOGGED_OUT',
}

interface AuthState {
  profile: Profile | null;
  status: AuthStatus;
  setProfile: (profile: Profile) => void;
  setAuthStatus: (status: AuthStatus) => void;
}

export const useAuthState = create<AuthState>()(
  devtools(
    persist((set) => ({
      profile: null,
      status: AuthStatus.UNDETERMINED,
      setProfile: (profile) => set(() => ({ profile })),
      setAuthStatus: (status) => status,
    }))
  )
);
