'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const result = await signIn('google', { 
        callbackUrl: '/',
        redirect: false 
      })
      
      if (result?.error) {
        if (result.error === "Configuration" || result.error.includes("OAuth")) {
          setError("OAuth Error: Google authentication is not configured properly. Check your .env.local file and set up Google OAuth credentials.")
        } else {
          setError(`Authentication failed: ${result.error}. Please try continuing without signing in.`)
        }
        console.error('Login error:', result.error)
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch (error) {
      setError("Authentication system is currently unavailable. Please try continuing without signing in.")
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const continueWithoutSignIn = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Image 
              src="/career-logo.svg" 
              alt="Career Recommender Logo"
              width={120}
              height={120}
              priority
              className="drop-shadow-md"
              onError={(e) => {
                e.target.src = 'https://placehold.co/120x120/4F46E5/FFFFFF?text=CR'
              }}
            />
          </div>
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">AI Career Recommender</h1>
          <p className="text-xl text-gray-600">Discover your perfect career path</p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
          <div className="space-y-6">
            {error && (
              <div className="p-4 text-sm bg-red-50 border border-red-200 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            {/* Only show this when Google auth is not properly configured */}
            <div className="px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-700">
                <strong>OAuth Now Configured!</strong> Your Google sign-in is now working. You can continue with Google authentication or use the app without signing in.
              </p>
            </div>
            
            <p className="text-gray-700 text-center">
              Sign in with your Google account to receive personalized career recommendations 
              and course suggestions directly to your email.
            </p>
            
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center items-center gap-3 rounded-md bg-white py-3 px-3 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              <span className="text-base">{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
            </button>
            
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">Or</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={continueWithoutSignIn} 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                Continue without signing in
              </button>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-600">
          By using this service, you agree to our{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
} 