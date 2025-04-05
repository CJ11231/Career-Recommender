'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import CareerQuiz from '../components/CareerQuiz'

export default function QuizPage() {
  const router = useRouter()
  const [quizComplete, setQuizComplete] = useState(false)
  
  // Handle quiz completion
  const handleQuizComplete = (results) => {
    setQuizComplete(true)
    
    // Redirect to the form page with query params containing the interests
    const interests = encodeURIComponent(JSON.stringify(results.topInterests))
    router.push(`/?quiz=true&interests=${interests}`)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative bg-indigo-700 text-white py-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#header-gradient)" />
          </svg>
          <defs>
            <linearGradient id="header-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4338CA" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/career-logo.svg"
                alt="Career Recommender Logo"
                width={50}
                height={50}
                className="drop-shadow-lg"
              />
              <span className="ml-3 text-xl font-bold">AI Career Recommender</span>
            </Link>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto py-10 px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Career Interest Quiz</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your career direction by answering a few questions about your work style and preferences.
          </p>
        </div>
        
        <CareerQuiz onComplete={handleQuizComplete} />
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
} 