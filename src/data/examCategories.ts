import { ExamCategory } from '../types/course'

export const examCategories: ExamCategory[] = [
  // Engineering Entrance Exams
  {
    id: 'jee',
    name: 'JEE',
    fullName: 'Joint Entrance Examination',
    description: 'Engineering entrance exam for IITs, NITs, and other technical institutes',
    icon: '🔬',
    color: '#2563EB',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    levels: ['JEE Main', 'JEE Advanced'],
    popularCourses: 1250
  },
  {
    id: 'bitsat',
    name: 'BITSAT',
    fullName: 'Birla Institute of Technology and Science Admission Test',
    description: 'Entrance exam for admission to BITS Pilani campuses',
    icon: '⚙️',
    color: '#1E40AF',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Logical Reasoning'],
    levels: ['Undergraduate'],
    popularCourses: 320
  },
  {
    id: 'viteee',
    name: 'VITEEE',
    fullName: 'VIT Engineering Entrance Examination',
    description: 'Entrance exam for VIT University engineering programs',
    icon: '🔧',
    color: '#3730A3',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English'],
    levels: ['B.Tech'],
    popularCourses: 280
  },
  {
    id: 'comedk',
    name: 'COMEDK',
    fullName: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka',
    description: 'State-level engineering entrance exam for Karnataka',
    icon: '🏗️',
    color: '#1E3A8A',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    levels: ['UGET'],
    popularCourses: 190
  },

  // Medical Entrance Exams
  {
    id: 'neet-ug',
    name: 'NEET UG',
    fullName: 'National Eligibility Entrance Test - Undergraduate',
    description: 'Medical entrance exam for MBBS, BDS, and other undergraduate medical courses',
    icon: '🩺',
    color: '#059669',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    levels: ['MBBS', 'BDS', 'BAMS', 'BHMS'],
    popularCourses: 980
  },
  {
    id: 'neet-pg',
    name: 'NEET PG',
    fullName: 'National Eligibility Entrance Test - Postgraduate',
    description: 'Medical entrance exam for postgraduate medical courses',
    icon: '🏥',
    color: '#047857',
    subjects: ['Pre-clinical', 'Para-clinical', 'Clinical'],
    levels: ['MD', 'MS', 'Diploma'],
    popularCourses: 650
  },
  {
    id: 'aiims',
    name: 'AIIMS',
    fullName: 'All Institute of Medical Sciences',
    description: 'Entrance exam for AIIMS medical colleges',
    icon: '⚕️',
    color: '#065F46',
    subjects: ['Physics', 'Chemistry', 'Biology', 'General Knowledge'],
    levels: ['MBBS', 'BSc Nursing'],
    popularCourses: 420
  },
  {
    id: 'jipmer',
    name: 'JIPMER',
    fullName: 'Jawaharlal Institute of Postgraduate Medical Education and Research',
    description: 'Medical entrance exam for JIPMER colleges',
    icon: '🔬',
    color: '#064E3B',
    subjects: ['Physics', 'Chemistry', 'Biology', 'English'],
    levels: ['MBBS'],
    popularCourses: 180
  },

  // Civil Services & Government Jobs
  {
    id: 'upsc',
    name: 'UPSC',
    fullName: 'Union Public Service Commission',
    description: 'Civil services examination for IAS, IPS, and other government positions',
    icon: '🏛️',
    color: '#DC2626',
    subjects: ['General Studies', 'Current Affairs', 'Optional Subjects', 'Essay'],
    levels: ['Prelims', 'Mains', 'Interview'],
    popularCourses: 890
  },
  {
    id: 'ssc',
    name: 'SSC',
    fullName: 'Staff Selection Commission',
    description: 'Recruitment exam for various government departments',
    icon: '📋',
    color: '#7C3AED',
    subjects: ['General Intelligence', 'General Awareness', 'Quantitative Aptitude', 'English'],
    levels: ['CGL', 'CHSL', 'MTS', 'JE'],
    popularCourses: 780
  },
  {
    id: 'ibps',
    name: 'IBPS',
    fullName: 'Institute of Banking Personnel Selection',
    description: 'Banking sector recruitment examinations',
    icon: '🏦',
    color: '#9333EA',
    subjects: ['Reasoning', 'Quantitative Aptitude', 'English', 'General Awareness', 'Computer Knowledge'],
    levels: ['PO', 'Clerk', 'SO', 'RRB'],
    popularCourses: 560
  },
  {
    id: 'sbi',
    name: 'SBI',
    fullName: 'State Bank of India',
    description: 'SBI recruitment examinations for various positions',
    icon: '🏧',
    color: '#7E22CE',
    subjects: ['Reasoning', 'Quantitative Aptitude', 'English', 'General Awareness'],
    levels: ['PO', 'Clerk', 'SO'],
    popularCourses: 340
  },
  {
    id: 'rbi',
    name: 'RBI',
    fullName: 'Reserve Bank of India',
    description: 'RBI recruitment examinations',
    icon: '💰',
    color: '#A21CAF',
    subjects: ['Reasoning', 'Quantitative Aptitude', 'English', 'General Awareness', 'Computer Knowledge'],
    levels: ['Grade B', 'Assistant', 'Security Guard'],
    popularCourses: 220
  },

  // State PSC Exams
  {
    id: 'state-psc',
    name: 'State PSC',
    fullName: 'State Public Service Commission',
    description: 'State-level civil services examinations',
    icon: '🗳️',
    color: '#BE185D',
    subjects: ['General Studies', 'State Affairs', 'Current Affairs', 'Optional Subjects'],
    levels: ['Prelims', 'Mains', 'Interview'],
    popularCourses: 450
  },

  // Defense Exams
  {
    id: 'nda',
    name: 'NDA',
    fullName: 'National Defence Academy',
    description: 'Entrance exam for Indian Army, Navy, and Air Force',
    icon: '🛡️',
    color: '#B91C1C',
    subjects: ['Mathematics', 'General Ability Test'],
    levels: ['Written', 'SSB Interview'],
    popularCourses: 380
  },
  {
    id: 'cds',
    name: 'CDS',
    fullName: 'Combined Defence Services',
    description: 'Entrance exam for Indian Military Academy, Naval Academy, and Air Force Academy',
    icon: '⚔️',
    color: '#991B1B',
    subjects: ['English', 'General Knowledge', 'Elementary Mathematics'],
    levels: ['IMA', 'INA', 'AFA', 'OTA'],
    popularCourses: 290
  },
  {
    id: 'afcat',
    name: 'AFCAT',
    fullName: 'Air Force Common Admission Test',
    description: 'Entrance exam for Indian Air Force officer positions',
    icon: '✈️',
    color: '#7F1D1D',
    subjects: ['General Awareness', 'Verbal Ability', 'Numerical Ability', 'Reasoning'],
    levels: ['Flying Branch', 'Technical Branch', 'Ground Duty'],
    popularCourses: 180
  },

  // MBA & Management Exams
  {
    id: 'cat',
    name: 'CAT',
    fullName: 'Common Admission Test',
    description: 'MBA entrance exam for IIMs and other top business schools',
    icon: '📊',
    color: '#EA580C',
    subjects: ['Verbal Ability', 'Data Interpretation', 'Quantitative Ability'],
    levels: ['MBA', 'PGDM'],
    popularCourses: 720
  },
  {
    id: 'gmat',
    name: 'GMAT',
    fullName: 'Graduate Management Admission Test',
    description: 'Standardized test for MBA and business school admissions',
    icon: '💼',
    color: '#DC2626',
    subjects: ['Quantitative Reasoning', 'Verbal Reasoning', 'Data Insights'],
    levels: ['Focus Edition', 'Full Test'],
    popularCourses: 420
  },
  {
    id: 'xat',
    name: 'XAT',
    fullName: 'Xavier Aptitude Test',
    description: 'MBA entrance exam for XLRI and other Xavier institutes',
    icon: '📈',
    color: '#C2410C',
    subjects: ['Verbal Ability', 'Decision Making', 'Quantitative Ability', 'General Knowledge'],
    levels: ['MBA', 'PGDM'],
    popularCourses: 280
  },
  {
    id: 'snap',
    name: 'SNAP',
    fullName: 'Symbiosis National Aptitude Test',
    description: 'MBA entrance exam for Symbiosis institutes',
    icon: '📋',
    color: '#B45309',
    subjects: ['General English', 'Quantitative Ability', 'General Awareness', 'Analytical Reasoning'],
    levels: ['MBA', 'PGDM'],
    popularCourses: 190
  },
  {
    id: 'mat',
    name: 'MAT',
    fullName: 'Management Aptitude Test',
    description: 'MBA entrance exam accepted by many business schools',
    icon: '💡',
    color: '#A16207',
    subjects: ['Language Comprehension', 'Mathematical Skills', 'Data Analysis', 'Intelligence & Critical Reasoning'],
    levels: ['MBA', 'PGDM'],
    popularCourses: 350
  },

  // Law Entrance Exams
  {
    id: 'clat',
    name: 'CLAT',
    fullName: 'Common Law Admission Test',
    description: 'Entrance exam for National Law Universities',
    icon: '⚖️',
    color: '#7C2D12',
    subjects: ['English', 'Current Affairs', 'Legal Reasoning', 'Logical Reasoning', 'Quantitative Techniques'],
    levels: ['UG', 'PG'],
    popularCourses: 320
  },
  {
    id: 'ailet',
    name: 'AILET',
    fullName: 'All India Law Entrance Test',
    description: 'Entrance exam for National Law University Delhi',
    icon: '📚',
    color: '#78350F',
    subjects: ['English', 'General Knowledge', 'Legal Aptitude', 'Reasoning', 'Mathematics'],
    levels: ['BA LLB', 'LLM'],
    popularCourses: 150
  },

  // International Exams
  {
    id: 'sat',
    name: 'SAT',
    fullName: 'Scholastic Assessment Test',
    description: 'Standardized test for US college admissions',
    icon: '🌍',
    color: '#0369A1',
    subjects: ['Reading', 'Writing', 'Mathematics'],
    levels: ['SAT', 'SAT Subject Tests'],
    popularCourses: 280
  },
  {
    id: 'gre',
    name: 'GRE',
    fullName: 'Graduate Record Examination',
    description: 'Standardized test for graduate school admissions',
    icon: '🎓',
    color: '#0284C7',
    subjects: ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing'],
    levels: ['General Test', 'Subject Tests'],
    popularCourses: 390
  },
  {
    id: 'toefl',
    name: 'TOEFL',
    fullName: 'Test of English as a Foreign Language',
    description: 'English proficiency test for non-native speakers',
    icon: '🗣️',
    color: '#0891B2',
    subjects: ['Reading', 'Listening', 'Speaking', 'Writing'],
    levels: ['iBT', 'PBT'],
    popularCourses: 250
  },
  {
    id: 'ielts',
    name: 'IELTS',
    fullName: 'International English Language Testing System',
    description: 'English proficiency test for international education and migration',
    icon: '🌐',
    color: '#0E7490',
    subjects: ['Listening', 'Reading', 'Writing', 'Speaking'],
    levels: ['Academic', 'General Training'],
    popularCourses: 320
  },

  // Teaching Exams
  {
    id: 'ctet',
    name: 'CTET',
    fullName: 'Central Teacher Eligibility Test',
    description: 'Teaching eligibility test for central government schools',
    icon: '👩‍🏫',
    color: '#059669',
    subjects: ['Child Development', 'Language I', 'Language II', 'Mathematics', 'Environmental Studies'],
    levels: ['Paper I', 'Paper II'],
    popularCourses: 420
  },
  {
    id: 'tet',
    name: 'State TET',
    fullName: 'State Teacher Eligibility Test',
    description: 'State-level teaching eligibility tests',
    icon: '📝',
    color: '#047857',
    subjects: ['Child Development', 'Language', 'Mathematics', 'Environmental Studies', 'Social Studies'],
    levels: ['Primary', 'Upper Primary'],
    popularCourses: 380
  },
  {
    id: 'ugc-net',
    name: 'UGC NET',
    fullName: 'University Grants Commission National Eligibility Test',
    description: 'Eligibility test for Assistant Professor and JRF',
    icon: '🎯',
    color: '#065F46',
    subjects: ['Teaching Aptitude', 'Research Aptitude', 'Subject Specific'],
    levels: ['Paper I', 'Paper II'],
    popularCourses: 290
  },

  // Computer Science & IT Exams
  {
    id: 'gate-cs',
    name: 'GATE CS',
    fullName: 'Graduate Aptitude Test in Engineering - Computer Science',
    description: 'Engineering entrance exam for postgraduate programs and PSU jobs',
    icon: '💻',
    color: '#7C3AED',
    subjects: ['Programming', 'Data Structures', 'Algorithms', 'Computer Networks', 'Database Systems'],
    levels: ['M.Tech', 'PSU Jobs'],
    popularCourses: 450
  },
  {
    id: 'gate-other',
    name: 'GATE Other',
    fullName: 'Graduate Aptitude Test in Engineering - Other Branches',
    description: 'GATE exam for various engineering branches',
    icon: '⚙️',
    color: '#6D28D9',
    subjects: ['Core Engineering', 'Mathematics', 'General Aptitude'],
    levels: ['M.Tech', 'PSU Jobs'],
    popularCourses: 380
  },

  // Commerce & Economics
  {
    id: 'ca',
    name: 'CA',
    fullName: 'Chartered Accountancy',
    description: 'Professional course in accounting and finance',
    icon: '📊',
    color: '#B91C1C',
    subjects: ['Accounting', 'Law', 'Taxation', 'Audit', 'Financial Management'],
    levels: ['Foundation', 'Intermediate', 'Final'],
    popularCourses: 520
  },
  {
    id: 'cs',
    name: 'CS',
    fullName: 'Company Secretary',
    description: 'Professional course in corporate law and governance',
    icon: '📋',
    color: '#991B1B',
    subjects: ['Company Law', 'Securities Law', 'Economic Law', 'Tax Law'],
    levels: ['Foundation', 'Executive', 'Professional'],
    popularCourses: 280
  },
  {
    id: 'cma',
    name: 'CMA',
    fullName: 'Cost and Management Accountant',
    description: 'Professional course in cost and management accounting',
    icon: '💰',
    color: '#7F1D1D',
    subjects: ['Cost Accounting', 'Financial Accounting', 'Management', 'Taxation'],
    levels: ['Foundation', 'Intermediate', 'Final'],
    popularCourses: 190
  },

  // K-12 Education
  {
    id: 'k12',
    name: 'K12',
    fullName: 'K-12 Education',
    description: 'School curriculum support for classes 1-12',
    icon: '🎓',
    color: '#0891B2',
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Languages'],
    levels: ['Primary (1-5)', 'Middle (6-8)', 'Secondary (9-10)', 'Senior Secondary (11-12)'],
    popularCourses: 2100
  },
  {
    id: 'cbse',
    name: 'CBSE',
    fullName: 'Central Board of Secondary Education',
    description: 'CBSE curriculum support and exam preparation',
    icon: '📚',
    color: '#0E7490',
    subjects: ['All CBSE Subjects'],
    levels: ['Class 10', 'Class 12'],
    popularCourses: 890
  },
  {
    id: 'icse',
    name: 'ICSE',
    fullName: 'Indian Certificate of Secondary Education',
    description: 'ICSE curriculum support and exam preparation',
    icon: '📖',
    color: '#0F766E',
    subjects: ['All ICSE Subjects'],
    levels: ['Class 10', 'Class 12 (ISC)'],
    popularCourses: 420
  },
  {
    id: 'state-boards',
    name: 'State Boards',
    fullName: 'State Board Examinations',
    description: 'State board curriculum support and exam preparation',
    icon: '🏫',
    color: '#059669',
    subjects: ['State Curriculum Subjects'],
    levels: ['Class 10', 'Class 12'],
    popularCourses: 650
  },

  // Skill Development & Certification
  {
    id: 'programming',
    name: 'Programming',
    fullName: 'Programming & Software Development',
    description: 'Programming languages and software development courses',
    icon: '👨‍💻',
    color: '#7C3AED',
    subjects: ['Python', 'Java', 'JavaScript', 'C++', 'Web Development', 'Mobile Development'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    popularCourses: 1200
  },
  {
    id: 'data-science',
    name: 'Data Science',
    fullName: 'Data Science & Analytics',
    description: 'Data science, machine learning, and analytics courses',
    icon: '📊',
    color: '#6D28D9',
    subjects: ['Statistics', 'Machine Learning', 'Python', 'R', 'SQL', 'Visualization'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    popularCourses: 680
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    fullName: 'Digital Marketing & SEO',
    description: 'Digital marketing, SEO, and social media marketing courses',
    icon: '📱',
    color: '#DB2777',
    subjects: ['SEO', 'SEM', 'Social Media', 'Content Marketing', 'Analytics'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    popularCourses: 450
  },

  // Language Learning
  {
    id: 'languages',
    name: 'Languages',
    fullName: 'Language Learning',
    description: 'Foreign and regional language learning courses',
    icon: '🗣️',
    color: '#059669',
    subjects: ['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese', 'Mandarin'],
    levels: ['Beginner', 'Intermediate', 'Advanced', 'Professional'],
    popularCourses: 780
  }
]

// Helper functions to organize categories
export const getCategoriesByType = () => {
  return {
    engineering: examCategories.filter(cat => 
      ['jee', 'bitsat', 'viteee', 'comedk', 'gate-cs', 'gate-other'].includes(cat.id)
    ),
    medical: examCategories.filter(cat => 
      ['neet-ug', 'neet-pg', 'aiims', 'jipmer'].includes(cat.id)
    ),
    government: examCategories.filter(cat => 
      ['upsc', 'ssc', 'ibps', 'sbi', 'rbi', 'state-psc'].includes(cat.id)
    ),
    defense: examCategories.filter(cat => 
      ['nda', 'cds', 'afcat'].includes(cat.id)
    ),
    management: examCategories.filter(cat => 
      ['cat', 'gmat', 'xat', 'snap', 'mat'].includes(cat.id)
    ),
    law: examCategories.filter(cat => 
      ['clat', 'ailet'].includes(cat.id)
    ),
    international: examCategories.filter(cat => 
      ['sat', 'gre', 'toefl', 'ielts'].includes(cat.id)
    ),
    teaching: examCategories.filter(cat => 
      ['ctet', 'tet', 'ugc-net'].includes(cat.id)
    ),
    commerce: examCategories.filter(cat => 
      ['ca', 'cs', 'cma'].includes(cat.id)
    ),
    k12: examCategories.filter(cat => 
      ['k12', 'cbse', 'icse', 'state-boards'].includes(cat.id)
    ),
    skills: examCategories.filter(cat => 
      ['programming', 'data-science', 'digital-marketing', 'languages'].includes(cat.id)
    )
  }
}

export const getPopularCategories = () => {
  return examCategories
    .sort((a, b) => b.popularCourses - a.popularCourses)
    .slice(0, 8)
}

export const searchCategories = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return examCategories.filter(cat => 
    cat.name.toLowerCase().includes(lowercaseQuery) ||
    cat.fullName.toLowerCase().includes(lowercaseQuery) ||
    cat.description.toLowerCase().includes(lowercaseQuery) ||
    cat.subjects.some(subject => subject.toLowerCase().includes(lowercaseQuery))
  )
}