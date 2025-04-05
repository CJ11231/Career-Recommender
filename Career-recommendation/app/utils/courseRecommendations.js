// This file contains course recommendations for different careers

const courseData = {
  // Software Engineering courses
  "Programming": [
    {
      title: "Python for Everybody",
      platform: "Coursera",
      provider: "University of Michigan",
      url: "https://www.coursera.org/specializations/python",
      description: "Learn to Program and Analyze Data with Python. Develop programs to gather, clean, analyze, and visualize data."
    },
    {
      title: "The Complete Web Developer in 2023: Zero to Mastery",
      platform: "Udemy",
      provider: "Zero To Mastery Academy",
      url: "https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery/",
      description: "Learn to code and become a Web Developer in 2023 with HTML, CSS, JavaScript, React, Node.js, and more."
    }
  ],
  "Problem Solving": [
    {
      title: "Algorithmic Toolbox",
      platform: "Coursera",
      provider: "University of California San Diego",
      url: "https://www.coursera.org/learn/algorithmic-toolbox",
      description: "Master algorithmic programming techniques to solve computational problems and implement efficient solutions."
    }
  ],
  "Data Structures": [
    {
      title: "Data Structures and Algorithms Specialization",
      platform: "Coursera",
      provider: "University of California San Diego",
      url: "https://www.coursera.org/specializations/data-structures-algorithms",
      description: "Master Algorithmic Programming Techniques. Learn algorithms through programming and advance your software engineering or data science career."
    }
  ],
  
  // Data Science courses
  "Machine Learning": [
    {
      title: "Machine Learning",
      platform: "Coursera",
      provider: "Stanford University",
      url: "https://www.coursera.org/learn/machine-learning",
      description: "Learn about the most effective machine learning techniques, and gain practice implementing them and getting them to work for yourself."
    },
    {
      title: "Machine Learning A-Z™: AI, Python & R + ChatGPT Bonus",
      platform: "Udemy",
      provider: "Kirill Eremenko, Hadelin de Ponteves",
      url: "https://www.udemy.com/course/machinelearning/",
      description: "Learn to create Machine Learning Algorithms in Python and R, covering topics like Data Preprocessing, Regression, Classification, Clustering, and more."
    }
  ],
  "Data Analysis": [
    {
      title: "Google Data Analytics Professional Certificate",
      platform: "Coursera",
      provider: "Google",
      url: "https://www.coursera.org/professional-certificates/google-data-analytics",
      description: "Prepare for a new career in the high-growth field of data analytics, no experience or degree required."
    }
  ],
  
  // Design courses
  "User Research": [
    {
      title: "User Experience (UX) Research and Design",
      platform: "Coursera",
      provider: "University of Michigan",
      url: "https://www.coursera.org/specializations/michiganux",
      description: "Learn to design digital experiences that are useful, usable, and that people value."
    }
  ],
  "Visual Design": [
    {
      title: "Graphic Design Specialization",
      platform: "Coursera",
      provider: "California Institute of the Arts",
      url: "https://www.coursera.org/specializations/graphic-design",
      description: "Graphic Design covers the concepts and software that every designer needs to know and explains how they fit into a typical graphic design workflow."
    }
  ],
  
  // Healthcare courses
  "Medical Knowledge": [
    {
      title: "Anatomy Specialization",
      platform: "Coursera",
      provider: "University of Michigan",
      url: "https://www.coursera.org/specializations/anatomy",
      description: "Comprehensive introduction to human anatomy covering all systems of the body."
    }
  ],
  
  // Business and finance courses
  "Financial Modeling": [
    {
      title: "Financial Modeling and Valuation",
      platform: "Udemy",
      provider: "365 Careers",
      url: "https://www.udemy.com/course/the-complete-financial-analyst-course/",
      description: "Excel, Accounting, Financial Statement Analysis, Business Valuation, Financial Modeling, and PowerPoint."
    }
  ],
  
  // Marketing courses
  "Digital Marketing": [
    {
      title: "Digital Marketing Specialization",
      platform: "Coursera",
      provider: "University of Illinois",
      url: "https://www.coursera.org/specializations/digital-marketing",
      description: "Master Digital Marketing Strategy, Social Media Marketing, SEO, and more."
    }
  ],
  "Social Media": [
    {
      title: "Social Media Marketing Specialization",
      platform: "Coursera",
      provider: "Northwestern University",
      url: "https://www.coursera.org/specializations/social-media-marketing",
      description: "Develop skills to increase your business's social presence through engaging, shareable content."
    }
  ],
  
  // Common skills
  "Communication": [
    {
      title: "Effective Communication: Writing, Design, and Presentation",
      platform: "Coursera",
      provider: "University of Colorado Boulder",
      url: "https://www.coursera.org/specializations/effective-business-communication",
      description: "Build professional communication skills needed to succeed in the modern workplace."
    }
  ],
  "Leadership": [
    {
      title: "Leadership Development for Engineers",
      platform: "Coursera",
      provider: "Rice University",
      url: "https://www.coursera.org/specializations/leadership-development-for-engineers",
      description: "Strengthen your leadership style and gain essential skills for engineering management positions."
    }
  ]
};

/**
 * Get course recommendations based on the required skills for a career
 * @param {Array} skills - Array of skills from the career recommendation
 * @param {Number} limit - Maximum number of courses to return
 * @returns {Array} - Array of recommended courses
 */
export function getRecommendedCourses(skills, limit = 3) {
  const recommendedCourses = [];
  const addedCourses = new Set(); // To avoid duplicate courses
  
  // Try to find courses for each skill
  for (const skill of skills) {
    const coursesForSkill = courseData[skill] || [];
    
    for (const course of coursesForSkill) {
      // Check if we already added this course
      const courseKey = `${course.platform}-${course.title}`;
      if (!addedCourses.has(courseKey) && recommendedCourses.length < limit) {
        recommendedCourses.push(course);
        addedCourses.add(courseKey);
      }
      
      // Break if we have enough courses
      if (recommendedCourses.length >= limit) {
        break;
      }
    }
    
    // Break if we have enough courses
    if (recommendedCourses.length >= limit) {
      break;
    }
  }
  
  // If we don't have enough courses, add some general ones
  if (recommendedCourses.length < limit) {
    const generalCourses = [
      {
        title: "Learning How to Learn",
        platform: "Coursera",
        provider: "Deep Teaching Solutions",
        url: "https://www.coursera.org/learn/learning-how-to-learn",
        description: "Powerful mental tools to help you master tough subjects."
      },
      {
        title: "The Science of Well-Being",
        platform: "Coursera",
        provider: "Yale University",
        url: "https://www.coursera.org/learn/the-science-of-well-being",
        description: "Psychology-based course to increase your happiness and build more productive habits."
      },
      {
        title: "Excel Skills for Business",
        platform: "Coursera",
        provider: "Macquarie University",
        url: "https://www.coursera.org/specializations/excel",
        description: "Master Excel tools that are essential for professionalism in the modern workplace."
      }
    ];
    
    for (const course of generalCourses) {
      if (recommendedCourses.length < limit) {
        const courseKey = `${course.platform}-${course.title}`;
        if (!addedCourses.has(courseKey)) {
          recommendedCourses.push(course);
          addedCourses.add(courseKey);
        }
      } else {
        break;
      }
    }
  }
  
  return recommendedCourses;
}

export default getRecommendedCourses; 