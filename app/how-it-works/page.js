'use client'

import Image from 'next/image'

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
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
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">
              How It Works
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Our AI-powered system analyzes your skills, interests, and preferences to find your ideal career path
            </p>
          </div>
        </div>
      </div>
      
      {/* Process Steps */}
      <main className="container mx-auto py-12 px-4 max-w-5xl">
        <div className="space-y-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Simple Process, Powerful Results</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our career recommendation system uses advanced algorithms to match your unique profile with potential career paths. Here's how the process works:
            </p>
          </div>
          
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                <div className="bg-indigo-100 text-indigo-700 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6">1</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Share Your Profile
                </h3>
                <p className="text-gray-600 mb-4">
                  Fill out a simple form about your skills, interests, education level, and preferences. The more details you provide, the more accurate your recommendations will be.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Specify your technical and soft skills
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Select your interests from various categories
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Indicate your education level and work preferences
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="bg-indigo-50 p-8 rounded-lg flex items-center justify-center h-full">
                <Image 
                  src="/career-logo.svg" 
                  alt="Profile Form" 
                  width={250} 
                  height={250}
                  className="drop-shadow-md"
                />
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <div className="bg-indigo-50 p-8 rounded-lg flex items-center justify-center h-full">
                <Image 
                  src="/career-logo.svg" 
                  alt="AI Analysis" 
                  width={250} 
                  height={250}
                  className="drop-shadow-md"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                <div className="bg-indigo-100 text-indigo-700 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6">2</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  AI Analysis
                </h3>
                <p className="text-gray-600 mb-4">
                  Our advanced algorithm processes your information and compares it with career data from multiple industries to identify optimal matches for your profile.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Skills analysis and matching with career requirements
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Interest alignment with job satisfaction factors
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Education compatibility with career paths
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                <div className="bg-indigo-100 text-indigo-700 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6">3</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Personalized Recommendations
                </h3>
                <p className="text-gray-600 mb-4">
                  Receive a customized list of career recommendations with match scores, detailed information, and suggested courses to help you succeed.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Career options with match percentage scores
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Required skills and education for each career
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Recommended courses to help you build relevant skills
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="bg-indigo-50 p-8 rounded-lg flex items-center justify-center h-full">
                <Image 
                  src="/career-logo.svg" 
                  alt="Personalized Recommendations" 
                  width={250} 
                  height={250}
                  className="drop-shadow-md"
                />
              </div>
            </div>
          </div>
          
          {/* Start Now CTA */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Find Your Perfect Career Path?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              It takes just a few minutes to get personalized career recommendations that can help shape your future.
            </p>
            <a 
              href="/" 
              className="btn-primary inline-flex items-center px-6 py-3"
            >
              Get Started Now
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
} 