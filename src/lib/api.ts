/**
 * API Service for handling all HTTP requests
 * This service provides a centralized way to interact with backend APIs
 */

// Base API configuration
const API_BASE_URL = 'https://evm.p2e.tg';

// Types
export interface User {
  id: string;
  walletAddress: string;
  telegramId?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  balance: {
    total: string;
    assets: Asset[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface Asset {
  symbol: string;
  name: string;
  amount: string;
  value: string;
  icon: string;
  contractAddress?: string;
  decimals?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers: defaultHeaders,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        message: data.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('API Request Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// User API functions
export const userApi = {
  /**
   * Get user data from Telegram WebApp
   * @returns Promise<ApiResponse<User>>
   */
  async getUser(initData: string): Promise<ApiResponse<User>> {
    // return apiRequest<User>(`/auth/telegram/webapp?${initData}`, {
    //   method: 'GET',
    // });
    return apiRequest<User>(`/auth?${initData}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });
  },
};

// Chat API functions (for future use)
export const chatApi = {
  /**
   * Get user's connected chats
   * @param walletAddress - Ethereum wallet address
   * @returns Promise<ApiResponse<any[]>>
   */
  async getUserChats(walletAddress: string): Promise<ApiResponse<any[]>> {
    return apiRequest<any[]>(`/chats/user/${walletAddress}`, {
      method: 'GET',
    });
  },

  /**
   * Connect a new chat group
   * @param walletAddress - Ethereum wallet address
   * @param groupData - Chat group data
   * @returns Promise<ApiResponse<any>>
   */
  async connectChat(
    walletAddress: string,
    groupData: { groupUsername: string; telegramGroupId?: string },
  ): Promise<ApiResponse<any>> {
    return apiRequest<any>('/chats/connect', {
      method: 'POST',
      body: JSON.stringify({
        walletAddress,
        ...groupData,
      }),
    });
  },
};

// Export default api object
export const api = {
  user: userApi,
  chat: chatApi,
};

export default api;
