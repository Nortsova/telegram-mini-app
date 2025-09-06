import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-bg-dark-gray rounded-lg shadow-lg p-8 border border-stroke">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              About Our App
            </h1>
            <p className="text-lg text-text-secondary">
              Learn more about our Telegram Mini App
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-bg-dark rounded-lg p-6 border border-stroke">
              <h2 className="text-2xl font-semibold text-text-primary mb-3">
                What is this app?
              </h2>
              <p className="text-text-secondary leading-relaxed">
                This is a Telegram Mini App built with Next.js that demonstrates
                integration with Telegram&apos;s Web App platform. It showcases
                user authentication and profile management within the Telegram
                ecosystem.
              </p>
            </div>

            <div className="bg-bg-dark rounded-lg p-6 border border-stroke">
              <h2 className="text-2xl font-semibold text-text-primary mb-3">
                Features
              </h2>
              <ul className="list-disc list-inside text-text-secondary space-y-2">
                <li>Telegram user authentication</li>
                <li>Profile information display</li>
                <li>Modern, responsive design</li>
                <li>Built with Next.js and TypeScript</li>
                <li>Tailwind CSS styling</li>
              </ul>
            </div>

            <div className="bg-bg-dark rounded-lg p-6 border border-stroke">
              <h2 className="text-2xl font-semibold text-text-primary mb-3">
                Technology Stack
              </h2>
              <div className="grid grid-cols-2 gap-4 text-text-secondary">
                <div>
                  <strong>Frontend:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Next.js 15</li>
                    <li>React</li>
                    <li>TypeScript</li>
                  </ul>
                </div>
                <div>
                  <strong>Styling:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Tailwind CSS</li>
                    <li>Geist Font</li>
                    <li>Responsive Design</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-brand-green text-basic-white font-medium rounded-lg hover:bg-brand-green-soft transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
