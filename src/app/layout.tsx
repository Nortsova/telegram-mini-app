/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TelegramProvider } from './components/TelegramProvider';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Telegram Mini App',
  description: 'A Telegram Mini App built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DynamicContextProvider
          settings={{
            environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID as string,
            walletConnectors: [EthereumWalletConnectors],
            appName: 'Telegram Mini App',
            appLogoUrl: 'https://telegram.org/img/t_logo.png',
          }}
        >
          <TelegramProvider>{children}</TelegramProvider>
        </DynamicContextProvider>
      </body>
    </html>
  );
}
