
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex-center dark-gradient pattern relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-200/10 via-transparent to-primary-100/5" />

      {/* Main content */}
      <div className="flex-center flex-col gap-8 relative z-10 max-w-2xl mx-auto px-4">
        {/* 404 Number with animation */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-primary-100 animate-pulse">
            404
          </h1>
          {/* Glowing effect */}
          <div className="absolute inset-0 text-9xl font-bold text-primary-200/20 blur-sm animate-pulse">
            404
          </div>
        </div>

        {/* Error message */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">
            Oops! Page Not Found
          </h2>
          <p className="text-light-100 text-lg max-w-md mx-auto">
            The page you&apos;re looking for seems to have wandered off into the
            digital void. Don&apos;t worry, even the best developers get lost
            sometimes!
          </p>
        </div>

        {/* Robot illustration */}
        <div className="relative">
          <div className="blue-gradient rounded-full p-6 shadow-2xl">
            <Image
              src="/robot.png"
              alt="Lost Robot"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
          {/* Confused robot animation */}
          <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
            🤔
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button asChild className="btn-primary">
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Go Home
            </Link>
          </Button>

          <Button asChild className="btn-secondary">
            <Link href="/interview">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              Start Interview
            </Link>
          </Button>
        </div>

        {/* Helpful tip */}
        <div className="text-center">
          <p className="text-light-400 text-sm">
            Tip: Double-check the URL in your address bar for any typos
          </p>
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary-200/30 rounded-full animate-ping [animation-delay:-0.5s]" />
      <div className="absolute top-40 right-32 w-1 h-1 bg-primary-100/40 rounded-full animate-pulse [animation-delay:-1s]" />
      <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-primary-200/20 rounded-full animate-ping [animation-delay:-1.5s]" />
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-primary-100/25 rounded-full animate-pulse [animation-delay:-2s]" />

      {/* Additional floating elements */}
      <div className="absolute top-1/3 left-10 w-1 h-1 bg-primary-200/50 rounded-full animate-ping [animation-delay:-2.5s]" />
      <div className="absolute top-2/3 right-10 w-1.5 h-1.5 bg-primary-100/30 rounded-full animate-pulse [animation-delay:-3s]" />
    </div>
  );
}

export default NotFound