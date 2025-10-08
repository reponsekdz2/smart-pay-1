import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { apiGateway } from '../services/apiGateway.ts';
import type { User, LoginDto, RegisterDto } from '../types.ts';

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
    fetchUser: () => Promise<void>;
    setTheme: (theme: Theme) => void;
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

            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await apiGateway.auth.login(credentials);
                    if (response.success && response.data) {
                        const { user, token } = response.data;
                        apiGateway.setAuthToken(token);
                        set({ user, token, isAuthenticated: true, isLoading: false, error: null });
                    } else {
                        throw new Error(response.error || 'Login failed');
                    }
                } catch (err: any) {
                    set({ error: err.message, isLoading: false, isAuthenticated: false });
                    throw err;
                }
            },

            register: async (data) => {
                 set({ isLoading: true, error: null });
                try {
                    const response = await apiGateway.auth.register(data);
                    if (!response.success) {
                        throw new Error(response.error || 'Registration failed');
                    }
                } catch (err: any) {
                     set({ error: err.message, isLoading: false });
                    throw err;
                }
            },

            logout: () => {
                apiGateway.setAuthToken(null);
                set({ user: null, token: null, isAuthenticated: false });
            },

            fetchUser: async () => {
                const token = get().token;
                if (token) {
                    set({ isLoading: true });
                    apiGateway.setAuthToken(token);
                    const response = await apiGateway.auth.me();
                    if (response.success && response.data) {
                        set({ user: response.data, isAuthenticated: true, isLoading: false });
                    } else {
                        get().logout(); // Token is invalid, log out
                        set({ isLoading: false });
                    }
                } else {
                     set({ isLoading: false });
                }
            },

            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// Initial fetch on app load
useUserStore.getState().fetchUser();
