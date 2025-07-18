import { EnrolledCourse, StudySession, Achievement, StudyGoal, WeeklyStats } from '../types/user'

export const mockEnrolledCourses: EnrolledCourse[] = [
  {
    courseId: 'course_jee_math_1',
    course: {
      id: 'course_jee_math_1',
      title: 'Complete JEE Mathematics Mastery',
      provider: 'Vedantu',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
      examType: ['JEE', 'JEE Main'],
      duration: '8 months',
      totalModules: 24
    },
    enrolledAt: '2024-01-15T10:00:00Z',
    progress: {
      completedModules: 18,
      totalModules: 24,
      completionPercentage: 75,
      timeSpent: 2340, // 39 hours
      averageScore: 87,
      lastModuleCompleted: 'Coordinate Geometry - Advanced',
      nextModule: 'Vectors and 3D Geometry',
      streak: 12
    },
    lastAccessedAt: '2024-01-18T14:30:00Z',
    status: 'active'
  },
  {
    courseId: 'course_jee_physics_1',
    course: {
      id: 'course_jee_physics_1',
      title: 'JEE Physics Masterclass',
      provider: 'Physics Wallah',
      thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=250&fit=crop',
      examType: ['JEE', 'JEE Main'],
      duration: '8 months',
      totalModules: 20
    },
    enrolledAt: '2024-01-10T09:00:00Z',
    progress: {
      completedModules: 12,
      totalModules: 20,
      completionPercentage: 60,
      timeSpent: 1800, // 30 hours
      averageScore: 82,
      lastModuleCompleted: 'Thermodynamics - Heat Engines',
      nextModule: 'Waves and Oscillations',
      streak: 8
    },
    lastAccessedAt: '2024-01-17T16:45:00Z',
    status: 'active'
  },
  {
    courseId: 'course_k12_math_1',
    course: {
      id: 'course_k12_math_1',
      title: 'Class 10 Mathematics Complete',
      provider: 'BYJU\'S',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=250&fit=crop',
      examType: ['K12', 'CBSE'],
      duration: '10 months',
      totalModules: 15
    },
    enrolledAt: '2023-12-01T08:00:00Z',
    progress: {
      completedModules: 15,
      totalModules: 15,
      completionPercentage: 100,
      timeSpent: 900, // 15 hours
      averageScore: 94,
      lastModuleCompleted: 'Probability - Advanced Problems',
      streak: 0
    },
    lastAccessedAt: '2024-01-05T12:00:00Z',
    status: 'completed'
  }
]

export const mockStudySessions: StudySession[] = [
  {
    id: 'session_1',
    courseId: 'course_jee_math_1',
    date: '2024-01-18',
    duration: 120,
    modulesCompleted: ['Coordinate Geometry - Advanced'],
    score: 89,
    notes: 'Focused on circle equations and tangent problems'
  },
  {
    id: 'session_2',
    courseId: 'course_jee_physics_1',
    date: '2024-01-17',
    duration: 90,
    modulesCompleted: ['Thermodynamics - Heat Engines'],
    score: 85
  },
  {
    id: 'session_3',
    courseId: 'course_jee_math_1',
    date: '2024-01-16',
    duration: 105,
    modulesCompleted: ['Coordinate Geometry - Basics'],
    score: 92
  }
]

export const mockAchievements: Achievement[] = [
  {
    id: 'achievement_1',
    title: 'First Course Completed',
    description: 'Completed your first course successfully',
    icon: '🎓',
    unlockedAt: '2024-01-05T12:00:00Z',
    category: 'completion'
  },
  {
    id: 'achievement_2',
    title: 'Study Streak Master',
    description: 'Studied for 10 consecutive days',
    icon: '🔥',
    unlockedAt: '2024-01-15T18:00:00Z',
    category: 'streak'
  },
  {
    id: 'achievement_3',
    title: 'High Scorer',
    description: 'Achieved 90+ average score',
    icon: '⭐',
    unlockedAt: '2024-01-12T14:30:00Z',
    category: 'score'
  },
  {
    id: 'achievement_4',
    title: 'Time Master',
    description: 'Studied for 50+ hours total',
    icon: '⏰',
    unlockedAt: '2024-01-16T20:00:00Z',
    category: 'progress'
  }
]

export const mockStudyGoals: StudyGoal[] = [
  {
    id: 'goal_1',
    title: 'Complete JEE Math Course',
    description: 'Finish all modules of JEE Mathematics Mastery',
    targetValue: 24,
    currentValue: 18,
    unit: 'modules',
    deadline: '2024-02-15',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'goal_2',
    title: 'Study 2 Hours Daily',
    description: 'Maintain consistent daily study routine',
    targetValue: 14,
    currentValue: 12,
    unit: 'hours',
    deadline: '2024-01-25',
    status: 'active',
    createdAt: '2024-01-12T09:00:00Z'
  },
  {
    id: 'goal_3',
    title: 'Achieve 85+ Average',
    description: 'Maintain high performance across all courses',
    targetValue: 85,
    currentValue: 87,
    unit: 'modules',
    deadline: '2024-02-01',
    status: 'completed',
    createdAt: '2024-01-10T08:00:00Z'
  }
]

export const mockWeeklyStats: WeeklyStats[] = [
  {
    week: '2024-W03',
    hoursStudied: 14.5,
    modulesCompleted: 6,
    averageScore: 87,
    daysActive: 6
  },
  {
    week: '2024-W02',
    hoursStudied: 12.0,
    modulesCompleted: 5,
    averageScore: 84,
    daysActive: 5
  },
  {
    week: '2024-W01',
    hoursStudied: 16.5,
    modulesCompleted: 7,
    averageScore: 89,
    daysActive: 7
  },
  {
    week: '2023-W52',
    hoursStudied: 10.0,
    modulesCompleted: 4,
    averageScore: 82,
    daysActive: 4
  }
]