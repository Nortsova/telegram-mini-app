'use client';

import React from 'react';
import Link from 'next/link';

interface ChatGroup {
  id: string;
  name: string;
  messageCount: number;
  earnings: number;
  rewards: number;
  avatar: string;
}

const chatGroups: ChatGroup[] = [
  {
    id: '1',
    name: 'Crypto Builders',
    messageCount: 120,
    earnings: 300.0,
    rewards: 45.0,
    avatar: '👨‍💻',
  },
  {
    id: '2',
    name: 'Healthcare Innovators',
    messageCount: 90,
    earnings: 250.0,
    rewards: 30.0,
    avatar: '👩‍⚕️',
  },
  {
    id: '3',
    name: 'Sustainable Designers',
    messageCount: 75,
    earnings: 200.0,
    rewards: 25.0,
    avatar: '🌱',
  },
  {
    id: '4',
    name: 'Education Tech',
    messageCount: 150,
    earnings: 400.0,
    rewards: 60.0,
    avatar: '📚',
  },
];

export default function MyChats() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
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
        <div className="flex items-center justify-between p-6 pt-16">
          <h1 className="text-2xl font-bold text-white">My Chats</h1>

          {/* Add Chat Button */}
          <Link href="/setup-steps">
            <button
              className="w-10 h-10 bg-brand-green-bright rounded-full flex items-center justify-center hover:bg-brand-green-extra transition-colors touch-manipulation cursor-pointer"
              aria-label="Add new chat"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-basic-black"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
        </div>

        {/* Chat List */}
        <div className="flex-1 px-6 pb-6">
          <div className="space-y-4">
            {chatGroups.map((chat) => (
              <Link key={chat.id} href={`/chat-details/${chat.id}`}>
                <div className="bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-4 hover:bg-black/40 transition-colors cursor-pointer touch-manipulation">
                  <div className="flex items-center justify-between">
                    {/* Left Side - Avatar and Info */}
                    <div className="flex items-center flex-1">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center mr-4 text-xl">
                        {chat.avatar}
                      </div>

                      {/* Chat Info */}
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {chat.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {chat.messageCount} messages
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Earnings */}
                    <div className="text-right">
                      <p className="text-white font-bold text-lg mb-1">
                        ${chat.earnings.toFixed(2)}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Rewards: ${chat.rewards.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State (if no chats) */}
          {chatGroups.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400"
                >
                  <path
                    d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60573 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                No chats connected yet
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Add your first chat group to start earning rewards
              </p>
              <Link href="/setup-steps">
                <button className="bg-brand-green-bright text-basic-black font-medium py-2 px-6 rounded-full hover:bg-brand-green-extra transition-colors">
                  Add Your First Chat
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Navigation or Actions */}
        <div className="p-6">
          <div className="flex justify-center">
            <Link href="/main-screen">
              <button className="text-gray-400 hover:text-white transition-colors text-sm">
                ← Back to Wallet
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
