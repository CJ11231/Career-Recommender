import './globals.css'
import { NextAuthProvider } from './providers'
import Header from './components/Header'
import { Inter, Poppins, Montserrat } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap'
})

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap'
})

export const metadata = {
  title: 'AI Career Recommender',
  description: 'Get AI-powered career recommendations based on your skills, interests, and education.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/career-logo.svg" />
      </head>
      <body>
        <NextAuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <footer className="bg-white shadow-inner py-6">
              <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} AI Career Recommender. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
} 