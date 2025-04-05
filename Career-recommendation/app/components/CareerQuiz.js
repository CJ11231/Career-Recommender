'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Quiz questions with multiple-choice answers
const quizQuestions = [
  {
    id: 1,
    question: "How do you prefer to solve problems?",
    options: [
      { text: "Analyzing data and finding patterns", interests: ["Data Science", "Research", "Analytics"] },
      { text: "Coming up with creative solutions", interests: ["Design", "Creative", "Innovation"] },
      { text: "Working with a team to brainstorm ideas", interests: ["Collaboration", "Leadership", "Communication"] },
      { text: "Following established procedures and best practices", interests: ["Process-oriented", "Detail-focused", "Methodical"] }
    ]
  },
  {
    id: 2,
    question: "In a group project, which role do you naturally take on?",
    options: [
      { text: "The leader who organizes everything", interests: ["Leadership", "Management", "Organization"] },
      { text: "The creative who comes up with ideas", interests: ["Creative", "Innovation", "Ideation"] },
      { text: "The analyst who researches and provides facts", interests: ["Analysis", "Research", "Detail-oriented"] },
      { text: "The mediator who ensures everyone works well together", interests: ["Communication", "Empathy", "Teamwork"] }
    ]
  },
  {
    id: 3,
    question: "What type of work environment appeals to you most?",
    options: [
      { text: "A structured office with clear expectations", interests: ["Structure", "Consistency", "Process-oriented"] },
      { text: "A creative studio where ideas flow freely", interests: ["Creativity", "Innovation", "Flexibility"] },
      { text: "A dynamic environment with changing challenges", interests: ["Adaptability", "Problem-solving", "Variety"] },
      { text: "Working remotely with autonomy", interests: ["Independence", "Self-motivation", "Flexibility"] }
    ]
  },
  {
    id: 4,
    question: "How do you prefer to learn new skills?",
    options: [
      { text: "Reading books and researching information", interests: ["Research", "Analysis", "Self-directed"] },
      { text: "Watching tutorials and demonstrations", interests: ["Visual learning", "Observation", "Technical"] },
      { text: "Hands-on practice and experimentation", interests: ["Practical", "Experiential", "Hands-on"] },
      { text: "Learning from a mentor or in a class setting", interests: ["Collaborative learning", "Structured learning", "Relationship-oriented"] }
    ]
  },
  {
    id: 5,
    question: "What motivates you most in your work?",
    options: [
      { text: "Making a positive impact on others", interests: ["Helping", "Community-oriented", "Service"] },
      { text: "Achieving recognition for your contributions", interests: ["Achievement", "Recognition", "Competition"] },
      { text: "Learning and mastering new skills", interests: ["Growth", "Learning", "Mastery"] },
      { text: "Financial success and security", interests: ["Pragmatic", "Financial", "Security-oriented"] }
    ]
  },
  {
    id: 6,
    question: "Which of these activities would you enjoy most in your free time?",
    options: [
      { text: "Exploring nature and outdoor activities", interests: ["Outdoors", "Physical", "Nature"] },
      { text: "Creating art, music, or writing", interests: ["Artistic", "Creative", "Expressive"] },
      { text: "Building or fixing things", interests: ["Mechanical", "Practical", "Technical"] },
      { text: "Reading about new scientific discoveries", interests: ["Scientific", "Intellectual", "Curious"] }
    ]
  },
  {
    id: 7,
    question: "How do you feel about working with technology?",
    options: [
      { text: "I love it and stay up-to-date with the latest trends", interests: ["Technology", "Innovation", "Technical"] },
      { text: "I enjoy using technology as a tool for creativity", interests: ["Digital creativity", "Technical", "Innovative"] },
      { text: "I use it when necessary but prefer working with people", interests: ["People-oriented", "Communication", "Service"] },
      { text: "I prefer practical, hands-on work over digital tools", interests: ["Practical", "Hands-on", "Tactile"] }
    ]
  },
  {
    id: 8,
    question: "Which of these subjects did you enjoy most in school?",
    options: [
      { text: "Mathematics and logic puzzles", interests: ["Analytical", "Logical", "Quantitative"] },
      { text: "Languages and communication", interests: ["Communication", "Language", "Expression"] },
      { text: "Art, music, or creative writing", interests: ["Arts", "Creative", "Expressive"] },
      { text: "Science and laboratory experiments", interests: ["Scientific", "Experimental", "Analytical"] }
    ]
  },
  {
    id: 9,
    question: "When facing a tight deadline, how do you respond?",
    options: [
      { text: "Create a detailed plan and methodically work through it", interests: ["Organized", "Methodical", "Structured"] },
      { text: "Focus intensely and work efficiently under pressure", interests: ["Performance under pressure", "Focus", "Efficiency"] },
      { text: "Collaborate with others to divide and conquer the task", interests: ["Collaborative", "Team-oriented", "Delegating"] },
      { text: "Find creative shortcuts to complete the work quickly", interests: ["Creative problem-solving", "Adaptable", "Efficient"] }
    ]
  },
  {
    id: 10,
    question: "Which of these values is most important to you in a career?",
    options: [
      { text: "Helping others and making a difference", interests: ["Service", "Social impact", "Altruistic"] },
      { text: "Innovation and pushing boundaries", interests: ["Innovation", "Pioneering", "Growth"] },
      { text: "Stability and work-life balance", interests: ["Balance", "Stability", "Well-being"] },
      { text: "Status and recognition for excellence", interests: ["Achievement", "Recognition", "Excellence"] }
    ]
  }
]

