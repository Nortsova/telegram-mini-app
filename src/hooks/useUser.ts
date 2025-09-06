import { useQuery } from '@tanstack/react-query';
import { api, User, Asset } from '../lib/api';
import { queryKeys } from '../lib/queryClient';

interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isRefetching: boolean;
}

interface UseUserOptions {
  enabled?: boolean;
}

/**
 * Simplified hook for fetching user data from Telegram WebApp
 * Makes a GET request to /auth/telegram/webapp endpoint
 */
export const useUser = (options: UseUserOptions = {}): UseUserReturn => {
  const { enabled = true } = options;

  // Check if we're in the browser environment
  const tg = typeof window !== 'undefined' ? window?.Telegram?.WebApp : null;
  const initData = tg?.initData || '';

  console.log('initData', initData);

  // React Query for fetching user data
  const {
    data: user,
    isLoading,
    error: queryError,
    refetch: queryRefetch,
    isRefetching,
  } = useQuery({
    queryKey: queryKeys.user('telegram-webapp'),
    queryFn: async (): Promise<User> => {
      const response = await api.user.getUser(initData);

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to fetch user data');
      }
    },
    // enabled: enabled && typeof window !== 'undefined' && !!initData,
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Public methods
  const refetch = async (): Promise<void> => {
    await queryRefetch();
  };

  // Return hook interface
  return {
    user: user || null,
    isLoading,
    error: queryError?.message || null,
    refetch,
    isRefetching,
  };
};

// Additional hook for user balance with UI-specific formatting
interface UseUserBalanceReturn {
  balance: string;
  assets: Asset[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isRefetching: boolean;
}

/**
 * Specialized hook for user balance data
 */
export const useUserBalance = (): UseUserBalanceReturn => {
  const { user, isLoading, error, refetch, isRefetching } = useUser();

  return {
    balance: user?.balance.total || '$0.00',
    assets: user?.balance.assets || [],
    isLoading,
    error,
    refetch,
    isRefetching,
  };
};

// Hook for user profile information
interface UseUserProfileReturn {
  profile: {
    id: string;
    walletAddress: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    telegramId?: string;
  } | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isRefetching: boolean;
}

/**
 * Specialized hook for user profile data
 */
export const useUserProfile = (): UseUserProfileReturn => {
  const { user, isLoading, error, refetch, isRefetching } = useUser();

  const profile = user
    ? {
        id: user.id,
        walletAddress: user.walletAddress,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        telegramId: user.telegramId,
      }
    : null;

  return {
    profile,
    isLoading,
    error,
    refetch,
    isRefetching,
  };
};

export default useUser;
