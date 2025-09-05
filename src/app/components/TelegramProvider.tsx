'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  retrieveLaunchParams,
  miniApp,
  themeParams,
  viewport,
} from '@telegram-apps/sdk';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

interface TelegramContextType {
  user: TelegramUser | null;
  isLoading: boolean;
  error: string | null;
  initDataRaw: string | null;
}

const TelegramContext = createContext<TelegramContextType>({
  user: null,
  isLoading: true,
  error: null,
  initDataRaw: null,
});

export const useTelegram = () => useContext(TelegramContext);

interface TelegramProviderProps {
  children: ReactNode;
}

export function TelegramProvider({ children }: TelegramProviderProps) {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initDataRaw, setInitDataRaw] = useState<string | null>(null);

  useEffect(() => {
    const initializeTelegram = async () => {
      try {
        // Check if we're running in Telegram environment
        if (typeof window === 'undefined') {
          setIsLoading(false);
          return;
        }

        // Try to retrieve launch params
        const launchParams = retrieveLaunchParams();
        console.log('Launch params:', launchParams);

        if (launchParams.initDataRaw) {
          setInitDataRaw(String(launchParams.initDataRaw));

          // Initialize components
          if (miniApp.mount.isAvailable()) {
            miniApp.mount();
            miniApp.ready();
          }

          if (themeParams.mount.isAvailable()) {
            themeParams.mount();
          }

          if (viewport.mount.isAvailable()) {
            viewport.mount().catch(console.error);
            if (viewport.expand.isAvailable()) {
              viewport.expand();
            }
          }

          // Get user data from initData
          if (
            launchParams.initData &&
            typeof launchParams.initData === 'object' &&
            launchParams.initData !== null &&
            'user' in launchParams.initData
          ) {
            const userData = (launchParams.initData as any).user;
            if (userData) {
              setUser(userData as TelegramUser);
            }
          }
        } else {
          // For development/testing outside Telegram
          console.warn('Not running in Telegram Mini App environment');
          setError('Not running in Telegram Mini App environment');
        }
      } catch (err) {
        console.error('Failed to initialize Telegram:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to initialize Telegram',
        );
      } finally {
        setIsLoading(false);
      }
    };

    initializeTelegram();
  }, []);

  const value: TelegramContextType = {
    user,
    isLoading,
    error,
    initDataRaw,
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
}
