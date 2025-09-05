'use client';

import Image from 'next/image';
import { useTelegram } from './TelegramProvider';

export function UserProfile() {
  const { user, isLoading, error } = useTelegram();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading Telegram data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
            <p className="mt-2 text-xs text-red-600">
              This app needs to be opened from within Telegram as a Mini App.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              No User Data
            </h3>
            <p className="mt-1 text-sm text-yellow-700">
              Unable to retrieve user information from Telegram.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const fullName = `${user.first_name}${
    user.last_name ? ` ${user.last_name}` : ''
  }`;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-md mx-auto">
      <div className="text-center">
        {user.photo_url ? (
          <Image
            src={user.photo_url}
            alt={`${user.first_name}'s avatar`}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-100"
          />
        ) : (
          <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {user.first_name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {fullName}!
        </h2>

        {user.username && (
          <p className="text-gray-600 mb-3">@{user.username}</p>
        )}

        <div className="bg-gray-50 rounded-lg p-4 mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            User Details
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">User ID:</span>
              <span className="font-mono text-gray-900">{user.id}</span>
            </div>
            {user.language_code && (
              <div className="flex justify-between">
                <span className="text-gray-500">Language:</span>
                <span className="text-gray-900">
                  {user.language_code.toUpperCase()}
                </span>
              </div>
            )}
            {user.is_premium !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-500">Premium:</span>
                <span
                  className={`font-medium ${
                    user.is_premium ? 'text-yellow-600' : 'text-gray-900'
                  }`}
                >
                  {user.is_premium ? '⭐ Premium' : 'Standard'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