// Map interests to career fields
const interestToCareerMap = {
  "Data Science": ["Data Science", "Machine Learning", "Statistics", "Business Analytics"],
  "Research": ["Academic Research", "Scientific Research", "Market Research", "Healthcare Research"],
  "Analytics": ["Data Analysis", "Business Intelligence", "Financial Analysis", "Operations Research"],
  "Design": ["Graphic Design", "UX/UI Design", "Interior Design", "Industrial Design", "Fashion Design"],
  "Creative": ["Art", "Writing", "Design", "Music", "Film Production"],
  "Innovation": ["Product Development", "Entrepreneurship", "R&D", "Technology Innovation"],
  "Collaboration": ["Project Management", "Team Leadership", "Community Management", "Education"],
  "Leadership": ["Management", "Entrepreneurship", "Team Leadership", "Executive Roles"],
  "Communication": ["Marketing", "Public Relations", "Human Resources", "Teaching", "Customer Service"],
  "Process-oriented": ["Quality Assurance", "Operations", "Project Management", "Administrative Roles"],
  "Detail-focused": ["Accounting", "Editing", "Research", "Quality Control", "Software Testing"],
  "Methodical": ["Engineering", "Finance", "Operations", "Legal", "Technical Writing"],
  "Management": ["Business Administration", "Project Management", "Team Management", "Operations Management"],
  "Organization": ["Event Planning", "Project Coordination", "Office Management", "Logistics"],
  "Analysis": ["Data Analysis", "Financial Analysis", "Market Research", "Systems Analysis"],
  "Detail-oriented": ["Quality Assurance", "Editing", "Accounting", "Software Testing"],
  "Empathy": ["Counseling", "Healthcare", "Human Resources", "Customer Support", "Social Work"],
  "Teamwork": ["Team Management", "Collaborative Roles", "Education", "Healthcare"],
  "Structure": ["Accounting", "Legal", "Administration", "Quality Assurance"],
  "Consistency": ["Manufacturing", "Finance", "Operations", "Systems Administration"],
  "Creativity": ["Design", "Content Creation", "Marketing", "Product Development", "Arts"],
  "Flexibility": ["Freelancing", "Consulting", "Remote Work", "Entrepreneurship"],
  "Adaptability": ["Sales", "Customer Service", "Entrepreneurship", "Project Management"],
  "Problem-solving": ["Engineering", "Information Technology", "Research", "Consulting"],
  "Variety": ["Journalism", "Event Management", "Consulting", "Entrepreneurship"],
  "Independence": ["Freelancing", "Research", "Writing", "Entrepreneurship"],
  "Self-motivation": ["Remote Work", "Sales", "Entrepreneurship", "Independent Research"],
  "Research": ["Scientific Research", "Market Research", "Academic Research", "R&D"],
  "Self-directed": ["Entrepreneurship", "Independent Consulting", "Self-Employment"],
  "Visual learning": ["Design", "Architecture", "Video Production", "Visual Arts"],
  "Observation": ["Research", "Quality Assurance", "Scientific Fields", "Behavioral Analysis"],
  "Technical": ["Engineering", "IT", "Technical Support", "Systems Administration"],
  "Practical": ["Trades", "Engineering", "Healthcare", "Technical Roles"],
  "Experiential": ["Education", "Training & Development", "Coaching", "Performing Arts"],
  "Hands-on": ["Healthcare", "Trades", "Culinary Arts", "Physical Therapy"],
  "Collaborative learning": ["Education", "Team Environments", "Healthcare"],
  "Structured learning": ["Academic Fields", "Technical Roles", "Certification-based Careers"],
  "Relationship-oriented": ["Sales", "Human Resources", "Counseling", "Customer Relations"],
  "Helping": ["Healthcare", "Education", "Social Work", "Nonprofit Work"],
  "Community-oriented": ["Community Services", "Nonprofit Management", "Public Administration"],
  "Service": ["Healthcare", "Education", "Hospitality", "Customer Service"],
  "Achievement": ["Sales", "Entrepreneurship", "Executive Roles", "Competitive Fields"],
  "Recognition": ["Performing Arts", "Sales", "Leadership Roles", "Competitive Fields"],
  "Competition": ["Sales", "Sports Management", "Law", "Competitive Business Roles"],
  "Growth": ["Startups", "Education", "Personal Development Fields", "Growing Industries"],
  "Learning": ["Research", "Education", "Technology Fields", "Academic Careers"],
  "Mastery": ["Specialized Technical Fields", "Arts", "Craftsmanship", "Expert Consulting"],
  "Pragmatic": ["Business", "Finance", "Technical Roles", "Project Management"],
  "Financial": ["Finance", "Accounting", "Investment Banking", "Financial Planning"],
  "Security-oriented": ["Government Roles", "Healthcare", "IT Security", "Established Industries"],
  "Outdoors": ["Environmental Science", "Agriculture", "Forestry", "Outdoor Recreation"],
  "Physical": ["Sports Training", "Physical Therapy", "Construction", "Outdoor Work"],
  "Nature": ["Environmental Conservation", "Zoology", "Botany", "Park Management"],
  "Artistic": ["Fine Arts", "Performing Arts", "Design", "Creative Writing"],
  "Expressive": ["Communications", "Performing Arts", "Creative Writing", "Teaching"],
  "Mechanical": ["Engineering", "Automotive", "Manufacturing", "Technical Trades"],
  "Scientific": ["Research", "Laboratory Work", "Medicine", "Data Science"],
  "Intellectual": ["Academia", "Research", "Writing", "Law"],
  "Curious": ["Research", "Journalism", "Science", "Market Analysis"],
  "Technology": ["IT", "Software Development", "Digital Media", "Engineering"],
  "Technical": ["Engineering", "Technical Support", "IT Security", "Systems Administration"],
  "Digital creativity": ["Digital Design", "Web Development", "Social Media", "Digital Marketing"],
  "Innovative": ["Product Development", "Technology Startups", "Research & Development"],
  "People-oriented": ["Human Resources", "Teaching", "Sales", "Healthcare"],
  "Service": ["Hospitality", "Healthcare", "Education", "Customer Support"],
  "Practical": ["Trades", "Engineering", "Technical Support", "Construction"],
  "Tactile": ["Massage Therapy", "Surgery", "Trades", "Culinary Arts"],
  "Analytical": ["Data Analysis", "Research", "Finance", "Engineering"],
  "Logical": ["Programming", "Mathematics", "Engineering", "Financial Analysis"],
  "Quantitative": ["Finance", "Economics", "Statistics", "Accounting"],
  "Language": ["Translation", "Teaching", "Writing", "International Business"],
  "Expression": ["Communications", "Marketing", "Creative Writing", "Performance"],
  "Arts": ["Fine Arts", "Design", "Performance", "Creative Direction"],
  "Scientific": ["Research", "Medical Fields", "Environmental Science", "Engineering"],
  "Experimental": ["Research & Development", "Laboratory Work", "Product Testing"],
  "Organized": ["Project Management", "Administrative Roles", "Event Planning"],
  "Structured": ["Accounting", "Legal", "Manufacturing", "Systems Administration"],
  "Performance under pressure": ["Emergency Services", "Healthcare", "Law", "Journalism"],
  "Focus": ["Programming", "Surgery", "Air Traffic Control", "Professional Sports"],
  "Efficiency": ["Operations", "Engineering", "Project Management", "Consulting"],
  "Team-oriented": ["Team Sports", "Project Teams", "Collaborative Environments"],
  "Delegating": ["Management", "Team Leadership", "Project Coordination"],
  "Creative problem-solving": ["Design", "Engineering", "Marketing", "Entrepreneurship"],
  "Adaptable": ["Sales", "Emergency Services", "Entrepreneurship", "Freelancing"],
  "Service": ["Healthcare", "Education", "Nonprofit Work", "Public Service"],
  "Social impact": ["Nonprofit Management", "Social Entrepreneurship", "Public Policy"],
  "Altruistic": ["Social Work", "Healthcare", "Environmental Conservation", "Nonprofit"],
  "Innovation": ["Research & Development", "Startups", "Technology Fields"],
  "Pioneering": ["Entrepreneurship", "Scientific Research", "Emerging Technologies"],
  "Balance": ["Government Work", "Education", "Established Companies"],
  "Stability": ["Healthcare", "Education", "Government", "Utilities"],
  "Well-being": ["Healthcare", "Wellness Coaching", "Work-Life Balance Focused Roles"],
  "Achievement": ["Competitive Fields", "Sales", "Executive Positions"],
  "Recognition": ["Performance", "Competitive Business", "Leadership Roles"],
  "Excellence": ["Specialized Expertise", "Research", "Competitive Fields"]
}

