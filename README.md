# Career Recommender

A web application that recommends career paths based on user interests and skills. Built with Next.js and NextAuth for Google Authentication.

## Features

- Google OAuth Authentication
- Interest-based career recommendations
- Email recommendations to users
- Modern responsive UI built with Tailwind CSS
- AI-Powered Recommendations: Match user profiles to suitable career paths using an intelligent algorithm
- Detailed Career Information: Display career details including required skills, education, and job descriptions
- Match Percentage: See how well each career matches your profile with a visual score indicator

## Technology Stack

- Next.js 14
- NextAuth.js
- Tailwind CSS
- React
- Node.js

## Local Development

1. Clone the repository
2. Navigate to the Career-recommendation directory:
   ```
   cd Career-recommendation
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in required credentials (Google OAuth, email settings)
5. Run the development server:
   ```
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment on Vercel

1. Push your changes to GitHub
2. Connect your GitHub repository to Vercel
3. Set the following in your Vercel project settings:
   - Root Directory: `Career-recommendation`
   - Build Command: `next build`
   - Output Directory: `.next`
4. Add environment variables in Vercel dashboard:
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL (should be your production URL)
   - Email configuration variables
5. Deploy!

## How It Works

The recommendation system uses a scoring algorithm that evaluates:

- Skills Match: How well your skills align with each career's required skills
- Interest Alignment: How your interests match the career's field
- Education Fit: Whether your education level meets the career requirements

The system provides the top career matches based on your profile.

## Project Structure

- `/app` - Next.js application pages and components
- `/public` - Static assets
- `/app/components` - Reusable UI components
- `/app/login` - Authentication related pages
