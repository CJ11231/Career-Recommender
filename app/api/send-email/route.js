import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import sendRecommendationEmail from '../../utils/emailService';

export async function POST(request) {
  try {
    // Get the authenticated user
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. You must be logged in to send an email.' },
        { status: 401 }
      );
    }
    
    // Get the recommendations from the request body
    const { recommendations } = await request.json();
    
    if (!recommendations || !Array.isArray(recommendations) || recommendations.length === 0) {
      return NextResponse.json(
        { error: 'Invalid recommendations data' },
        { status: 400 }
      );
    }
    
    // Send the email
    await sendRecommendationEmail(session.user, recommendations);
    
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    );
  }
} 