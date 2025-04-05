'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="mb-6">
          <Image
            src="/career-logo.svg"
            alt="Career Recommender Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
        </div>
        
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">Page Not Found</h1>
        
        <p className="text-gray-600 mb-8">
          The page you were looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          href="/"
          className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
} 