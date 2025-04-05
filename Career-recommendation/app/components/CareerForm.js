'use client'

import { useState, useEffect } from 'react'

const educationLevels = [
  "High School Diploma",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Professional Certification",
  "Self-taught",
  "Other"
]

const interestOptions = [
  // Technology
  "Software Development", "Web Development", "Mobile App Development", 
  "Data Science", "Machine Learning", "Artificial Intelligence", 
  "Cybersecurity", "Cloud Computing", "DevOps", "Blockchain", "Game Development",
  "IT Support", "Network Administration", "IoT Development", "VR/AR Development",
  
  // Business & Finance
  "Entrepreneurship", "Marketing", "Sales", "Finance", "Investment", 
  "Business Administration", "E-commerce", "Digital Marketing", "Project Management",
  "Accounting", "Financial Planning", "Human Resources", "Supply Chain Management",
  "International Business", "Retail Management", "Non-profit Management",
  
  // Healthcare
  "Medicine", "Nursing", "Public Health", "Mental Health", 
  "Physical Therapy", "Nutrition", "Healthcare Management",
  "Dentistry", "Pharmacy", "Veterinary Medicine", "Occupational Therapy",
  "Health Education", "Medical Research", "Alternative Medicine", "Geriatric Care",
  
  // Arts & Design
  "Graphic Design", "UX/UI Design", "Animation", "Photography", 
  "Video Production", "Music", "Fashion Design", "Interior Design",
  "Fine Arts", "Creative Writing", "Theater/Acting", "Dance", "Film Production",
  "Architecture", "Industrial Design", "Digital Art", "Pottery/Ceramics", "Crafting",
  
  // Education
  "Teaching", "Curriculum Development", "Educational Technology", 
  "Training & Development", "Academic Research",
  "School Administration", "Special Education", "Early Childhood Education",
  "Higher Education", "Adult Education", "Language Teaching", "Educational Psychology",
  "Library Science", "Museum Education", "Instructional Design",
  
  // Science & Engineering
  "Biology", "Chemistry", "Physics", "Environmental Science", 
  "Civil Engineering", "Mechanical Engineering", "Electrical Engineering", 
  "Aerospace Engineering", "Renewable Energy",
  "Genetics", "Astronomy", "Geology", "Marine Science", "Meteorology",
  "Biomedical Engineering", "Material Science", "Nuclear Engineering", "Robotics",
  
  // Media & Communication
  "Journalism", "Public Relations", "Content Creation", "Social Media Management",
  "Broadcasting", "Publishing", "Copywriting", "Technical Writing",
  "Podcasting", "Translation", "Media Production", "Speech Communication",
  
  // Social Sciences
  "Psychology", "Sociology", "Anthropology", "Economics", "Political Science",
  "International Relations", "Urban Planning", "Social Work", "Counseling",
  "Criminal Justice", "Community Development", "Human Services", "Gender Studies",
  
  // Outdoor & Environment
  "Environmental Conservation", "Forestry", "Wildlife Management", "Agriculture",
  "Horticulture", "Landscape Architecture", "Marine Conservation", "Sustainable Development",
  "Park Ranger", "Outdoor Education", "Natural Resource Management", "Ecology",
  
  // Culinary & Hospitality
  "Culinary Arts", "Hospitality Management", "Tourism", "Event Planning",
  "Restaurant Management", "Food Science", "Baking/Pastry Arts", "Sommelier",
  "Hotel Management", "Catering", "Brewing/Distilling", "Resort Management",
  
  // Sports & Wellness
  "Sports Management", "Fitness Training", "Physical Education", "Sports Medicine",
  "Athletic Coaching", "Sports Psychology", "Yoga/Meditation Teaching", "Recreational Therapy",
  "Massage Therapy", "Wellness Consulting", "Dietetics", "Holistic Health",
  
  // Trades & Crafts
  "Carpentry", "Electrical Work", "Plumbing", "Welding", "Automotive Repair",
  "HVAC", "Masonry", "Woodworking", "Construction", "Glassblowing",
  "Jewelry Making", "Textile Arts", "Blacksmithing", "Home Renovation"
]

