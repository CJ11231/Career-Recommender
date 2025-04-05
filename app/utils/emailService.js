import nodemailer from 'nodemailer';
import getRecommendedCourses from './courseRecommendations';

// Email configuration
const createTransporter = () => {
  // Only try to connect if we have the required environment variables
  if (process.env.EMAIL_SERVER_HOST && 
      process.env.EMAIL_SERVER_PORT && 
      process.env.EMAIL_SERVER_USER && 
      process.env.EMAIL_SERVER_PASSWORD) {
    
    return nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT, 10),
      secure: process.env.EMAIL_SERVER_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });
  }
  
  // Return a dummy transporter for builds/static rendering
  return {
    verify: () => Promise.resolve(true),
    sendMail: () => Promise.resolve({ messageId: 'dummy-message-id' })
  };
};

const transporter = createTransporter();

// Verify SMTP connection configuration - but don't fail the build if it doesn't work
const verifyConnection = async () => {
  try {
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
      // Skip verification during build time on Vercel
      console.log('Skipping SMTP verification during build on Vercel');
      return true;
    }
    
    const verificationResult = await transporter.verify();
    if (verificationResult) {
      console.log('SMTP server connection established successfully');
      return true;
    }
    return false;
  } catch (error) {
    console.error('SMTP connection error:', error.message);
    // Don't fail builds because of SMTP connection issues
    return process.env.NODE_ENV === 'production';
  }
};

// Attempt to verify connection when the file is first imported, but only in development
if (process.env.NODE_ENV !== 'production') {
  verifyConnection();
}

/**
 * Generate HTML email content for career recommendations
 * @param {Object} user - User information from NextAuth session
 * @param {Array} recommendations - Career recommendations data
 * @returns {String} - HTML content for email
 */
function generateEmailHTML(user, recommendations) {
  const userName = user.name || 'there';
  
  // Start with email header
  let emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Career Recommendations</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #4f46e5;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          background-color: #f9fafb;
          padding: 20px;
          border-radius: 0 0 5px 5px;
        }
        .career-card {
          background-color: white;
          border-left: 4px solid #4f46e5;
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .career-title {
          font-size: 18px;
          font-weight: bold;
          color: #4f46e5;
          margin-bottom: 10px;
        }
        .section-title {
          font-size: 16px;
          font-weight: bold;
          margin-top: 15px;
          margin-bottom: 5px;
        }
        .skill-tag {
          display: inline-block;
          background-color: #e0e7ff;
          color: #4338ca;
          padding: 3px 8px;
          margin-right: 5px;
          margin-bottom: 5px;
          border-radius: 20px;
          font-size: 12px;
        }
        .course-card {
          background-color: #f0f9ff;
          border-left: 4px solid #0284c7;
          padding: 12px;
          margin-top: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
        }
        .course-title {
          font-size: 14px;
          font-weight: bold;
          color: #0284c7;
        }
        .platform-badge {
          display: inline-block;
          background-color: #0284c7;
          color: white;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 11px;
          margin-left: 5px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #6b7280;
          margin-top: 30px;
        }
        a {
          color: #4f46e5;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Your Career Recommendations</h1>
        <p>Based on your unique profile</p>
      </div>
      <div class="content">
        <p>Hello ${userName},</p>
        <p>Thank you for using our AI Career Recommendation service. Based on your skills, interests, and education level, we've identified the following career paths that might be a great fit for you:</p>
  `;
  
  // Add each career recommendation
  recommendations.forEach((career, index) => {
    // Get course recommendations for this career
    const courses = getRecommendedCourses(career.requiredSkills);
    
    emailContent += `
      <div class="career-card">
        <div class="career-title">${index + 1}. ${career.title}</div>
        <p>${career.description}</p>
        
        <div class="section-title">Required Skills:</div>
        <div>
          ${career.requiredSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join(' ')}
        </div>
        
        <div class="section-title">Education Requirements:</div>
        <p>${career.education}</p>
        
        <div class="section-title">Match Score:</div>
        <p>Your profile matches this career at <strong>${career.matchPercentage}%</strong></p>
        
        <div class="section-title">Recommended Courses:</div>
        ${courses.map(course => `
          <div class="course-card">
            <div class="course-title">
              ${course.title}
              <span class="platform-badge">${course.platform}</span>
            </div>
            <p>Provider: ${course.provider}</p>
            <p>${course.description}</p>
            <a href="${course.url}" target="_blank">View Course</a>
          </div>
        `).join('')}
      </div>
    `;
  });
  
  // Add footer and close tags
  emailContent += `
        <p>We hope these recommendations help you in your career journey. If you want to explore more options or get updated recommendations, feel free to visit our website again.</p>
        
        <p>Best regards,<br>AI Career Recommender Team</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} AI Career Recommender. All rights reserved.</p>
        <p>This email was sent to ${user.email}</p>
      </div>
    </body>
    </html>
  `;
  
  return emailContent;
}

/**
 * Send an email with career recommendations to the user
 * @param {Object} user - User information from NextAuth session
 * @param {Array} recommendations - Career recommendations data
 * @returns {Promise} - Result of the email sending operation
 */
export async function sendRecommendationEmail(user, recommendations) {
  if (!user || !user.email || !recommendations || recommendations.length === 0) {
    throw new Error('Invalid parameters for sending email');
  }
  
  // Skip actual email sending during build time
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL && process.env.VERCEL_ENV === 'preview') {
    console.log('Skipping email sending during build/preview on Vercel');
    return { messageId: 'dummy-message-id-for-build' };
  }
  
  // Verify connection before sending
  const isConnected = await verifyConnection();
  if (!isConnected) {
    console.warn('Failed to connect to email server. Will try to send anyway.');
  }
  
  const htmlContent = generateEmailHTML(user, recommendations);
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || '"AI Career Recommender" <noreply@career-recommender.com>',
    to: user.email,
    subject: 'Your Career Recommendations',
    html: htmlContent,
  };
  
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw errors in production to prevent page failures
    if (process.env.NODE_ENV === 'production') {
      console.error('Email sending failed but continuing execution');
      return { error: error.message, sent: false };
    }
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

export default sendRecommendationEmail; 