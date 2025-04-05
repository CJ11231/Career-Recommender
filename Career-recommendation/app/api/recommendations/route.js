import { NextResponse } from 'next/server';
import careerData from './careerData';

function calculateMatchScore(profile, career) {
  let score = 0;
  let maxScore = 0;
  
  // Match interests
  if (profile.interests && profile.interests.length > 0) {
    maxScore += 40;
    profile.interests.forEach(interest => {
      if (career.fields.includes(interest)) {
        score += 40 / profile.interests.length;
      }
    });
  }
  
  // Match skills
  if (profile.skills) {
    const skillsList = profile.skills.toLowerCase().split(/,|\.|;|\n/).map(s => s.trim()).filter(s => s);
    maxScore += 35;
    
    const careerSkills = career.requiredSkills.map(s => s.toLowerCase());
    let skillMatches = 0;
    
    skillsList.forEach(skill => {
      if (careerSkills.some(cs => cs.includes(skill) || skill.includes(cs))) {
        skillMatches++;
      }
    });
    
    score += Math.min(35, (skillMatches / Math.max(1, skillsList.length)) * 35);
  }
  
  // Match education
  if (profile.educationLevel) {
    maxScore += 15;
    const educationLevel = profile.educationLevel.toLowerCase();
    
    if (career.education.toLowerCase().includes(educationLevel)) {
      score += 15;
    } else if (educationLevel.includes("master") || educationLevel.includes("doctorate")) {
      // Higher education than required is usually acceptable
      score += 15;
    } else if (educationLevel.includes("bachelor") && !career.education.toLowerCase().includes("master")) {
      // Bachelor's degree for a job that requires less
      score += 15;
    }
  }
  
  // Match personality
  if (profile.personalityTraits) {
    maxScore += 10;
    const personalityMatches = career.personalities.filter(
      trait => profile.personalityTraits.toLowerCase().includes(trait)
    );
    
    score += (personalityMatches.length / career.personalities.length) * 10;
  }
  
  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 50;
}

export async function POST(request) {
  try {
    const profile = await request.json();
    
    // Calculate match scores for each career
    const scoredCareers = careerData.map(career => ({
      ...career,
      matchPercentage: calculateMatchScore(profile, career)
    }));
    
    // Sort careers by match percentage
    const sortedCareers = scoredCareers
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 5); // Return top 5 matches
    
    return NextResponse.json(sortedCareers);
  } catch (error) {
    console.error('Error processing career recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to process recommendations' },
      { status: 500 }
    );
  }
} 