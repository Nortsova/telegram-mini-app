'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';

interface SetupFormData {
  groupUsername: string;
}

interface TelegramGroup {
  id: string;
  title: string;
  type: string;
  username?: string;
}

export default function SetupSteps() {
  const router = useRouter();
  const [currentStep] = useState(1);
  const [telegramGroups, setTelegramGroups] = useState<TelegramGroup[]>([]);
  const [isLoadingGroups, setIsLoadingGroups] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<SetupFormData>({
    defaultValues: {
      groupUsername: '',
    },
    mode: 'onChange',
  });

  const groupUsername = watch('groupUsername');

  // Fetch user's Telegram groups
  useEffect(() => {
    const fetchTelegramGroups = async () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        setIsLoadingGroups(true);
        try {
          const tg = window.Telegram.WebApp;

          // Get user data from Telegram
          const initData = tg.initData;
          const user = tg.initDataUnsafe?.user;

          if (!user) {
            throw new Error('No user data available from Telegram');
          }

          // Call your backend API to fetch user's groups
          // This requires your backend to use Telegram Bot API
          const response = await fetch('/api/telegram/groups', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              initData,
              userId: user.id,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch groups from backend');
          }

          const data = await response.json();
          const groups: TelegramGroup[] = data.groups || [];

          setTelegramGroups(groups);
        } catch (error) {
          console.error('Failed to fetch Telegram groups:', error);

          // Fallback to mock data for development/demo
          const fallbackGroups: TelegramGroup[] = [
            {
              id: '1',
              title: 'Crypto Builders',
              type: 'supergroup',
              username: 'cryptobuilders',
            },
            {
              id: '2',
              title: 'Healthcare Innovators',
              type: 'group',
              username: 'healthinnovators',
            },
            {
              id: '3',
              title: 'Sustainable Designers',
              type: 'supergroup',
              username: 'sustainabledesign',
            },
            {
              id: '4',
              title: 'Education Tech',
              type: 'group',
              username: 'edtech2025',
            },
          ];

          setTelegramGroups(fallbackGroups);
        } finally {
          setIsLoadingGroups(false);
        }
      } else {
        // Fallback for development/non-Telegram environment
        const mockGroups: TelegramGroup[] = [
          {
            id: '1',
            title: 'Crypto Builders',
            type: 'supergroup',
            username: 'cryptobuilders',
          },
          {
            id: '2',
            title: 'Healthcare Innovators',
            type: 'group',
            username: 'healthinnovators',
          },
        ];
        setTelegramGroups(mockGroups);
      }
    };

    fetchTelegramGroups();
  }, []);

  const handleSelectGroup = (group: TelegramGroup) => {
    setValue('groupUsername', `@${group.username}`);
  };

  const handleCopyUsername = () => {
    if (groupUsername) {
      navigator.clipboard.writeText(groupUsername);
      // You could add a toast notification here
    }
  };

  const onSubmit = (data: SetupFormData) => {
    console.log('Setup form submitted:', data);
    // Here you would typically process the setup
    // and then navigate to the my-chats screen
    router.push('/my-chats');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col px-6">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background-2x.png')",
        }}
      />

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Main Content - Setup Steps */}
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full py-16">
          {/* Step 1 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Step 1</h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Add @HoldiumRobot to your group as an administrator.
            </p>
          </div>

          {/* Step 2 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Step 2</h2>
            <p className="text-gray-300 text-base mb-6 leading-relaxed">
              Paste username of your group.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Username Input Container */}
              <div className="bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-4 flex items-center justify-between focus-within:border-brand-green-bright/50 transition-colors">
                <div className="flex-1 mr-4">
                  <input
                    id="groupUsername"
                    type="text"
                    {...register('groupUsername', {
                      required: 'Group username is required',
                      minLength: {
                        value: 2,
                        message: 'Username is too short',
                      },
                      pattern: {
                        value: /^@?[A-Za-z0-9_]+$/,
                        message: 'Invalid username format',
                      },
                    })}
                    className="w-full bg-transparent text-gray-300 text-base placeholder-gray-500 focus:outline-none"
                    placeholder="@username"
                  />
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyUsername}
                  className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors touch-manipulation cursor-pointer"
                  aria-label="Copy group username"
                  disabled={!groupUsername}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${
                      groupUsername ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    <path
                      d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>

              {/* Error Message */}
              {errors.groupUsername && (
                <p className="text-sm text-red-400">
                  {errors.groupUsername.message}
                </p>
              )}

              {/* Your Telegram Groups */}
              <div className="mt-6">
                <h3 className="text-white font-semibold text-base mb-4">
                  Your Telegram Groups:
                </h3>

                {isLoadingGroups ? (
                  <div className="bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6 text-center">
                    <div className="animate-spin w-6 h-6 border-2 border-brand-green-bright border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-gray-300">Loading your groups...</p>
                  </div>
                ) : telegramGroups.length > 0 ? (
                  <div className="space-y-2">
                    {telegramGroups.map((group) => (
                      <div
                        key={group.id}
                        onClick={() => handleSelectGroup(group)}
                        className="bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-xl p-3 hover:bg-black/40 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-brand-green-bright/20 rounded-full flex items-center justify-center mr-3">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-brand-green-bright"
                            >
                              <path
                                d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium text-sm mb-1">
                              {group.title}
                            </h4>
                            <p className="text-gray-400 text-xs">
                              @{group.username} • {group.type}
                            </p>
                          </div>
                          <div className="text-gray-400 text-xs">
                            Click to use
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-xl p-4 text-center">
                    <p className="text-gray-400 text-sm">
                      No groups found in your Telegram account.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="pb-4 flex justify-center">
          <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-green-bright transition-all duration-500"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="pb-8">
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="gradient"
            size="lg"
            className="w-full text-lg font-semibold shadow-2xl"
            disabled={!isValid}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
