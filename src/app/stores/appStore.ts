import { create } from 'zustand';

interface AppState {
  sideDrawerOpen: boolean;
  authModalOpen: boolean;
  authModalMode: 'login' | 'register';
  notificationCount: number;
  
  toggleSideDrawer: () => void;
  closeSideDrawer: () => void;
  openAuthModal: (mode: 'login' | 'register') => void;
  closeAuthModal: () => void;
  setNotificationCount: (count: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sideDrawerOpen: false,
  authModalOpen: false,
  authModalMode: 'login',
  notificationCount: 3,
  
  toggleSideDrawer: () => set(state => ({ sideDrawerOpen: !state.sideDrawerOpen })),
  closeSideDrawer: () => set({ sideDrawerOpen: false }),
  openAuthModal: (mode: 'login' | 'register') => set({ authModalOpen: true, authModalMode: mode }),
  closeAuthModal: () => set({ authModalOpen: false }),
  setNotificationCount: (count: number) => set({ notificationCount: count }),
}));
