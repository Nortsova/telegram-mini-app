'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Button from '../../components/Button';

interface Transaction {
  id: string;
  type: 'payment' | 'topup' | 'withdrawal';
  user: string;
  amount: number;
  date: string;
  avatar: string;
}

interface ChatDetails {
  id: string;
  name: string;
  messageCount: number;
  earnings: number;
  rewards: number;
  avatar: string;
  transactions: Transaction[];
}

const chatDetailsData: Record<string, ChatDetails> = {
  '1': {
    id: '1',
    name: 'Crypto Builders',
    messageCount: 120,
    earnings: 300.0,
    rewards: 45.0,
    avatar: '👨‍💻',
    transactions: [
      {
        id: '1',
        type: 'payment',
        user: 'Kianna Geidt',
        amount: -2.68,
        date: 'September 5, 2025',
        avatar: '👩‍🦰',
      },
      {
        id: '2',
        type: 'payment',
        user: 'Kianna Geidt',
        amount: -2.68,
        date: 'January 5, 2018',
        avatar: '👩‍🦰',
      },
      {
        id: '3',
        type: 'topup',
        user: 'Top Up',
        amount: 60.25,
        date: 'September 15, 2025',
        avatar: '+',
      },
      {
        id: '4',
        type: 'payment',
        user: "Liam O'Connor",
        amount: -5.4,
        date: 'September 12, 2025',
        avatar: '👨‍💼',
      },
      {
        id: '5',
        type: 'payment',
        user: 'Sophia Wang',
        amount: -3.15,
        date: 'September 22, 2025',
        avatar: '👩‍💻',
      },
      {
        id: '6',
        type: 'topup',
        user: 'Top Up',
        amount: 160.25,
        date: 'September 15, 2025',
        avatar: '+',
      },
    ],
  },
  '2': {
    id: '2',
    name: 'Healthcare Innovators',
    messageCount: 90,
    earnings: 250.0,
    rewards: 30.0,
    avatar: '👩‍⚕️',
    transactions: [
      {
        id: '1',
        type: 'payment',
        user: 'Dr. Sarah Johnson',
        amount: -4.2,
        date: 'September 3, 2025',
        avatar: '👩‍⚕️',
      },
      {
        id: '2',
        type: 'topup',
        user: 'Top Up',
        amount: 75.5,
        date: 'September 10, 2025',
        avatar: '+',
      },
    ],
  },
};

export default function ChatDetails() {
  const params = useParams();
  const chatId = params.id as string;
  const chat = chatDetailsData[chatId];

  if (!chat) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-xl mb-4">Chat not found</h2>
          <Link href="/my-chats">
            <button className="text-brand-green-bright">
              ← Back to My Chats
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const formatAmount = (amount: number) => {
    const sign = amount > 0 ? '+' : '';
    return `${sign} $${Math.abs(amount).toFixed(2)}`;
  };

  const getAmountColor = (amount: number) => {
    return amount > 0 ? 'text-green-400' : 'text-red-400';
  };

  const getTransactionIcon = (type: string, avatar: string) => {
    if (type === 'topup') {
      return (
        <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center text-green-400 text-xl font-bold">
          +
        </div>
      );
    }
    return (
      <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center text-lg">
        {avatar}
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
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
        {/* Header */}
        <div className="p-6 pt-16">
          <div className="flex items-center mb-6">
            <Link href="/my-chats">
              <button className="text-gray-400 hover:text-white transition-colors mr-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 12H5M5 12L12 19M5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Link>
          </div>

          {/* Chat Overview Card */}
          <div className="bg-black/30 backdrop-blur-sm border-2 border-brand-green-bright/50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              {/* Left Side - Avatar and Info */}
              <div className="flex items-center flex-1">
                {/* Avatar */}
                <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mr-4 text-2xl">
                  {chat.avatar}
                </div>

                {/* Chat Info */}
                <div className="flex-1">
                  <h1 className="text-white font-bold text-2xl mb-1">
                    {chat.name}
                  </h1>
                  <p className="text-gray-400 text-base">
                    {chat.messageCount} messages
                  </p>
                </div>
              </div>

              {/* Right Side - Earnings */}
              <div className="text-right">
                <p className="text-white font-bold text-2xl mb-1">
                  ${chat.earnings.toFixed(2)}
                </p>
                <p className="text-gray-400 text-base">
                  Rewarded: ${chat.rewards.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="md"
                leftIcon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                className="flex-1"
              >
                Top Up
              </Button>
              <Button
                variant="outline"
                size="md"
                leftIcon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 10L12 15L17 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                className="flex-1"
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="flex-1 px-6 pb-6">
          {/* Month Header */}
          <h2 className="text-white text-xl font-bold mb-6">September 2025</h2>

          {/* Transaction List */}
          <div className="space-y-4">
            {chat.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-4"
              >
                {/* Left Side - Avatar and Info */}
                <div className="flex items-center flex-1">
                  {getTransactionIcon(transaction.type, transaction.avatar)}

                  {/* Transaction Info */}
                  <div className="ml-4 flex-1">
                    <h3 className="text-white font-semibold text-base mb-1">
                      {transaction.user}
                    </h3>
                    <p className="text-gray-400 text-sm">{transaction.date}</p>
                  </div>
                </div>

                {/* Right Side - Amount */}
                <div className="text-right">
                  <p
                    className={`font-bold text-lg ${getAmountColor(
                      transaction.amount,
                    )}`}
                  >
                    {formatAmount(transaction.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
