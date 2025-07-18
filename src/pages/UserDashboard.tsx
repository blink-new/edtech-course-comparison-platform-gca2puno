import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Award, 
  Calendar,
  Play,
  CheckCircle,
  Flame,
  BarChart3,
  Settings,
  Plus
} from 'lucide-react'
import { blink } from '../blink/client'
import { 
  mockEnrolledCourses, 
  mockStudySessions, 
  mockAchievements, 
  mockStudyGoals,
  mockWeeklyStats 
} from '../data/mockUserData'
import { EnrolledCourse, Achievement, StudyGoal, WeeklyStats } from '../types/user'

export function UserDashboard() {
  const [user, setUser] = useState(null)
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [studyGoals, setStudyGoals] = useState<StudyGoal[]>([])
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const userData = await blink.auth.me()
        setUser(userData)
        
        // Load mock data (in real app, this would come from API)
        setEnrolledCourses(mockEnrolledCourses)
        setAchievements(mockAchievements)
        setStudyGoals(mockStudyGoals)
        setWeeklyStats(mockWeeklyStats)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const activeCourses = enrolledCourses.filter(course => course.status === 'active')
  const completedCourses = enrolledCourses.filter(course => course.status === 'completed')
  const totalHoursStudied = enrolledCourses.reduce((total, course) => total + course.progress.timeSpent, 0) / 60
  const averageProgress = enrolledCourses.reduce((total, course) => total + course.progress.completionPercentage, 0) / enrolledCourses.length
  const currentStreak = Math.max(...enrolledCourses.map(course => course.progress.streak))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user?.displayName || 'Student'}!
                </h1>
                <p className="text-gray-600">Continue your learning journey</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Courses</p>
                  <p className="text-3xl font-bold text-gray-900">{activeCourses.length}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hours Studied</p>
                  <p className="text-3xl font-bold text-gray-900">{Math.round(totalHoursStudied)}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Streak</p>
                  <p className="text-3xl font-bold text-gray-900">{currentStreak}</p>
                  <p className="text-xs text-gray-500">days</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Flame className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                  <p className="text-3xl font-bold text-gray-900">{Math.round(averageProgress)}%</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* My Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Browse Courses
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {enrolledCourses.map((enrollment) => (
                <Card key={enrollment.courseId} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={enrollment.course.thumbnail} 
                        alt={enrollment.course.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {enrollment.course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{enrollment.course.provider}</p>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          {enrollment.course.examType.map((exam) => (
                            <Badge key={exam} variant="secondary" className="text-xs">
                              {exam}
                            </Badge>
                          ))}
                          <Badge 
                            variant={enrollment.status === 'completed' ? 'default' : 'outline'}
                            className="text-xs"
                          >
                            {enrollment.status}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">
                              {enrollment.progress.completedModules}/{enrollment.progress.totalModules} modules
                            </span>
                          </div>
                          <Progress value={enrollment.progress.completionPercentage} className="h-2" />
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{Math.round(enrollment.progress.timeSpent / 60)}h studied</span>
                            <span>Avg: {enrollment.progress.averageScore}%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <Button size="sm" className="flex-1 mr-2">
                            <Play className="h-4 w-4 mr-2" />
                            Continue
                          </Button>
                          {enrollment.progress.nextModule && (
                            <div className="text-xs text-gray-500 flex-1 ml-2">
                              Next: {enrollment.progress.nextModule}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Learning Progress</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Weekly Study Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyStats.map((week) => (
                      <div key={week.week} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-sm font-medium text-gray-900">
                            Week {week.week.split('-W')[1]}
                          </div>
                          <div className="text-xs text-gray-500">
                            {week.daysActive} days active
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm font-medium">{week.hoursStudied}h</div>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${Math.min(100, (week.hoursStudied / 20) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-green-900">Average Score</p>
                        <p className="text-xs text-green-700">Across all courses</p>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress.averageScore, 0) / enrolledCourses.length)}%
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-blue-900">Modules Completed</p>
                        <p className="text-xs text-blue-700">This month</p>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {enrolledCourses.reduce((sum, course) => sum + course.progress.completedModules, 0)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-purple-900">Study Streak</p>
                        <p className="text-xs text-purple-700">Current best</p>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">
                        {currentStreak} days
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Study Goals</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {studyGoals.map((goal) => (
                <Card key={goal.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                        <p className="text-sm text-gray-600">{goal.description}</p>
                      </div>
                      <Badge 
                        variant={goal.status === 'completed' ? 'default' : goal.status === 'overdue' ? 'destructive' : 'secondary'}
                      >
                        {goal.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">
                          {goal.currentValue}/{goal.targetValue} {goal.unit}
                        </span>
                      </div>
                      <Progress value={(goal.currentValue / goal.targetValue) * 100} className="h-2" />
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                        <span>{Math.round((goal.currentValue / goal.targetValue) * 100)}% complete</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Learning Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Study Pattern</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {Math.round(totalHoursStudied / enrolledCourses.length * 10) / 10}h
                      </div>
                      <p className="text-sm text-gray-600">Average per course</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">
                          {completedCourses.length}
                        </div>
                        <p className="text-xs text-green-700">Completed</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">
                          {activeCourses.length}
                        </div>
                        <p className="text-xs text-blue-700">In Progress</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockStudySessions.slice(0, 5).map((session) => {
                      const course = enrolledCourses.find(c => c.courseId === session.courseId)
                      return (
                        <div key={session.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {course?.course.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {session.duration} min • Score: {session.score}%
                            </p>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(session.date).toLocaleDateString()}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}