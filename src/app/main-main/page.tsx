'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store';

export default function MainMainPage() {
  const router = useRouter();
  const { ethWalletAddress } = useAppStore();

  useEffect(() => {
    // Check if wallet address exists and redirect accordingly
    if (ethWalletAddress) {
      // Wallet exists, redirect to main-screen
      router.push('/main-screen');
    } else {
      // No wallet, redirect to initial-screen
      router.push('/initial-screen');
    }
  }, [ethWalletAddress, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-bg-dark text-text-primary flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-2 border-brand-green-bright border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-text-secondary">Loading...</p>
      </div>
    </div>
  );
}
