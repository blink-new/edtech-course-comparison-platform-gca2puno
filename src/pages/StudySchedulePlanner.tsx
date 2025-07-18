import { useState, useEffect } from 'react'
import { 
  Calendar, Clock, Plus, Target, TrendingUp, 
  BookOpen, CheckCircle, AlertCircle, Edit,
  Trash2, Play, Pause, RotateCcw, Bell
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Progress } from '../components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { Switch } from '../components/ui/switch'
import { blink } from '../blink/client'

interface StudySession {
  id: string
  title: string
  subject: string
  duration: number // in minutes
  scheduledTime: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'missed'
  priority: 'low' | 'medium' | 'high'
  notes?: string
  actualDuration?: number
  completedAt?: string
}

interface StudyGoal {
  id: string
  title: string
  description: string
  targetHours: number
  currentHours: number
  deadline: string
  subjects: string[]
  status: 'active' | 'completed' | 'overdue'
}

interface StudyStreak {
  currentStreak: number
  longestStreak: number
  lastStudyDate: string
}

const mockSessions: StudySession[] = [
  {
    id: 'session_1',
    title: 'JEE Mathematics - Coordinate Geometry',
    subject: 'Mathematics',
    duration: 120,
    scheduledTime: '2024-01-19T09:00:00Z',
    status: 'scheduled',
    priority: 'high',
    notes: 'Focus on circle equations and tangent problems'
  },
  {
    id: 'session_2',
    title: 'Physics - Thermodynamics Review',
    subject: 'Physics',
    duration: 90,
    scheduledTime: '2024-01-19T14:00:00Z',
    status: 'scheduled',
    priority: 'medium'
  },
  {
    id: 'session_3',
    title: 'Chemistry - Organic Reactions',
    subject: 'Chemistry',
    duration: 60,
    scheduledTime: '2024-01-18T16:00:00Z',
    status: 'completed',
    priority: 'medium',
    actualDuration: 65,
    completedAt: '2024-01-18T17:05:00Z'
  },
  {
    id: 'session_4',
    title: 'Mock Test - JEE Main 2023',
    subject: 'All Subjects',
    duration: 180,
    scheduledTime: '2024-01-18T10:00:00Z',
    status: 'completed',
    priority: 'high',
    actualDuration: 175,
    completedAt: '2024-01-18T12:55:00Z'
  }
]

const mockGoals: StudyGoal[] = [
  {
    id: 'goal_1',
    title: 'Complete JEE Mathematics Syllabus',
    description: 'Cover all topics in JEE Mathematics with practice problems',
    targetHours: 200,
    currentHours: 145,
    deadline: '2024-03-15',
    subjects: ['Mathematics'],
    status: 'active'
  },
  {
    id: 'goal_2',
    title: 'Daily Study Routine',
    description: 'Study for at least 6 hours every day',
    targetHours: 180, // 30 days * 6 hours
    currentHours: 156,
    deadline: '2024-02-18',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    status: 'active'
  }
]

