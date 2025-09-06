import React from 'react'
import Image from 'next/image'

const Loading = () => {
  return (
    <div className="min-h-screen w-full flex-center dark-gradient pattern relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-200/10 via-transparent to-primary-100/5" />
      
      {/* Main content */}
      <div className="flex-center flex-col gap-8 relative z-10">
        {/* Logo/Brand section */}
        <div className="flex-center flex-col gap-4">
          {/* Animated robot icon */}
          <div className="relative">
            <div className="blue-gradient rounded-full p-6 shadow-2xl">
              <Image
                src="/robot.png"
                alt="PrepWise AI"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>
            {/* Pulsing ring animation */}
            <div className="absolute inset-0 rounded-full border-2 border-primary-200 animate-ping opacity-75" />
            <div className="absolute inset-0 rounded-full border border-primary-100 animate-pulse" />
          </div>
          
          {/* App name */}
          <h1 className="text-4xl font-bold text-white tracking-wide">
            PrepWise
          </h1>
          <p className="text-light-100 text-lg text-center max-w-md">
            AI-Powered Mock Interview Platform
          </p>
        </div>

        {/* Loading animation */}
        <div className="flex-center flex-col gap-4">
          {/* Animated dots */}
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-primary-200 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-3 h-3 bg-primary-200 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-3 h-3 bg-primary-200 rounded-full animate-bounce" />
          </div>
          
          {/* Loading text */}
          <p className="text-light-100 text-sm animate-pulse">
            Preparing your interview experience...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-dark-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-200 to-primary-100 rounded-full animate-pulse" 
               style={{
                 animation: 'loading-bar 2s ease-in-out infinite'
               }} />
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary-200/30 rounded-full animate-ping [animation-delay:-0.5s]" />
      <div className="absolute top-40 right-32 w-1 h-1 bg-primary-100/40 rounded-full animate-pulse [animation-delay:-1s]" />
      <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-primary-200/20 rounded-full animate-ping [animation-delay:-1.5s]" />
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-primary-100/25 rounded-full animate-pulse [animation-delay:-2s]" />
    </div>
  )
}

export default Loading