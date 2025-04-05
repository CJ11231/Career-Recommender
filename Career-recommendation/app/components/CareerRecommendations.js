export default function CareerRecommendations({ recommendations, showCourses = false }) {
  return (
    <div className="space-y-8">      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((career, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-4 px-5 text-white">
              <div className="flex items-center">
                <div className="bg-white text-indigo-700 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3 shadow-md">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold">{career.title}</h3>
              </div>
            </div>
            
            <div className="p-5 space-y-5">
              <div>
                <p className="text-gray-700">{career.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Required Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {career.requiredSkills.map((skill, i) => (
                    <span key={i} className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Education Requirements
                </h4>
                <p className="text-gray-700">{career.education}</p>
              </div>
              
              {/* Match Score */}
              {career.matchPercentage && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Match Score
                  </h4>
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full" 
                          style={{ width: `${career.matchPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="ml-3 text-lg font-semibold text-indigo-700">{career.matchPercentage}%</span>
                  </div>
                </div>
              )}
              
              {/* Course Recommendations Section */}
              {showCourses && career.courseRecommendations && career.courseRecommendations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Recommended Courses
                  </h4>
                  <div className="space-y-3">
                    {career.courseRecommendations.map((course, i) => (
                      <div key={i} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-md border border-indigo-100 hover:shadow-md transition-all duration-200">
                        <div className="flex flex-wrap items-center justify-between mb-2">
                          <h5 className="text-indigo-800 font-medium text-base">{course.title}</h5>
                          <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                            {course.platform}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 font-medium mb-1">Provider: {course.provider}</p>
                        <p className="text-sm text-gray-700 mb-3">{course.description}</p>
                        <a 
                          href={course.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm bg-white text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 px-3 py-1.5 rounded-md font-medium inline-flex items-center border border-indigo-200 transition-colors duration-200"
                        >
                          View Course
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {recommendations.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations found</h3>
          <p className="text-gray-600">Try updating your profile with more specific skills and interests to receive personalized career recommendations.</p>
        </div>
      )}
    </div>
  )
} 