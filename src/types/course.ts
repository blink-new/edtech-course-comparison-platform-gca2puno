export interface Course {
  id: string
  title: string
  provider: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  format: 'Online' | 'Offline' | 'Hybrid'
  examType: string[]
  subjects: string[]
  language: string
  instructor: string
  thumbnail: string
  features: string[]
  syllabus: string[]
  successRate?: number
  studentsEnrolled: number
  isVerified: boolean
  location?: string
  batchTimings?: string[]
}

export interface ExamCategory {
  id: string
  name: string
  fullName: string
  description: string
  icon: string
  color: string
  subjects: string[]
  levels: string[]
  popularCourses: number
}

export interface Filter {
  examTypes: string[]
  subjects: string[]
  priceRange: [number, number]
  rating: number
  format: string[]
  level: string[]
  language: string[]
  duration: string[]
}

export interface SearchResult {
  courses: Course[]
  totalCount: number
  filters: {
    examTypes: string[]
    subjects: string[]
    providers: string[]
    languages: string[]
  }
}