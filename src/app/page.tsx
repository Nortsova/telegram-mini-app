import { UserProfile } from './components/UserProfile';
import { WalletConnect } from './components/WalletConnect';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Telegram Mini App
          </h1>
          <p className="text-gray-600">
            Connect with Telegram and your crypto wallet
          </p>
        </div>

        <UserProfile />

        <WalletConnect />

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Built with Next.js, Telegram Mini Apps SDK & Dynamic XYZ
          </p>
        </div>
      </div>
    </div>
  );
}
