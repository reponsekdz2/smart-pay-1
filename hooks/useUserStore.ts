
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { apiGateway } from '../services/apiGateway';
import type { User, Wallet, LoginDto, RegisterDto } from '../types';

type Theme = 'light' | 'dark' | 'system';

interface UserState {
  user: User | null;
  wallet: Wallet | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  theme: Theme;
  isOffline: boolean;

  // Actions
  login: (credentials: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
  rehydrate: () => void;
  refreshWallet: () => Promise<void>;
  setTheme: (theme: Theme) => void;
  toggleOfflineMode: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      wallet: null,
      token: null,
      isAuthenticated: false,
      isLoading: true, // Start with loading true to check for persisted token
      error: null,
      theme: 'system',
      isOffline: false,

      rehydrate: () => {
        const token = get().token;
        if (token) {
          apiGateway.setAuthToken(token);
          set({ isAuthenticated: true, isLoading: true });
          apiGateway.auth.getProfile()
            .then(res => {
              if (res.success) {
                set({ user: res.data });
                get().refreshWallet();
              } else {
                get().logout();
              }
            })
            .catch(() => get().logout())
            .finally(() => set({ isLoading: false }));
        } else {
          set({ isLoading: false });
        }
      },
      
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const res = await apiGateway.auth.login(credentials);
          if (res.success) {
            const { user, token, wallet } = res.data;
            apiGateway.setAuthToken(token);
            set({ user, token, wallet, isAuthenticated: true, error: null });
          }
        } catch (err: any) {
          set({ error: err.message });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
            await apiGateway.auth.register(data);
        } catch (err: any) {
            set({ error: err.message });
            throw err;
        } finally {
            set({ isLoading: false });
        }
      },

      logout: () => {
        apiGateway.setAuthToken(null);
        set({ user: null, token: null, wallet: null, isAuthenticated: false });
      },

      refreshWallet: async () => {
        const userId = get().user?.id;
        if (!userId) return;
        try {
          const res = await apiGateway.wallet.getWalletByUserId(userId);
          if (res.success && res.data) {
            set({ wallet: res.data });
          }
        } catch (err) {
          console.error("Failed to refresh wallet", err);
        }
      },

      setTheme: (theme) => {
        set({ theme });
      },
      
      toggleOfflineMode: () => {
        set(state => ({ isOffline: !state.isOffline }));
      }
    }),
    {
      name: 'smartpay-user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, theme: state.theme }), // Only persist token and theme
    }
  )
);
