'use client';

import { useEffect, useState } from 'react';

export function TelegramDebug() {
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const info = {
        hasTelegram: !!window.Telegram,
        hasWebApp: !!window.Telegram?.WebApp,
        initData: window.Telegram?.WebApp?.initData || 'Not available',
        initDataUnsafe:
          window.Telegram?.WebApp?.initDataUnsafe || 'Not available',
        userAgent: navigator.userAgent,
        location: window.location.href,
        referrer: document.referrer,
        windowTelegram: window.Telegram,
      };
      setDebugInfo(info);
    }
  }, []);

  if (!debugInfo) return null;

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4 text-xs">
      <h3 className="font-bold mb-2">Debug Information:</h3>
      <pre className="whitespace-pre-wrap text-xs">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
}
