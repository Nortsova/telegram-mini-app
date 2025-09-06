import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface ChatGroup {
  id: string;
  name: string;
  messageCount: number;
  earnings: number;
  rewards: number;
}

interface AppState {
  // Wallet state
  ethWalletAddress: string | null;

  // Chat state
  chats: ChatGroup[];

  // Actions
  setEthWalletAddress: (address: string | null) => void;
  addChat: (chat: Omit<ChatGroup, 'id'>) => void;
  removeChat: (chatId: string) => void;
  updateChat: (chatId: string, updates: Partial<Omit<ChatGroup, 'id'>>) => void;

  // Reset function
  reset: () => void;
}

const initialState = {
  ethWalletAddress: null,
  chats: [
    {
      id: '1',
      name: 'Crypto Builders',
      messageCount: 120,
      earnings: 300.0,
      rewards: 45.0,
    },
    {
      id: '2',
      name: 'Healthcare Innovators',
      messageCount: 90,
      earnings: 250.0,
      rewards: 30.0,
    },
    {
      id: '3',
      name: 'Sustainable Designers',
      messageCount: 75,
      earnings: 200.0,
      rewards: 25.0,
    },
    {
      id: '4',
      name: 'Education Tech',
      messageCount: 150,
      earnings: 400.0,
      rewards: 60.0,
    },
  ],
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      // Actions
      setEthWalletAddress: (address) => set({ ethWalletAddress: address }),

      addChat: (chat) =>
        set((state) => ({
          chats: [...state.chats, { ...chat, id: Date.now().toString() }],
        })),

      removeChat: (chatId) =>
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== chatId),
        })),

      updateChat: (chatId, updates) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, ...updates } : chat,
          ),
        })),

      // Reset all state to initial values
      reset: () => set(initialState),
    }),
    {
      name: 'app-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage

      // Optional: specify which parts of the state to persist
      partialize: (state) => ({
        ethWalletAddress: state.ethWalletAddress,
        chats: state.chats,
      }),

      // Optional: version for migration support
      version: 1,
    },
  ),
);
