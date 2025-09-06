'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';

interface SetupFormData {
  groupUsername: string;
}

export default function SetupSteps() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SetupFormData>({
    defaultValues: {
      groupUsername: '',
    },
    mode: 'onChange',
  });

  const groupUsername = watch('groupUsername');

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
              Paste usernamebot of your group.
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
