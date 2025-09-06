import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppState {
  // Wallet state
  ethWalletAddress: string | null;

  // Actions
  setEthWalletAddress: (address: string | null) => void;

  // Reset function
  reset: () => void;
}

const initialState = {
  ethWalletAddress: null,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      // Actions
      setEthWalletAddress: (address) => set({ ethWalletAddress: address }),

      // Reset all state to initial values
      reset: () => set(initialState),
    }),
    {
      name: 'app-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage

      // Optional: specify which parts of the state to persist
      partialize: (state) => ({
        ethWalletAddress: state.ethWalletAddress,
      }),

      // Optional: version for migration support
      version: 1,
    },
  ),
);
