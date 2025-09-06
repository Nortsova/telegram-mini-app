import { QueryClient } from '@tanstack/react-query';

// Create a client with optimized defaults
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 2 times
      retry: 2,
      // Refetch on window focus (good for wallet data)
      refetchOnWindowFocus: true,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
});

// Query keys for consistent caching
export const queryKeys = {
  user: (walletAddress: string) => ['user', walletAddress] as const,
  userBalance: (walletAddress: string) =>
    ['user', walletAddress, 'balance'] as const,
  userProfile: (walletAddress: string) =>
    ['user', walletAddress, 'profile'] as const,
  userChats: (walletAddress: string) =>
    ['user', walletAddress, 'chats'] as const,
} as const;

export default queryClient;