export default function CareerQuiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill([]))
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(false)
  
  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...answers]
    
    // Toggle selection for multiple choice
    if (Array.isArray(newAnswers[currentQuestion])) {
      // If option is already selected, remove it
      if (newAnswers[currentQuestion].includes(answerIndex)) {
        newAnswers[currentQuestion] = newAnswers[currentQuestion].filter(index => index !== answerIndex)
      } else {
        // Otherwise, add it
        newAnswers[currentQuestion] = [...newAnswers[currentQuestion], answerIndex]
      }
    } else {
      // Initialize as array if not already
      newAnswers[currentQuestion] = [answerIndex]
    }
    
    setAnswers(newAnswers)
  }
  
  // Check if current question has any selected answers
  const hasSelections = () => {
    return answers[currentQuestion] && answers[currentQuestion].length > 0
  }
  
  // Move to next question
  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (hasSelections()) {
      calculateResults()
    }
  }
  
  // Calculate quiz results
  const calculateResults = () => {
    setLoading(true)
    
    // Count occurrences of each interest
    const interestCounts = {}
    
    answers.forEach((selectedAnswers, questionIndex) => {
      if (Array.isArray(selectedAnswers) && selectedAnswers.length > 0) {
        selectedAnswers.forEach(answerIndex => {
          const interests = quizQuestions[questionIndex].options[answerIndex].interests
          
          interests.forEach(interest => {
            if (!interestCounts[interest]) {
              interestCounts[interest] = 0
            }
            interestCounts[interest]++
          })
        })
      }
    })
    
    // Calculate top interests
    const sortedInterests = Object.entries(interestCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(entry => entry[0])
    
    // Map interests to potential careers
    const potentialCareers = new Set()
    sortedInterests.forEach(interest => {
      const careers = interestToCareerMap[interest] || []
      careers.forEach(career => potentialCareers.add(career))
    })
    
    // Set results
    setResults({
      topInterests: sortedInterests,
      careers: Array.from(potentialCareers).slice(0, 10)
    })
    
    setShowResults(true)
    setLoading(false)
  }
  
  // Go back to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }
  
  // Start quiz over
  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers(Array(quizQuestions.length).fill([]))
    setShowResults(false)
    setResults({})
  }
  
  // Pass results to parent component
  const handleUseResults = () => {
    if (onComplete) {
      onComplete(results)
    }
  }
  
  // If showing results
  if (showResults) {
    return (
      <div className="card">
        <h2 className="section-title">Your Career Quiz Results</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Your Top Interest Areas:</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {results.topInterests.map((interest, index) => (
              <div key={index} className="quiz-result-badge">
                {interest}
              </div>
            ))}
          </div>
          
          <h3 className="text-lg font-medium text-gray-800 mb-3">Potential Career Paths:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
            {results.careers.map((career, index) => (
              <li key={index} className="quiz-result-item">
                <svg className="quiz-result-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">{career}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleRestart}
            className="btn-secondary"
          >
            Take Quiz Again
          </button>
          <button 
            onClick={handleUseResults}
            className="btn-primary"
          >
            Use These Results
          </button>
        </div>
      </div>
    )
  }
  
  // Show quiz questions
  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="section-title">Career Interest Quiz</h2>
        <p className="text-gray-600">
          Answer these questions to discover career paths that might be a good fit for your interests and preferences.
          You can select multiple options for each question.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span className="text-sm font-medium text-indigo-600">{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete</span>
        </div>
        <div className="quiz-progress-bar">
          <div 
            className="quiz-progress-indicator" 
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-800 mb-4">
          {quizQuestions[currentQuestion].question}
        </h3>
        
        <div className="space-y-3">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`quiz-option ${
                answers[currentQuestion] && answers[currentQuestion].includes(index) 
                  ? 'quiz-option-selected' 
                  : 'bg-white'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 flex-shrink-0 mr-2 rounded border ${
                  answers[currentQuestion] && answers[currentQuestion].includes(index) 
                    ? 'bg-indigo-600 border-indigo-600'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion] && answers[currentQuestion].includes(index) && (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span>{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`px-4 py-2 rounded text-sm font-medium ${
            currentQuestion === 0 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-indigo-600 hover:text-indigo-800'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!hasSelections()}
          className={`px-4 py-2 rounded text-sm font-medium ${
            hasSelections()
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentQuestion < quizQuestions.length - 1 ? 'Next' : 'See Results'}
        </button>
      </div>
    </div>
  )
} 