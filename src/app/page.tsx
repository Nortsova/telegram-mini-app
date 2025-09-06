import { UserProfile } from './components/UserProfile';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Telegram Mini App
          </h1>
          <p className="text-text-secondary">
            Connect with Telegram to see your profile
          </p>
        </div>

        <UserProfile />

        <div className="mt-8 text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/about"
              className="inline-flex items-center px-4 py-2 bg-brand-green text-basic-white font-medium rounded-lg hover:bg-brand-green-soft transition-colors"
            >
              Learn More About This App
            </a>
          </div>
          <p className="text-sm text-text-secondary">
            Built with Next.js and Telegram Mini Apps SDK
          </p>
        </div>
      </div>
    </div>
  );
}
