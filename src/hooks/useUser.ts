import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, User, Asset } from '../lib/api';
import { queryKeys } from '../lib/queryClient';

interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
  isRefetching: boolean;
}

interface UseUserOptions {
  enabled?: boolean;
  walletAddress?: string;
}

/**
 * Custom hook for managing user data with React Query
 * Handles fetching, caching, and updating user information
 */
export const useUser = (options: UseUserOptions = {}): UseUserReturn => {
  const { enabled = true, walletAddress: providedWalletAddress } = options;
  const queryClient = useQueryClient();

  // Get wallet address from localStorage or props
  const getWalletAddress = useCallback((): string | null => {
    return (
      providedWalletAddress ||
      (typeof window !== 'undefined'
        ? localStorage.getItem('walletAddress')
        : null)
    );
  }, [providedWalletAddress]);

  const walletAddress = getWalletAddress();

  // React Query for fetching user data
  const {
    data: user,
    isLoading,
    error: queryError,
    refetch: queryRefetch,
    isRefetching,
  } = useQuery({
    queryKey: queryKeys.user(walletAddress || ''),
    queryFn: async (): Promise<User> => {
      if (!walletAddress) {
        throw new Error(
          'No wallet address found. Please connect your wallet first.',
        );
      }

      const response = await api.user.getUser(walletAddress);

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to fetch user data');
      }
    },
    enabled: enabled && !!walletAddress,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Mutation for updating user data
  const updateUserMutation = useMutation({
    mutationFn: async (userData: Partial<User>): Promise<User> => {
      if (!walletAddress) {
        throw new Error('No wallet address found');
      }

      const response = await api.user.createOrUpdateUser(userData);

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to update user data');
      }
    },
    onSuccess: (updatedUser) => {
      // Update the cache with the new user data
      queryClient.setQueryData(
        queryKeys.user(walletAddress || ''),
        updatedUser,
      );
      // Also invalidate related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.userBalance(walletAddress || ''),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.userProfile(walletAddress || ''),
      });
    },
    onError: (error) => {
      console.error('Error updating user:', error);
    },
  });

  // Public methods
  const refetch = useCallback(async (): Promise<void> => {
    await queryRefetch();
  }, [queryRefetch]);

  const updateUser = useCallback(
    async (userData: Partial<User>): Promise<void> => {
      await updateUserMutation.mutateAsync(userData);
    },
    [updateUserMutation],
  );

  const clearError = useCallback((): void => {
    queryClient.removeQueries({
      queryKey: queryKeys.user(walletAddress || ''),
      type: 'inactive',
    });
  }, [queryClient, walletAddress]);

  // Return hook interface
  return {
    user: user || null,
    isLoading,
    error: queryError?.message || null,
    refetch,
    updateUser,
    clearError,
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
 * Specialized hook for user balance data with React Query
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
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  isUpdating: boolean;
}

/**
 * Specialized hook for user profile data with React Query
 */
export const useUserProfile = (): UseUserProfileReturn => {
  const { user, isLoading, error } = useUser();
  const queryClient = useQueryClient();

  // Get wallet address for cache invalidation
  const walletAddress =
    typeof window !== 'undefined'
      ? localStorage.getItem('walletAddress')
      : null;

  // Mutation for updating profile
  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: Partial<User>): Promise<User> => {
      if (!user) {
        throw new Error('No user data available');
      }

      const response = await api.user.createOrUpdateUser({
        ...user,
        ...profileData,
      });

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to update profile');
      }
    },
    onMutate: async (profileData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.user(walletAddress || ''),
      });

      // Snapshot the previous value
      const previousUser = queryClient.getQueryData(
        queryKeys.user(walletAddress || ''),
      );

      // Optimistically update to the new value
      if (previousUser && user) {
        queryClient.setQueryData(queryKeys.user(walletAddress || ''), {
          ...user,
          ...profileData,
        });
      }

      return { previousUser };
    },
    onError: (err, profileData, context) => {
      // Revert to previous value on error
      if (context?.previousUser) {
        queryClient.setQueryData(
          queryKeys.user(walletAddress || ''),
          context.previousUser,
        );
      }
      console.error('Error updating profile:', err);
    },
    onSuccess: (updatedUser) => {
      // Update cache with server response
      queryClient.setQueryData(
        queryKeys.user(walletAddress || ''),
        updatedUser,
      );
    },
  });

  const updateProfile = useCallback(
    async (profileData: Partial<User>): Promise<void> => {
      await updateProfileMutation.mutateAsync(profileData);
    },
    [updateProfileMutation],
  );

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
    updateProfile,
    isUpdating: updateProfileMutation.isPending,
  };
};

export default useUser;
