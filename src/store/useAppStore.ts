import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Random avatar icons pool
const avatarIcons = [
  '👨‍💻',
  '👩‍💻',
  '👨‍🔬',
  '👩‍🔬',
  '👨‍⚕️',
  '👩‍⚕️',
  '👨‍🎨',
  '👩‍🎨',
  '👨‍🏫',
  '👩‍🏫',
  '👨‍💼',
  '👩‍💼',
  '👨‍🔧',
  '👩‍🔧',
  '👨‍🚀',
  '👩‍🚀',
  '🌱',
  '💎',
  '🚀',
  '⚡',
  '🔥',
  '💡',
  '🎯',
  '📚',
  '🎨',
  '🔬',
  '⚗️',
  '🧪',
  '🎭',
  '🎪',
  '🎨',
  '🎬',
  '🎵',
  '🎸',
  '🎹',
  '🎤',
  '🎧',
  '🎮',
  '🕹️',
  '🎲',
];

// Function to get a random avatar
const getRandomAvatar = (): string => {
  return avatarIcons[Math.floor(Math.random() * avatarIcons.length)];
};

export interface ChatGroup {
  id: string;
  name: string;
  messageCount: number;
  earnings: number;
  rewards: number;
  avatar: string;
}

interface AppState {
  // Wallet state
  ethWalletAddress: string | null;

  // Chat state
  chats: ChatGroup[];

  // Actions
  setEthWalletAddress: (address: string | null) => void;
  addChat: (chat: Pick<ChatGroup, 'name'>) => void;
  removeChat: (chatId: string) => void;
  updateChat: (chatId: string, updates: Partial<Omit<ChatGroup, 'id'>>) => void;

  // Reset function
  reset: () => void;
}

const initialState = {
  ethWalletAddress: null,
  chats: [],
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      // Actions
      setEthWalletAddress: (address) => set({ ethWalletAddress: address }),

      addChat: (chat) =>
        set((state) => {
          // Generate random earnings between $50-$500
          const randomEarnings = Math.floor(Math.random() * 451) + 50;
          // Generate random rewards between 10-25% of earnings
          const randomRewards = Math.floor(
            randomEarnings * (0.1 + Math.random() * 0.15),
          );
          // Generate random message count between 25-200
          const randomMessageCount = Math.floor(Math.random() * 176) + 25;
          // Generate random avatar
          const randomAvatar = getRandomAvatar();

          return {
            chats: [
              ...state.chats,
              {
                ...chat,
                id: Date.now().toString(),
                earnings: randomEarnings,
                rewards: randomRewards,
                messageCount: randomMessageCount,
                avatar: randomAvatar,
              },
            ],
          };
        }),

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
