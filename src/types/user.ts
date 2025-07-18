export interface User {
  id: string
  email: string
  displayName?: string
  avatar?: string
  createdAt: string
  preferences: UserPreferences
}

export interface UserPreferences {
  examTypes: string[]
  subjects: string[]
  language: string
  studyHoursPerDay: number
  targetExamDate?: string
  notifications: {
    email: boolean
    push: boolean
    studyReminders: boolean
  }
}

export interface EnrolledCourse {
  courseId: string
  course: {
    id: string
    title: string
    provider: string
    thumbnail: string
    examType: string[]
    duration: string
    totalModules: number
  }
  enrolledAt: string
  progress: CourseProgress
  lastAccessedAt: string
  status: 'active' | 'completed' | 'paused'
}

export interface CourseProgress {
  completedModules: number
  totalModules: number
  completionPercentage: number
  timeSpent: number // in minutes
  averageScore: number
  lastModuleCompleted?: string
  nextModule?: string
  streak: number // consecutive days studied
}

export interface StudySession {
  id: string
  courseId: string
  date: string
  duration: number // in minutes
  modulesCompleted: string[]
  score?: number
  notes?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  category: 'progress' | 'streak' | 'score' | 'completion'
}

export interface StudyGoal {
  id: string
  title: string
  description: string
  targetValue: number
  currentValue: number
  unit: 'hours' | 'modules' | 'courses' | 'days'
  deadline: string
  status: 'active' | 'completed' | 'overdue'
  createdAt: string
}

export interface WeeklyStats {
  week: string
  hoursStudied: number
  modulesCompleted: number
  averageScore: number
  daysActive: number
}