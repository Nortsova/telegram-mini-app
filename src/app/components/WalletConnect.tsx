'use client';

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export function WalletConnect() {
  const { setShowAuthFlow, primaryWallet, user } = useDynamicContext();

  const handleConnectWallet = () => {
    setShowAuthFlow(true);
  };

  const handleDisconnectWallet = async () => {
    if (primaryWallet) {
      await primaryWallet.connector.endSession();
    }
  };

  if (primaryWallet) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-md mx-auto mt-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Wallet Connected
          </h3>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Wallet Type:</span>
                <span className="font-medium text-gray-900">
                  {primaryWallet.connector.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Address:</span>
                <span className="font-mono text-xs text-gray-900">
                  {primaryWallet.address.slice(0, 6)}...
                  {primaryWallet.address.slice(-4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Network:</span>
                <span className="text-gray-900">
                  {primaryWallet.chain || 'Ethereum'}
                </span>
              </div>
              {user?.email && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="text-gray-900 text-xs">{user.email}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleDisconnectWallet}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-md mx-auto mt-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Connect Your Wallet
        </h3>

        <p className="text-gray-600 mb-6">
          Connect your crypto wallet to interact with Web3 features
        </p>

        <button
          onClick={handleConnectWallet}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Connect Wallet
        </button>

        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <span>Supports</span>
          <div className="flex space-x-2">
            <span className="bg-gray-100 px-2 py-1 rounded">MetaMask</span>
            <span className="bg-gray-100 px-2 py-1 rounded">WalletConnect</span>
            <span className="bg-gray-100 px-2 py-1 rounded">Coinbase</span>
          </div>
        </div>
      </div>
    </div>
  );
}
