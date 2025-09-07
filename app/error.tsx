'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div className="min-h-screen w-full flex-center dark-gradient pattern relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-destructive-100/10 via-transparent to-destructive-200/5" />

      {/* Main content */}
      <div className="flex-center flex-col gap-8 relative z-10 max-w-2xl mx-auto px-4">
        {/* Error icon with animation */}
        <div className="relative">
          <div className="bg-gradient-to-br from-destructive-100 to-destructive-200 rounded-full p-6 shadow-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          {/* Pulsing effect */}
          <div className="absolute inset-0 bg-destructive-100/20 rounded-full animate-ping" />
        </div>

        {/* Error message */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Oops! Something went wrong
          </h1>
          <p className="text-light-100 text-lg max-w-md mx-auto">
            We encountered an unexpected error. Don&apos;t worry, our team has
            been notified and we&apos;re working to fix it.
          </p>
        </div>

        {/* Error details (only in development) */}
        {process.env.NODE_ENV === "development" && error && (
          <div className="w-full max-w-2xl">
            <details className="bg-dark-200/50 rounded-lg p-4 border border-destructive-100/20">
              <summary className="text-destructive-100 font-semibold cursor-pointer mb-2">
                Error Details (Development Only)
              </summary>
              <div className="text-sm text-light-100 font-mono bg-dark-300/50 p-3 rounded border overflow-auto max-h-32">
                <div className="mb-2">
                  <strong>Message:</strong> {error?.message}
                </div>
                {error?.digest && (
                  <div className="mb-2">
                    <strong>Digest:</strong> {error?.digest}
                  </div>
                )}
                {error?.stack && (
                  <div>
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap text-xs mt-1">
                      {error?.stack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          </div>
        )}

        {/* Robot illustration with sad expression */}
        <div className="relative">
          <div className="blue-gradient rounded-full p-6 shadow-2xl">
            <Image
              src="/robot.png"
              alt="Confused Robot"
              width={120}
              height={120}
              className="object-contain grayscale opacity-80"
            />
          </div>
          {/* Sad robot animation */}
          <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
            😔
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button onClick={reset} className="btn-primary">
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Try Again
          </Button>

          <Button asChild className="btn-secondary">
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
        </div>

        {/* Helpful tip */}
        <div className="text-center">
          <p className="text-light-400 text-sm">
            If this problem persists, please contact our support team
          </p>
          <p className='text-sm'>
            
            <a href="mailto:engineerahmedbahnasy@gmail.com">
              engineerahmedbahnasy@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-destructive-100/30 rounded-full animate-ping [animation-delay:-0.5s]" />
      <div className="absolute top-40 right-32 w-1 h-1 bg-destructive-200/40 rounded-full animate-pulse [animation-delay:-1s]" />
      <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-destructive-100/20 rounded-full animate-ping [animation-delay:-1.5s]" />
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-destructive-200/25 rounded-full animate-pulse [animation-delay:-2s]" />

      {/* Additional floating elements */}
      <div className="absolute top-1/3 left-10 w-1 h-1 bg-destructive-100/50 rounded-full animate-ping [animation-delay:-2.5s]" />
      <div className="absolute top-2/3 right-10 w-1.5 h-1.5 bg-destructive-200/30 rounded-full animate-pulse [animation-delay:-3s]" />
    </div>
  );
}

export default Error