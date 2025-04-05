'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  
  const isActive = (path) => pathname === path
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="flex-shrink-0 relative w-10 h-10 mr-3 transition-transform duration-300 group-hover:scale-110">
                <Image 
                  src="/career-logo.svg"
                  alt="AI Career Recommender"
                  width={40}
                  height={40}
                  className="drop-shadow-sm"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/40x40/4F46E5/FFFFFF?text=CR'
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-indigo-700 font-montserrat">Career Recommender</span>
                <span className="text-xs text-gray-500 -mt-1">Find Your Perfect Path</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-indigo-700 border-b-2 border-indigo-700' 
                  : 'text-gray-700 hover:text-indigo-700'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/quiz"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive('/quiz') 
                  ? 'text-indigo-700 border-b-2 border-indigo-700' 
                  : 'text-gray-700 hover:text-indigo-700'
              }`}
            >
              Career Quiz
            </Link>
            <Link 
              href="/how-it-works"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive('/how-it-works') 
                  ? 'text-indigo-700 border-b-2 border-indigo-700' 
                  : 'text-gray-700 hover:text-indigo-700'
              }`}
            >
              How It Works
            </Link>
            <Link 
              href="/about"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive('/about') 
                  ? 'text-indigo-700 border-b-2 border-indigo-700' 
                  : 'text-gray-700 hover:text-indigo-700'
              }`}
            >
              About
            </Link>
          </nav>
          
          <div className="ml-6 flex items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-900">{session.user?.name}</span>
                  <span className="text-xs text-gray-500">{session.user?.email}</span>
                </div>
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100">
                  {session.user?.image ? (
                    <Image 
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-600 h-full w-full flex items-center justify-center rounded-full">
                      <span className="text-base font-medium text-white">
                        {session.user?.name?.charAt(0) || "U"}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="text-sm text-gray-500 hover:text-gray-900 flex items-center hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all duration-200 hover:shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign in
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button
              className="ml-4 md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className={`${menuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${menuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden py-3 border-t border-gray-200`}>
          <div className="space-y-1 px-2">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'text-indigo-700 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-700 hover:bg-gray-50'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/quiz"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/quiz') 
                  ? 'text-indigo-700 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-700 hover:bg-gray-50'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Career Quiz
            </Link>
            <Link
              href="/how-it-works"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/how-it-works') 
                  ? 'text-indigo-700 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-700 hover:bg-gray-50'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/about') 
                  ? 'text-indigo-700 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-700 hover:bg-gray-50'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
} 