export function StudySchedulePlanner() {
  const [user, setUser] = useState(null)
  const [sessions, setSessions] = useState<StudySession[]>(mockSessions)
  const [goals, setGoals] = useState<StudyGoal[]>(mockGoals)
  const [streak, setStreak] = useState<StudyStreak>({
    currentStreak: 12,
    longestStreak: 18,
    lastStudyDate: '2024-01-18'
  })
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [activeSession, setActiveSession] = useState<StudySession | null>(null)
  const [sessionTimer, setSessionTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [showNewSessionForm, setShowNewSessionForm] = useState(false)
  const [showNewGoalForm, setShowNewGoalForm] = useState(false)

  // New session form state
  const [newSession, setNewSession] = useState({
    title: '',
    subject: 'Mathematics',
    duration: 60,
    scheduledTime: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    notes: ''
  })

  // New goal form state
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetHours: 50,
    deadline: '',
    subjects: [] as string[]
  })

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'All Subjects']

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await blink.auth.me()
        setUser(userData)
      } catch (error) {
        console.error('Failed to load user:', error)
      }
    }
    loadUser()
  }, [])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && activeSession) {
      interval = setInterval(() => {
        setSessionTimer(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, activeSession])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const getTodaySessions = () => {
    const today = new Date().toISOString().split('T')[0]
    return sessions.filter(session => 
      session.scheduledTime.split('T')[0] === today
    ).sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime())
  }

  const getSelectedDateSessions = () => {
    return sessions.filter(session => 
      session.scheduledTime.split('T')[0] === selectedDate
    ).sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime())
  }

  const startSession = (session: StudySession) => {
    setActiveSession(session)
    setSessionTimer(0)
    setIsTimerRunning(true)
    
    // Update session status
    setSessions(sessions.map(s => 
      s.id === session.id 
        ? { ...s, status: 'in-progress' as const }
        : s
    ))
  }

  const pauseSession = () => {
    setIsTimerRunning(false)
  }

  const resumeSession = () => {
    setIsTimerRunning(true)
  }

  const completeSession = () => {
    if (!activeSession) return

    const completedSession = {
      ...activeSession,
      status: 'completed' as const,
      actualDuration: Math.floor(sessionTimer / 60),
      completedAt: new Date().toISOString()
    }

    setSessions(sessions.map(s => 
      s.id === activeSession.id ? completedSession : s
    ))

    // Update goals progress
    const hoursStudied = sessionTimer / 3600
    setGoals(goals.map(goal => {
      if (goal.subjects.includes(activeSession.subject) || goal.subjects.includes('All Subjects')) {
        return {
          ...goal,
          currentHours: Math.min(goal.targetHours, goal.currentHours + hoursStudied)
        }
      }
      return goal
    }))

    setActiveSession(null)
    setSessionTimer(0)
    setIsTimerRunning(false)
  }

  const createSession = () => {
    if (!newSession.title.trim() || !newSession.scheduledTime) return

    const session: StudySession = {
      id: `session_${Date.now()}`,
      title: newSession.title,
      subject: newSession.subject,
      duration: newSession.duration,
      scheduledTime: newSession.scheduledTime,
      status: 'scheduled',
      priority: newSession.priority,
      notes: newSession.notes || undefined
    }

    setSessions([...sessions, session])
    setNewSession({
      title: '',
      subject: 'Mathematics',
      duration: 60,
      scheduledTime: '',
      priority: 'medium',
      notes: ''
    })
    setShowNewSessionForm(false)
  }

  const createGoal = () => {
    if (!newGoal.title.trim() || !newGoal.deadline || newGoal.subjects.length === 0) return

    const goal: StudyGoal = {
      id: `goal_${Date.now()}`,
      title: newGoal.title,
      description: newGoal.description,
      targetHours: newGoal.targetHours,
      currentHours: 0,
      deadline: newGoal.deadline,
      subjects: newGoal.subjects,
      status: 'active'
    }

    setGoals([...goals, goal])
    setNewGoal({
      title: '',
      description: '',
      targetHours: 50,
      deadline: '',
      subjects: []
    })
    setShowNewGoalForm(false)
  }

  const deleteSession = (sessionId: string) => {
    setSessions(sessions.filter(s => s.id !== sessionId))
  }

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId))
  }

  const getStatusColor = (status: StudySession['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'missed': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: StudySession['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      default: return 'border-l-green-500'
    }
  }

  const todaySessions = getTodaySessions()
  const selectedDateSessions = getSelectedDateSessions()
  const totalHoursToday = todaySessions.reduce((total, session) => {
    return total + (session.actualDuration || session.duration) / 60
  }, 0)

  const completedSessionsToday = todaySessions.filter(s => s.status === 'completed').length
  const totalSessionsToday = todaySessions.length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Schedule Planner</h1>
              <p className="text-gray-600">
                Plan your study sessions, track progress, and achieve your goals
              </p>
            </div>
            <div className="flex gap-3">
              <Dialog open={showNewGoalForm} onOpenChange={setShowNewGoalForm}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Target className="w-4 h-4 mr-2" />
                    New Goal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Study Goal</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="goal-title">Goal Title</Label>
                      <Input
                        id="goal-title"
                        placeholder="e.g., Complete JEE Physics"
                        value={newGoal.title}
                        onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="goal-description">Description</Label>
                      <Textarea
                        id="goal-description"
                        placeholder="Describe your goal..."
                        value={newGoal.description}
                        onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="target-hours">Target Hours</Label>
                        <Input
                          id="target-hours"
                          type="number"
                          value={newGoal.targetHours}
                          onChange={(e) => setNewGoal({...newGoal, targetHours: parseInt(e.target.value)})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="goal-deadline">Deadline</Label>
                        <Input
                          id="goal-deadline"
                          type="date"
                          value={newGoal.deadline}
                          onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Subjects</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {subjects.map(subject => (
                          <Badge
                            key={subject}
                            variant={newGoal.subjects.includes(subject) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              if (newGoal.subjects.includes(subject)) {
                                setNewGoal({
                                  ...newGoal,
                                  subjects: newGoal.subjects.filter(s => s !== subject)
                                })
                              } else {
                                setNewGoal({
                                  ...newGoal,
                                  subjects: [...newGoal.subjects, subject]
                                })
                              }
                            }}
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setShowNewGoalForm(false)}>
                        Cancel
                      </Button>
                      <Button onClick={createGoal}>Create Goal</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showNewSessionForm} onOpenChange={setShowNewSessionForm}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    New Session
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule Study Session</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="session-title">Session Title</Label>
                      <Input
                        id="session-title"
                        placeholder="e.g., JEE Mathematics - Calculus"
                        value={newSession.title}
                        onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="session-subject">Subject</Label>
                        <select
                          id="session-subject"
                          value={newSession.subject}
                          onChange={(e) => setNewSession({...newSession, subject: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {subjects.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="session-duration">Duration (minutes)</Label>
                        <Input
                          id="session-duration"
                          type="number"
                          value={newSession.duration}
                          onChange={(e) => setNewSession({...newSession, duration: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="session-time">Scheduled Time</Label>
                        <Input
                          id="session-time"
                          type="datetime-local"
                          value={newSession.scheduledTime}
                          onChange={(e) => setNewSession({...newSession, scheduledTime: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="session-priority">Priority</Label>
                        <select
                          id="session-priority"
                          value={newSession.priority}
                          onChange={(e) => setNewSession({...newSession, priority: e.target.value as 'low' | 'medium' | 'high'})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="session-notes">Notes (Optional)</Label>
                      <Textarea
                        id="session-notes"
                        placeholder="Any specific topics or notes..."
                        value={newSession.notes}
                        onChange={(e) => setNewSession({...newSession, notes: e.target.value})}
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setShowNewSessionForm(false)}>
                        Cancel
                      </Button>
                      <Button onClick={createSession}>Schedule Session</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Progress</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {completedSessionsToday}/{totalSessionsToday}
                    </p>
                    <p className="text-xs text-gray-500">sessions completed</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hours Today</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalHoursToday.toFixed(1)}h
                    </p>
                    <p className="text-xs text-gray-500">study time</p>
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
                    <p className="text-2xl font-bold text-gray-900">{streak.currentStreak}</p>
                    <p className="text-xs text-gray-500">days</p>
                  </div>
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Goals</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {goals.filter(g => g.status === 'active').length}
                    </p>
                    <p className="text-xs text-gray-500">in progress</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Session Timer */}
              {activeSession && (
                <Card className="border-blue-500 bg-blue-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {activeSession.title}
                        </h3>
                        <p className="text-sm text-gray-600">{activeSession.subject}</p>
                      </div>
                      <Badge className="bg-blue-600">In Progress</Badge>
                    </div>
                    
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {formatTime(sessionTimer)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Target: {formatDuration(activeSession.duration)}
                      </div>
                    </div>

                    <div className="flex justify-center gap-3">
                      {isTimerRunning ? (
                        <Button onClick={pauseSession} variant="outline">
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </Button>
                      ) : (
                        <Button onClick={resumeSession} className="bg-blue-600 hover:bg-blue-700">
                          <Play className="w-4 h-4 mr-2" />
                          Resume
                        </Button>
                      )}
                      <Button onClick={completeSession} className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Schedule */}
              <Tabs defaultValue="today" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="goals">Goals</TabsTrigger>
                </TabsList>

                <TabsContent value="today" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Today's Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {todaySessions.length === 0 ? (
                        <div className="text-center py-8">
                          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No sessions scheduled for today
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Create your first study session to get started
                          </p>
                          <Button onClick={() => setShowNewSessionForm(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Schedule Session
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {todaySessions.map((session) => (
                            <div 
                              key={session.id} 
                              className={`p-4 border-l-4 rounded-lg bg-white ${getPriorityColor(session.priority)}`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{session.title}</h4>
                                  <p className="text-sm text-gray-600">{session.subject}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getStatusColor(session.status)}>
                                    {session.status}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {session.priority}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-4">
                                  <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {new Date(session.scheduledTime).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                  <span>{formatDuration(session.duration)}</span>
                                  {session.actualDuration && (
                                    <span className="text-green-600">
                                      (Actual: {formatDuration(session.actualDuration)})
                                    </span>
                                  )}
                                </div>
                              </div>

                              {session.notes && (
                                <p className="text-sm text-gray-700 mb-3 italic">
                                  {session.notes}
                                </p>
                              )}

                              <div className="flex items-center gap-2">
                                {session.status === 'scheduled' && !activeSession && (
                                  <Button 
                                    size="sm" 
                                    onClick={() => startSession(session)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    <Play className="w-3 h-3 mr-1" />
                                    Start
                                  </Button>
                                )}
                                <Button size="sm" variant="outline">
                                  <Edit className="w-3 h-3 mr-1" />
                                  Edit
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => deleteSession(session.id)}
                                >
                                  <Trash2 className="w-3 h-3 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="calendar" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Calendar View</CardTitle>
                      <div className="flex items-center gap-4">
                        <Input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-auto"
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedDateSessions.map((session) => (
                          <div 
                            key={session.id} 
                            className={`p-4 border-l-4 rounded-lg bg-white ${getPriorityColor(session.priority)}`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900">{session.title}</h4>
                                <p className="text-sm text-gray-600">
                                  {session.subject} • {new Date(session.scheduledTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })} • {formatDuration(session.duration)}
                                </p>
                              </div>
                              <Badge className={getStatusColor(session.status)}>
                                {session.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                        {selectedDateSessions.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            No sessions scheduled for this date
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="goals" className="space-y-4">
                  {goals.map((goal) => (
                    <Card key={goal.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {goal.title}
                            </h3>
                            <p className="text-gray-600 mb-2">{goal.description}</p>
                            <div className="flex items-center gap-2">
                              {goal.subjects.map((subject, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {subject}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={goal.status === 'completed' ? 'default' : 'secondary'}
                            >
                              {goal.status}
                            </Badge>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => deleteGoal(goal.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">
                              {goal.currentHours.toFixed(1)}/{goal.targetHours}h
                            </span>
                          </div>
                          <Progress 
                            value={(goal.currentHours / goal.targetHours) * 100} 
                            className="h-2" 
                          />
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>
                              Deadline: {new Date(goal.deadline).toLocaleDateString()}
                            </span>
                            <span>
                              {Math.round((goal.currentHours / goal.targetHours) * 100)}% complete
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Study Streak */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                    Study Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {streak.currentStreak}
                    </div>
                    <div className="text-sm text-gray-600">days current streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      {streak.longestStreak}
                    </div>
                    <div className="text-xs text-gray-500">longest streak</div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setShowNewSessionForm(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Session
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Bell className="w-4 h-4 mr-2" />
                    Set Reminders
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Streak
                  </Button>
                </CardContent>
              </Card>

              {/* Study Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Study Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-900 mb-1">Pomodoro Technique</p>
                      <p className="text-blue-700">
                        Study for 25 minutes, then take a 5-minute break
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-900 mb-1">Active Recall</p>
                      <p className="text-green-700">
                        Test yourself regularly instead of just re-reading
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="font-medium text-purple-900 mb-1">Spaced Repetition</p>
                      <p className="text-purple-700">
                        Review topics at increasing intervals
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}