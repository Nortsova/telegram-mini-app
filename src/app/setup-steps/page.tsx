'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';

interface SetupFormData {
  selectedGroup: string;
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
      selectedGroup: '',
    },
    mode: 'onChange',
  });

  const selectedGroup = watch('selectedGroup');

  // Fetch user's Telegram groups
  useEffect(() => {
    const fetchTelegramGroups = async () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        setIsLoadingGroups(true);
        try {
          // Access Telegram WebApp API
          // const tg = window.Telegram.WebApp;

          // Request user's groups (this is a mock implementation)
          // In real implementation, you'd need to use Telegram Bot API
          // or have your backend fetch groups using the user's token
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

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          setTelegramGroups(mockGroups);
        } catch (error) {
          console.error('Failed to fetch Telegram groups:', error);
          // Fallback to empty array
          setTelegramGroups([]);
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
    setValue('selectedGroup', group.id);
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
          backgroundImage: "url('/Background-2x.png')",
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
              Select a group from your Telegram account.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Hidden input for form validation */}
              <input
                type="hidden"
                {...register('selectedGroup', {
                  required: 'Please select a group',
                })}
              />

              {/* Groups List */}
              {isLoadingGroups ? (
                <div className="bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6 text-center">
                  <div className="animate-spin w-6 h-6 border-2 border-brand-green-bright border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-gray-300">Loading your groups...</p>
                </div>
              ) : telegramGroups.length > 0 ? (
                <div className="space-y-3">
                  {telegramGroups.map((group) => (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => handleSelectGroup(group)}
                      className={`w-full bg-black/30 backdrop-blur-sm border rounded-2xl p-4 text-left transition-all hover:bg-black/40 ${
                        selectedGroup === group.id
                          ? 'border-brand-green-bright/70 bg-brand-green-bright/10'
                          : 'border-gray-600/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-brand-green-bright/20 rounded-full flex items-center justify-center mr-3">
                            <svg
                              width="16"
                              height="16"
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
                          <div>
                            <h3 className="text-white font-semibold text-base mb-1">
                              {group.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              @{group.username} • {group.type}
                            </p>
                          </div>
                        </div>
                        {selectedGroup === group.id && (
                          <div className="w-6 h-6 bg-brand-green-bright rounded-full flex items-center justify-center">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-basic-black"
                            >
                              <path
                                d="M20 6L9 17L4 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6 text-center">
                  <p className="text-gray-300 mb-4">No groups found</p>
                  <p className="text-gray-400 text-sm">
                    Make sure you have groups in your Telegram account.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {errors.selectedGroup && (
                <p className="text-sm text-red-400">
                  {errors.selectedGroup.message}
                </p>
              )}
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
