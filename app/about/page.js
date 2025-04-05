'use client'

import Image from 'next/image'

export default function About() {
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
              About AI Career Recommender
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Helping individuals discover fulfilling career paths that match their unique potential
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto py-12 px-4 max-w-5xl">
        <div className="space-y-16">
          {/* Our Mission */}
          <section className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Our Mission</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  At AI Career Recommender, we believe that everyone deserves a career that aligns with their skills, interests, and aspirations. Our mission is to leverage the power of artificial intelligence to help individuals discover fulfilling career paths that they might not have considered before.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Finding the right career can be challenging and overwhelming. With thousands of potential career paths available, it's hard to know which one is truly the best fit for you. Our AI-powered recommendation system simplifies this process by analyzing your unique profile and matching you with careers where you're most likely to succeed and find satisfaction.
                </p>
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="bg-indigo-50 p-8 rounded-full">
                  <Image 
                    src="/career-logo.svg" 
                    alt="Mission" 
                    width={200} 
                    height={200}
                    className="drop-shadow-md"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Our Approach */}
          <section className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Our Approach</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-b from-indigo-50 to-white p-6 rounded-lg border border-indigo-100">
                <div className="bg-indigo-100 text-indigo-700 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Data-Driven</h3>
                <p className="text-gray-600">
                  Our recommendations are based on extensive career data, industry research, and real-world job requirements to ensure practical and relevant suggestions.
                </p>
              </div>
              
              <div className="bg-gradient-to-b from-indigo-50 to-white p-6 rounded-lg border border-indigo-100">
                <div className="bg-indigo-100 text-indigo-700 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Personalized</h3>
                <p className="text-gray-600">
                  We focus on your unique combination of skills, interests, education, and preferences to provide highly personalized career matches.
                </p>
              </div>
              
              <div className="bg-gradient-to-b from-indigo-50 to-white p-6 rounded-lg border border-indigo-100">
                <div className="bg-indigo-100 text-indigo-700 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Actionable</h3>
                <p className="text-gray-600">
                  Beyond just matching careers, we provide specific course recommendations to help you develop the skills needed to succeed in your chosen path.
                </p>
              </div>
            </div>
          </section>
          
          {/* Team Section */}
          <section className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Our Team</h2>
            <p className="text-gray-700 mb-8 max-w-3xl">
              AI Career Recommender was created by a passionate team of career counselors, data scientists, and software engineers committed to helping people find fulfilling career paths.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-indigo-100 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Dr. Emily Chen</h3>
                <p className="text-indigo-600 mb-2">Career Psychology</p>
                <p className="text-gray-600 text-sm">
                  With 15+ years in career counseling, Emily ensures our recommendations consider both skills and job satisfaction factors.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-indigo-100 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Alex Rodriguez</h3>
                <p className="text-indigo-600 mb-2">AI & Machine Learning</p>
                <p className="text-gray-600 text-sm">
                  Alex leads our data science team, developing the algorithms that power our precise career matching system.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-indigo-100 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Sophia Williams</h3>
                <p className="text-indigo-600 mb-2">Software Engineering</p>
                <p className="text-gray-600 text-sm">
                  Sophia oversees the development of our platform, ensuring a seamless and intuitive user experience.
                </p>
              </div>
            </div>
          </section>
          
          {/* Contact CTA */}
          <section className="text-center py-8 border-t border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Questions or Feedback?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're constantly working to improve our career recommendation system. If you have any questions, suggestions, or feedback, we'd love to hear from you.
            </p>
            <a 
              href="mailto:hustlerzone3@gmail.com" 
              className="btn-primary inline-flex items-center px-6 py-3"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </a>
          </section>
        </div>
      </main>
    </div>
  )
} 