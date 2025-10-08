
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, LoginDto, RegisterDto } from '../types.ts';
import { apiGateway } from '../services/apiGateway.ts';

type Theme = 'light' | 'dark' | 'system';

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  theme: Theme;
  login: (credentials: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
  setTheme: (theme: Theme) => void;
  initialize: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,
      theme: 'system',

      initialize: () => {
        const token = get().token;
        if (token) {
          apiGateway.setAuthToken(token);
          const user = apiGateway.auth.getProfile(token);
          if (user) {
            set({ user, isAuthenticated: true, isLoading: false });
          } else {
             set({ token: null, user: null, isAuthenticated: false, isLoading: false });
          }
        } else {
           set({ isLoading: false });
        }
      },
      
      login: async (credentials: LoginDto) => {
        set({ isLoading: true, error: null });
        try {
          const res = await apiGateway.auth.login(credentials);
          if (res.success && res.data) {
            const { token, user } = res.data;
            apiGateway.setAuthToken(token);
            set({ user, token, isAuthenticated: true, isLoading: false });
          } else {
            throw new Error(res.error || 'Login failed');
          }
        } catch (err: any) {
          set({ error: err.message, isLoading: false, isAuthenticated: false });
          throw err;
        }
      },

      register: async (data: RegisterDto) => {
        set({ isLoading: true, error: null });
        try {
          const res = await apiGateway.auth.register(data);
          if (!res.success) {
            throw new Error(res.error || 'Registration failed');
          }
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      },

      logout: () => {
        apiGateway.setAuthToken(null);
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },
      
      setTheme: (theme: Theme) => {
        set({ theme });
      },
    }),
    {
      name: 'user-storage', // key in storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Initialize auth state on app load
useUserStore.getState().initialize();