// Group interests by category for better display
const interestCategories = {
  "Technology": [
    "Software Development", "Web Development", "Mobile App Development", 
    "Data Science", "Machine Learning", "Artificial Intelligence", 
    "Cybersecurity", "Cloud Computing", "DevOps", "Blockchain", "Game Development",
    "IT Support", "Network Administration", "IoT Development", "VR/AR Development"
  ],
  "Business & Finance": [
    "Entrepreneurship", "Marketing", "Sales", "Finance", "Investment", 
    "Business Administration", "E-commerce", "Digital Marketing", "Project Management",
    "Accounting", "Financial Planning", "Human Resources", "Supply Chain Management",
    "International Business", "Retail Management", "Non-profit Management"
  ],
  "Healthcare": [
    "Medicine", "Nursing", "Public Health", "Mental Health", 
    "Physical Therapy", "Nutrition", "Healthcare Management",
    "Dentistry", "Pharmacy", "Veterinary Medicine", "Occupational Therapy",
    "Health Education", "Medical Research", "Alternative Medicine", "Geriatric Care"
  ],
  "Arts & Design": [
    "Graphic Design", "UX/UI Design", "Animation", "Photography", 
    "Video Production", "Music", "Fashion Design", "Interior Design",
    "Fine Arts", "Creative Writing", "Theater/Acting", "Dance", "Film Production",
    "Architecture", "Industrial Design", "Digital Art", "Pottery/Ceramics", "Crafting"
  ],
  "Education": [
    "Teaching", "Curriculum Development", "Educational Technology", 
    "Training & Development", "Academic Research",
    "School Administration", "Special Education", "Early Childhood Education",
    "Higher Education", "Adult Education", "Language Teaching", "Educational Psychology",
    "Library Science", "Museum Education", "Instructional Design"
  ],
  "Science & Engineering": [
    "Biology", "Chemistry", "Physics", "Environmental Science", 
    "Civil Engineering", "Mechanical Engineering", "Electrical Engineering", 
    "Aerospace Engineering", "Renewable Energy",
    "Genetics", "Astronomy", "Geology", "Marine Science", "Meteorology",
    "Biomedical Engineering", "Material Science", "Nuclear Engineering", "Robotics"
  ],
  "Media & Communication": [
    "Journalism", "Public Relations", "Content Creation", "Social Media Management",
    "Broadcasting", "Publishing", "Copywriting", "Technical Writing",
    "Podcasting", "Translation", "Media Production", "Speech Communication"
  ],
  "Social Sciences": [
    "Psychology", "Sociology", "Anthropology", "Economics", "Political Science",
    "International Relations", "Urban Planning", "Social Work", "Counseling",
    "Criminal Justice", "Community Development", "Human Services", "Gender Studies" 
  ],
  "Outdoor & Environment": [
    "Environmental Conservation", "Forestry", "Wildlife Management", "Agriculture",
    "Horticulture", "Landscape Architecture", "Marine Conservation", "Sustainable Development",
    "Park Ranger", "Outdoor Education", "Natural Resource Management", "Ecology"
  ],
  "Culinary & Hospitality": [
    "Culinary Arts", "Hospitality Management", "Tourism", "Event Planning",
    "Restaurant Management", "Food Science", "Baking/Pastry Arts", "Sommelier",
    "Hotel Management", "Catering", "Brewing/Distilling", "Resort Management"
  ],
  "Sports & Wellness": [
    "Sports Management", "Fitness Training", "Physical Education", "Sports Medicine",
    "Athletic Coaching", "Sports Psychology", "Yoga/Meditation Teaching", "Recreational Therapy",
    "Massage Therapy", "Wellness Consulting", "Dietetics", "Holistic Health"
  ],
  "Trades & Crafts": [
    "Carpentry", "Electrical Work", "Plumbing", "Welding", "Automotive Repair",
    "HVAC", "Masonry", "Woodworking", "Construction", "Glassblowing",
    "Jewelry Making", "Textile Arts", "Blacksmithing", "Home Renovation"
  ]
}

