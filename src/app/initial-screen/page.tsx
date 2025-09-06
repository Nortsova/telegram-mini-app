import React from 'react';
import Link from 'next/link';
import Button from '../components/Button';

export default function InitialScreen() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-6">
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
      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Star Logo */}
        <div className="mb-16">
          <div className="w-48 h-48 mx-auto mb-8 flex items-center justify-center">
            <svg
              width="200"
              height="200"
              viewBox="0 0 270 276"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-2xl"
            >
              <path
                d="M135 0L136.228 132.618L194.876 13.6663L138.442 133.684L242.893 51.9584L139.973 135.605L269.54 107.292L140.52 138L269.54 168.708L139.973 140.395L242.893 224.042L138.442 142.316L194.876 262.334L136.228 143.382L135 276L133.772 143.382L75.124 262.334L131.558 142.316L27.1073 224.042L130.027 140.395L0.459946 168.708L129.48 138L0.459946 107.292L130.027 135.605L27.1073 51.9584L131.558 133.684L75.124 13.6663L133.772 132.618L135 0Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Rewarding
            <br />
            conversations
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-12">
          <p className="text-xl text-gray-300 font-light tracking-wide">
            Engage. Connect. Earn.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-8">
          <Link href="/wallet">
            <Button
              variant="gradient"
              size="lg"
              className="w-full max-w-sm mx-auto text-lg font-semibold shadow-2xl"
            >
              Let&apos;s Start
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
