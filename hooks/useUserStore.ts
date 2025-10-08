
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiGateway } from '../services/apiGateway';
import type { User, Wallet, LoginDto, RegisterDto, Tokens } from '../types';

type Theme = 'light' | 'dark' | 'system';

interface UserState {
    user: User | null;
    wallet: Wallet | null;
    tokens: Tokens | null;
    isAuthenticated: boolean;
    isOffline: boolean;
    theme: Theme;
    error: string | null;
    isLoading: boolean;
    login: (dto: LoginDto) => Promise<void>;
    register: (dto: RegisterDto) => Promise<void>;
    logout: () => void;
    setTheme: (theme: Theme) => void;
    toggleOfflineMode: () => void;
    refreshWallet: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            wallet: null,
            tokens: null,
            isAuthenticated: false,
            isOffline: false,
            theme: 'system',
            error: null,
            isLoading: false,

            login: async (dto: LoginDto) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await apiGateway.auth.login(dto);
                    if (response.success) {
                        const { user, wallet, tokens } = response.data;
                        apiGateway.setAuthToken(tokens.accessToken);
                        set({
                            user,
                            wallet,
                            tokens,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                    }
                } catch (err: any) {
                    const error = err.message || 'Login failed.';
                    set({ error, isLoading: false, isAuthenticated: false });
                    throw new Error(error);
                }
            },
            
            register: async (dto: RegisterDto) => {
                set({ isLoading: true, error: null });
                 try {
                    const response = await apiGateway.auth.register(dto);
                    if (response.success) {
                        // Don't auto-login, let them go to the login screen
                        set({ isLoading: false });
                    }
                } catch (err: any) {
                    const error = err.message || 'Registration failed.';
                    set({ error, isLoading: false });
                    throw new Error(error);
                }
            },

            logout: () => {
                apiGateway.setAuthToken(null);
                set({
                    user: null,
                    wallet: null,
                    tokens: null,
                    isAuthenticated: false,
                    error: null,
                });
            },
            
            setTheme: (theme: Theme) => {
                set({ theme });
            },

            toggleOfflineMode: () => {
                 set(state => ({ isOffline: !state.isOffline }));
            },

            refreshWallet: async () => {
                const { user } = get();
                if (!user) return;
                try {
                    const response = await apiGateway.wallet.getWalletByUserId(user.id);
                    if (response.success && response.data) {
                        set({ wallet: response.data });
                    }
                } catch (err) {
                    console.error("Failed to refresh wallet:", err);
                }
            }
        }),
        {
            name: 'smart-pay-user-storage', // key in storage
            partialize: (state) => ({ 
                user: state.user, 
                wallet: state.wallet,
                tokens: state.tokens,
                isAuthenticated: state.isAuthenticated,
                theme: state.theme
            }), // only persist these parts of the state
        }
    )
);
