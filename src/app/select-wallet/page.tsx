'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';

interface WalletFormData {
  walletAddress: string;
}

export default function SelectWallet() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<WalletFormData>({
    defaultValues: {
      walletAddress: 'UQCU3ftgrd...3ftgrdfgv57egt',
    },
    mode: 'onChange',
  });

  const walletAddress = watch('walletAddress');

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    // You could add a toast notification here
  };

  const onSubmit = (data: WalletFormData) => {
    console.log('Wallet form submitted:', data);
    // Here you would typically validate the wallet address
    // and then navigate to the next screen
    router.push('/main-screen');
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
        {/* Header */}
        <div className="pt-16 pb-8">
          <div className="flex items-center justify-center mb-4">
            {/* Star Logo - smaller version */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 270 276"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3"
            >
              <path
                d="M135 0L136.228 132.618L194.876 13.6663L138.442 133.684L242.893 51.9584L139.973 135.605L269.54 107.292L140.52 138L269.54 168.708L139.973 140.395L242.893 224.042L138.442 142.316L194.876 262.334L136.228 143.382L135 276L133.772 143.382L75.124 262.334L131.558 142.316L27.1073 224.042L130.027 140.395L0.459946 168.708L129.48 138L0.459946 107.292L130.027 135.605L27.1073 51.9584L131.558 133.684L75.124 13.6663L133.772 132.618L135 0Z"
                fill="white"
              />
            </svg>
            <h1 className="text-2xl font-bold text-white">Holdium</h1>
          </div>
        </div>

        {/* Main Content - Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full"
        >
          {/* Wallet Address Section */}
          <div className="mb-8">
            <label
              htmlFor="walletAddress"
              className="text-lg text-gray-300 mb-4 font-medium block"
            >
              Wallet address
            </label>

            {/* Address Input Container */}
            <div className="bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-4 flex items-center justify-between focus-within:border-brand-green-bright/50 transition-colors">
              <div className="flex-1 mr-4">
                <input
                  id="walletAddress"
                  type="text"
                  {...register('walletAddress', {
                    required: 'Wallet address is required',
                    minLength: {
                      value: 10,
                      message: 'Wallet address is too short',
                    },
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: 'Invalid wallet address format',
                    },
                  })}
                  className="w-full bg-transparent text-gray-300 font-mono text-sm placeholder-gray-500 focus:outline-none"
                  placeholder="Enter your wallet address"
                />
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopyAddress}
                className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors touch-manipulation cursor-pointer"
                aria-label="Copy wallet address"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-300"
                >
                  <path
                    d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            {/* Error Message */}
            {errors.walletAddress && (
              <p className="mt-2 text-sm text-red-400">
                {errors.walletAddress.message}
              </p>
            )}
          </div>

          {/* Bottom CTA Button */}
          <div className="pb-8">
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full text-lg font-semibold shadow-2xl"
              disabled={!isValid}
            >
              Connect Wallet & Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