export default function CareerForm({ onSubmit, loading, preselectedInterests = [] }) {
  const [formData, setFormData] = useState({
    skills: '',
    interests: [],
    customInterests: '',
    educationLevel: '',
    personalityTraits: '',
    workPreference: '',
    careerGoals: ''
  })
  
  const [activeCategory, setActiveCategory] = useState('Technology')
  
  // Initialize form with preselected interests if provided
  useEffect(() => {
    if (preselectedInterests && preselectedInterests.length > 0) {
      setFormData(prev => ({
        ...prev,
        interests: [...preselectedInterests]
      }))
      
      // Try to set the active category based on the first preselected interest
      for (const category in interestCategories) {
        if (interestCategories[category].some(interest => preselectedInterests.includes(interest))) {
          setActiveCategory(category)
          break
        }
      }
    }
  }, [preselectedInterests])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleInterestChange = (interest) => {
    setFormData(prev => {
      if (prev.interests.includes(interest)) {
        return {
          ...prev,
          interests: prev.interests.filter(i => i !== interest)
        }
      } else {
        return {
          ...prev,
          interests: [...prev.interests, interest]
        }
      }
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Combine selected interests with custom interests
    const allInterests = [...formData.interests]
    
    if (formData.customInterests.trim()) {
      // Split by commas and add each custom interest
      const customInterestsList = formData.customInterests
        .split(',')
        .map(interest => interest.trim())
        .filter(interest => interest.length > 0)
      
      allInterests.push(...customInterestsList)
    }
    
    // Submit the form with all data
    onSubmit({
      ...formData,
      interests: allInterests
    })
  }

  return (
    <div className="card">
      {preselectedInterests.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-indigo-800">
                Quiz Results Applied
              </h3>
              <div className="mt-2 text-sm text-indigo-700">
                <p>
                  We've used your quiz results to pre-select some interests. You can modify these selections or add more details to get personalized recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <h2 className="section-title">Tell Us About Yourself</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="skills" className="form-label">
            Skills & Strengths
          </label>
          <textarea
            id="skills"
            name="skills"
            rows={4}
            required
            className="form-input"
            placeholder="E.g., programming, problem-solving, analytical thinking, communication..."
            value={formData.skills}
            onChange={handleChange}
          />
          <p className="form-hint">
            List your technical and soft skills. The more specific, the better!
          </p>
        </div>
        
        <div>
          <label className="form-label">
            Interests
          </label>
          
          <div className="mb-4 flex flex-wrap gap-2">
            {Object.keys(interestCategories).map(category => (
              <button 
                key={category}
                type="button"
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="mb-4 flex flex-wrap">
            {interestCategories[activeCategory].map(interest => (
              <div 
                key={interest} 
                onClick={() => handleInterestChange(interest)}
                className={`interest-badge ${
                  formData.interests.includes(interest) ? 'interest-badge-selected' : ''
                }`}
              >
                {interest}
              </div>
            ))}
          </div>
          
          <div className="mb-2">
            <label htmlFor="customInterests" className="form-label">
              Other Interests (comma-separated)
            </label>
            <input
              id="customInterests"
              name="customInterests"
              type="text"
              className="form-input"
              placeholder="E.g., cooking, traveling, woodworking, chess"
              value={formData.customInterests}
              onChange={handleChange}
            />
          </div>
          
          <div className="mt-2 bg-gray-50 p-4 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-2">Selected Interests:</p>
            <div className="flex flex-wrap">
              {formData.interests.length > 0 ? (
                formData.interests.map(interest => (
                  <span 
                    key={interest} 
                    className="bg-indigo-600 text-white text-xs rounded-full px-3 py-1 m-1"
                  >
                    {interest}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">No interests selected yet</p>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="educationLevel" className="form-label">
            Education Level
          </label>
          <select
            id="educationLevel"
            name="educationLevel"
            required
            className="form-input"
            value={formData.educationLevel}
            onChange={handleChange}
          >
            <option value="" disabled>Select education level</option>
            {educationLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="workPreference" className="form-label">
            Work Environment Preference
          </label>
          <select
            id="workPreference"
            name="workPreference"
            className="form-input"
            value={formData.workPreference}
            onChange={handleChange}
          >
            <option value="" disabled>Select preference</option>
            <option value="Remote">Remote Work</option>
            <option value="Office">Office-based</option>
            <option value="Hybrid">Hybrid (Mix of Remote & Office)</option>
            <option value="Flexible">Flexible</option>
            <option value="Fieldwork">Field Work / Outdoors</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="personalityTraits" className="form-label">
            Personality Traits
          </label>
          <textarea
            id="personalityTraits"
            name="personalityTraits"
            rows={3}
            className="form-input"
            placeholder="E.g., I enjoy leading teams, I'm detail-oriented, I prefer working independently..."
            value={formData.personalityTraits}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="careerGoals" className="form-label">
            Career Goals
          </label>
          <textarea
            id="careerGoals"
            name="careerGoals"
            rows={3}
            className="form-input"
            placeholder="E.g., Looking for work-life balance, want to make an impact, seeking career advancement..."
            value={formData.careerGoals}
            onChange={handleChange}
          />
        </div>
        
        <div className="text-center">
          <button
            type="submit"
            className="btn-primary w-full md:w-auto md:px-8"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              'Get Career Recommendations'
            )}
          </button>
        </div>
      </form>
    </div>
  )
} 