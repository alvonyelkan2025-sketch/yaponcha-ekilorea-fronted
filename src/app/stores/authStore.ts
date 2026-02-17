import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  memberSince: string;
  referralCode: string;
  referredBy?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, referralCode?: string) => Promise<void>;
  socialLogin: (provider: 'google' | 'apple' | 'line') => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Mock login - would connect to real backend
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user: User = {
          id: '1',
          name: 'ユーザー様',
          email,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
          memberSince: new Date().toISOString(),
          referralCode: 'USER' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        };

        set({ user, isAuthenticated: true });
      },

      register: async (name: string, email: string, password: string, referralCode?: string) => {
        // Mock registration
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user: User = {
          id: Math.random().toString(36).substring(7),
          name,
          email,
          memberSince: new Date().toISOString(),
          referralCode: 'USER' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          referredBy: referralCode,
        };

        set({ user, isAuthenticated: true });
      },

      socialLogin: async (provider: 'google' | 'apple' | 'line') => {
        // Mock social login
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user: User = {
          id: Math.random().toString(36).substring(7),
          name: provider === 'google' ? 'Google User' : provider === 'apple' ? 'Apple User' : 'LINE User',
          email: `user@${provider}.com`,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
          memberSince: new Date().toISOString(),
          referralCode: 'USER' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        };

        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'ekilore-auth',
    }
  )
);
