# AI Career Recommendation Portal

A web application that uses AI to recommend career paths based on user skills, interests, education, and personality traits.

## Features

- **User-friendly Form**: Collect information about users' skills, interests, education, and personality traits
- **AI-Powered Recommendations**: Match user profiles to suitable career paths using an intelligent algorithm
- **Detailed Career Information**: Display career details including required skills, education, and job descriptions
- **Match Percentage**: See how well each career matches your profile with a visual score indicator

## Technology Stack

- **Next.js**: React framework for building the web application
- **React**: Frontend user interface
- **Tailwind CSS**: Styling and responsive design
- **API Routes**: Server-side recommendation processing

## How to Run Locally

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment on Vercel

This project is designed to be easily deployed on Vercel. Follow these steps:

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```
3. Deploy the project:
   ```
   vercel
   ```

Alternatively, you can connect your GitHub repository to Vercel for automatic deployments:

1. Push your code to a GitHub repository
2. Import the project into Vercel
3. Configure your deployment settings
4. Deploy

## How It Works

The recommendation system uses a scoring algorithm that evaluates:

- **Skills Match**: How well your skills align with each career's required skills (35%)
- **Interest Alignment**: How your interests match the career's field (40%)
- **Education Fit**: Whether your education level meets the career requirements (15%)
- **Personality Compatibility**: How your personality traits align with the career (10%)

The system provides the top 5 career matches based on your profile.

## Customization

You can customize the career data in `app/utils/careerData.js` to add more careers or modify existing ones.

## License

This project is available as open source under the terms of the MIT License. 