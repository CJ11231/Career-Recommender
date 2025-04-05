'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import CareerForm from './components/CareerForm'
import CareerQuiz from './components/CareerQuiz'
import CareerRecommendations from './components/CareerRecommendations'
import getRecommendedCourses from './utils/courseRecommendations'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [emailSending, setEmailSending] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState([])
  
  // Ref for form section to scroll to
  const formRef = useRef(null)

  // Check for quiz parameters in URL
  useEffect(() => {
    const fromQuiz = searchParams.get('quiz')
    const interestsParam = searchParams.get('interests')
    
    if (fromQuiz === 'true' && interestsParam) {
      try {
        const parsedInterests = JSON.parse(decodeURIComponent(interestsParam))
        if (Array.isArray(parsedInterests)) {
          setSelectedInterests(parsedInterests)
        }
      } catch (error) {
        console.error('Error parsing interests from URL:', error)
      }
    }
  }, [searchParams])

  // Comment out redirect to login if not authenticated
  /* 
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])
  */

  // Handle scroll to form when button is clicked
  const scrollToForm = () => {
    setSelectedInterests([]) // Clear any previous interests
    // Wait a bit for the component to render before scrolling
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const getRecommendations = async (formData) => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      // Add course recommendations to each career
      const enhancedRecommendations = data.map(career => ({
        ...career,
        courseRecommendations: getRecommendedCourses(career.requiredSkills, 3)
      }))
      
      setRecommendations(enhancedRecommendations)
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendRecommendationsByEmail = async () => {
    if (!session || !session.user) {
      alert("Please sign in to use the email feature.");
      return;
    }
    
    try {
      setEmailSending(true);
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recommendations: recommendations,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }
      
      setEmailSent(true);
      // Show success message
      alert("Email sent successfully! Please check your inbox.");
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Show appropriate error message
      if (error.message.includes('SMTP') || error.message.includes('email configuration')) {
        alert("Email server configuration error. Please contact the administrator.");
      } else if (error.message.includes('rate limit') || error.message.includes('550')) {
        alert("Email sending limited or blocked. Try again later or use a different email provider.");
      } else {
        alert(`Failed to send email: ${error.message}. Please try again later.`);
      }
    } finally {
      setEmailSending(false);
    }
  }
  
  // Handle quiz completion
  const handleQuizComplete = (results) => {
    // Set selected interests from quiz results
    setSelectedInterests(results.topInterests)
    // Hide quiz and show form
    setShowQuiz(false)
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative bg-indigo-700 text-white py-16 overflow-hidden">
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
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">
                AI Career Recommender
              </h1>
              <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl">
                Discover your ideal career path with our AI-powered career recommendation system
              </p>
              {session && (
                <p className="mt-4 text-indigo-200">
                  Welcome back, {session.user.name}!
                </p>
              )}
            </div>
            
            <div className="flex-shrink-0">
              <Image
                src="/career-logo.svg"
                alt="Career Recommender Logo"
                width={150}
                height={150}
                className="drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto py-10 px-4 max-w-5xl">
        {!recommendations ? (
          <>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Path to a Fulfilling Career</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Answer a few questions about your skills, interests, and preferences, and our AI will analyze your profile to recommend careers that match your unique potential.
              </p>
              
              {!showQuiz && selectedInterests.length === 0 && (
                <div className="max-w-md mx-auto mb-12 bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-4">Choose Your Path</h3>
                  <div className="space-y-4">
                    <Link 
                      href="/quiz" 
                      className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-colors flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Take Career Interest Quiz
                    </Link>
                    <div className="text-center text-gray-500 my-2">or</div>
                    <button 
                      onClick={scrollToForm} 
                      className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-300 rounded-lg shadow-sm transition-colors flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Fill Out Career Form Directly
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {showQuiz ? (
              <CareerQuiz onComplete={handleQuizComplete} />
            ) : (
              <div ref={formRef}>
                <CareerForm onSubmit={getRecommendations} loading={loading} preselectedInterests={selectedInterests} />
              </div>
            )}
          </>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Your Career Recommendations</h2>
              <p className="text-gray-600 mb-4">
                Based on your profile, we've identified these career paths that align with your skills, interests, and preferences. Each recommendation includes recommended courses to help you succeed.
              </p>
              
              <CareerRecommendations 
                recommendations={recommendations} 
                showCourses={true}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-indigo-700 mb-4">Save Your Results</h3>
              
              <div className="flex flex-col md:flex-row gap-4">
                {!emailSent ? (
                  <button 
                    onClick={sendRecommendationsByEmail} 
                    className={`btn-primary flex items-center justify-center ${!session ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={emailSending || !session}
                    title={!session ? "Sign in to enable this feature" : ""}
                  >
                    {emailSending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {!session ? 'Sign in to Email Results' : 'Email Results to Me'}
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center text-green-700 bg-green-50 rounded-md p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Email sent successfully! Check your inbox.
                  </div>
                )}
                
                <button 
                  onClick={() => {
                    setRecommendations(null);
                    setSelectedInterests([]);
                    setShowQuiz(false);
                  }} 
                  className="btn-secondary flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Start Over
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 