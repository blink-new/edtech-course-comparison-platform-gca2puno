import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Sparkles, ArrowRight, ArrowLeft, CheckCircle, Clock, 
  Target, BookOpen, TrendingUp, Users, Star, Award
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Label } from '../components/ui/label'
import { Checkbox } from '../components/ui/checkbox'
import { Slider } from '../components/ui/slider'
import { Textarea } from '../components/ui/textarea'
import { mockCourses } from '../data/mockCourses'
import { Course } from '../types/course'

interface QuizState {
  examType: string
  subjects: string[]
  currentLevel: string
  studyHours: number
  budget: number[]
  format: string
  timeline: string
  goals: string
  weakAreas: string[]
}

export function AICourseFinder() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [recommendations, setRecommendations] = useState<Course[]>([])
  
  const [quizState, setQuizState] = useState<QuizState>({
    examType: '',
    subjects: [],
    currentLevel: '',
    studyHours: 2,
    budget: [10000],
    format: '',
    timeline: '',
    goals: '',
    weakAreas: []
  })

  const totalSteps = 7

  const examTypes = [
    { id: 'jee', name: 'JEE (Main/Advanced)', description: 'Engineering entrance exam' },
    { id: 'upsc', name: 'UPSC Civil Services', description: 'Government services exam' },
    { id: 'neet', name: 'NEET (UG/PG)', description: 'Medical entrance exam' },
    { id: 'ssc', name: 'SSC (CGL/CHSL)', description: 'Staff Selection Commission' },
    { id: 'gmat', name: 'GMAT', description: 'MBA entrance exam' },
    { id: 'k12', name: 'K-12 Education', description: 'School curriculum support' }
  ]

  const subjectsByExam = {
    jee: ['Mathematics', 'Physics', 'Chemistry'],
    upsc: ['General Studies', 'Current Affairs', 'History', 'Geography', 'Polity', 'Economics'],
    neet: ['Biology', 'Physics', 'Chemistry', 'Medicine', 'Surgery'],
    ssc: ['Quantitative Aptitude', 'General Intelligence', 'General Awareness', 'English'],
    gmat: ['Quantitative Reasoning', 'Verbal Reasoning', 'Data Insights'],
    k12: ['Mathematics', 'Science', 'English', 'Social Studies']
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      analyzeAndRecommend()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const analyzeAndRecommend = async () => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Simple recommendation logic based on quiz answers
    const filtered = mockCourses.filter(course => {
      // Filter by exam type
      if (quizState.examType) {
        const examMatch = course.examType.some(exam => 
          exam.toLowerCase().includes(quizState.examType.toLowerCase())
        )
        if (!examMatch) return false
      }
      
      // Filter by budget
      if (course.price > quizState.budget[0]) return false
      
      // Filter by format
      if (quizState.format && course.format !== quizState.format) return false
      
      return true
    })

    // Sort by relevance (rating and success rate)
    filtered.sort((a, b) => {
      const scoreA = (a.rating * 0.6) + ((a.successRate || 0) * 0.004)
      const scoreB = (b.rating * 0.6) + ((b.successRate || 0) * 0.004)
      return scoreB - scoreA
    })

    setRecommendations(filtered.slice(0, 5))
    setIsAnalyzing(false)
    setShowResults(true)
  }

  const updateQuizState = (updates: Partial<QuizState>) => {
    setQuizState(prev => ({ ...prev, ...updates }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return quizState.examType !== ''
      case 2: return quizState.subjects.length > 0
      case 3: return quizState.currentLevel !== ''
      case 4: return true // Study hours always valid
      case 5: return true // Budget always valid
      case 6: return quizState.format !== ''
      case 7: return quizState.timeline !== ''
      default: return true
    }
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Analyzing Your Preferences</h2>
            <p className="text-gray-600 mb-6">Our AI is finding the perfect courses for you...</p>
            <Progress value={66} className="mb-4" />
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Processing your exam preferences
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Matching with course database
              </div>
              <div className="flex items-center justify-center animate-pulse">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                Generating personalized recommendations
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            <Card className="mb-8">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Personalized Recommendations</h1>
                <p className="text-lg text-gray-600 mb-4">
                  Based on your preferences, we found {recommendations.length} courses perfect for you
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    {quizState.examType.toUpperCase()} focused
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {quizState.studyHours}h/day study plan
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Under ₹{quizState.budget[0].toLocaleString()} budget
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Courses */}
            <div className="space-y-6">
              {recommendations.map((course, index) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-48 h-32 object-cover rounded-lg"
                        />
                        {index === 0 && (
                          <Badge className="absolute -top-2 -right-2 bg-green-600">
                            <Award className="w-3 h-3 mr-1" />
                            Best Match
                          </Badge>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-blue-600">
                                {course.examType[0]}
                              </Badge>
                              {course.isVerified && (
                                <Badge variant="secondary" className="bg-green-100 text-green-700">
                                  <Award className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                              <div className="text-sm text-green-600 font-medium">
                                {Math.round((5 - index) * 20)}% match
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {course.title}
                            </h3>
                            <p className="text-gray-600 mb-2">by {course.instructor} • {course.provider}</p>
                            <p className="text-gray-700 line-clamp-2 mb-3">{course.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center mb-4 space-x-6">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-medium mr-1">{course.rating}</span>
                            <span className="text-gray-500 text-sm">({course.reviewCount})</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-1" />
                            <span className="text-sm">{course.studentsEnrolled.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{course.duration}</span>
                          </div>
                          {course.successRate && (
                            <div className="text-sm text-green-600 font-medium">
                              {course.successRate}% success rate
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl font-bold text-gray-900">
                              ₹{course.price.toLocaleString()}
                            </span>
                            {course.originalPrice && (
                              <span className="text-lg text-gray-500 line-through">
                                ₹{course.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-3">
                            <Button 
                              variant="outline"
                              onClick={() => navigate(`/course/${course.id}`)}
                            >
                              View Details
                            </Button>
                            <Button 
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => navigate(`/course/${course.id}`)}
                            >
                              Enroll Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Actions */}
            <div className="text-center mt-8 space-y-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setCurrentStep(1)
                  setShowResults(false)
                  setQuizState({
                    examType: '',
                    subjects: [],
                    currentLevel: '',
                    studyHours: 2,
                    budget: [10000],
                    format: '',
                    timeline: '',
                    goals: '',
                    weakAreas: []
                  })
                }}
              >
                Take Quiz Again
              </Button>
              <div className="text-sm text-gray-600">
                Not satisfied with recommendations? Try adjusting your preferences.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Course Finder</h1>
            <p className="text-lg text-gray-600">
              Answer a few questions to get personalized course recommendations
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% complete</span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} />
          </div>

          {/* Quiz Steps */}
          <Card>
            <CardContent className="p-8">
              {/* Step 1: Exam Type */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Which exam are you preparing for?</h2>
                  <p className="text-gray-600 mb-6">Select the exam that best matches your goals</p>
                  
                  <RadioGroup 
                    value={quizState.examType} 
                    onValueChange={(value) => updateQuizState({ examType: value })}
                  >
                    <div className="space-y-3">
                      {examTypes.map((exam) => (
                        <div key={exam.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value={exam.id} id={exam.id} />
                          <Label htmlFor={exam.id} className="flex-1 cursor-pointer">
                            <div className="font-medium text-gray-900">{exam.name}</div>
                            <div className="text-sm text-gray-600">{exam.description}</div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 2: Subjects */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Which subjects do you want to focus on?</h2>
                  <p className="text-gray-600 mb-6">Select all subjects you need help with</p>
                  
                  <div className="space-y-3">
                    {(subjectsByExam[quizState.examType as keyof typeof subjectsByExam] || []).map((subject) => (
                      <div key={subject} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <Checkbox
                          id={subject}
                          checked={quizState.subjects.includes(subject)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateQuizState({ subjects: [...quizState.subjects, subject] })
                            } else {
                              updateQuizState({ subjects: quizState.subjects.filter(s => s !== subject) })
                            }
                          }}
                        />
                        <Label htmlFor={subject} className="cursor-pointer font-medium">
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Current Level */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">What's your current preparation level?</h2>
                  <p className="text-gray-600 mb-6">This helps us recommend courses at the right difficulty</p>
                  
                  <RadioGroup 
                    value={quizState.currentLevel} 
                    onValueChange={(value) => updateQuizState({ currentLevel: value })}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="beginner" id="beginner" />
                        <Label htmlFor="beginner" className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900">Beginner</div>
                          <div className="text-sm text-gray-600">Just starting out, need foundational concepts</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="intermediate" id="intermediate" />
                        <Label htmlFor="intermediate" className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900">Intermediate</div>
                          <div className="text-sm text-gray-600">Have some knowledge, need structured preparation</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="advanced" id="advanced" />
                        <Label htmlFor="advanced" className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900">Advanced</div>
                          <div className="text-sm text-gray-600">Strong foundation, need advanced problem solving</div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 4: Study Hours */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">How many hours can you study daily?</h2>
                  <p className="text-gray-600 mb-6">This helps us recommend courses that fit your schedule</p>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-medium">{quizState.studyHours} hours per day</span>
                        <Badge variant="outline">
                          {quizState.studyHours < 2 ? 'Light' : quizState.studyHours < 4 ? 'Moderate' : 'Intensive'}
                        </Badge>
                      </div>
                      <Slider
                        value={[quizState.studyHours]}
                        onValueChange={(value) => updateQuizState({ studyHours: value[0] })}
                        max={8}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>1 hour</span>
                        <span>8 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Budget */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">What's your budget for the course?</h2>
                  <p className="text-gray-600 mb-6">We'll show you courses within your price range</p>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-medium">₹{quizState.budget[0].toLocaleString()}</span>
                        <Badge variant="outline">
                          {quizState.budget[0] < 10000 ? 'Budget' : quizState.budget[0] < 25000 ? 'Standard' : 'Premium'}
                        </Badge>
                      </div>
                      <Slider
                        value={quizState.budget}
                        onValueChange={(value) => updateQuizState({ budget: value })}
                        max={50000}
                        min={2000}
                        step={1000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>₹2,000</span>
                        <span>₹50,000+</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Format */}
              {currentStep === 6 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">What's your preferred learning format?</h2>
                  <p className="text-gray-600 mb-6">Choose the format that works best for you</p>
                  
                  <RadioGroup 
                    value={quizState.format} 
                    onValueChange={(value) => updateQuizState({ format: value })}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="Online" id="online" />
                        <Label htmlFor="online" className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900">Online</div>
                          <div className="text-sm text-gray-600">Study from anywhere, flexible timing</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="Offline" id="offline" />
                        <Label htmlFor="offline" className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900">Offline</div>
                          <div className="text-sm text-gray-600">Classroom learning, direct interaction</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="Hybrid" id="hybrid" />
                        <Label htmlFor="hybrid" className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900">Hybrid</div>
                          <div className="text-sm text-gray-600">Mix of online and offline classes</div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 7: Timeline & Goals */}
              {currentStep === 7 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">When is your target exam date?</h2>
                  <p className="text-gray-600 mb-6">This helps us recommend courses with appropriate duration</p>
                  
                  <RadioGroup 
                    value={quizState.timeline} 
                    onValueChange={(value) => updateQuizState({ timeline: value })}
                  >
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="3months" id="3months" />
                        <Label htmlFor="3months" className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900">Within 3 months</div>
                          <div className="text-sm text-gray-600">Intensive preparation needed</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="6months" id="6months" />
                        <Label htmlFor="6months" className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900">3-6 months</div>
                          <div className="text-sm text-gray-600">Balanced preparation schedule</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="12months" id="12months" />
                        <Label htmlFor="12months" className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900">6-12 months</div>
                          <div className="text-sm text-gray-600">Comprehensive long-term preparation</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="flexible" id="flexible" />
                        <Label htmlFor="flexible" className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900">Flexible / No specific date</div>
                          <div className="text-sm text-gray-600">Learning at my own pace</div>
                        </Label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="goals" className="text-base font-medium text-gray-900 mb-2 block">
                        Any specific goals or requirements? (Optional)
                      </Label>
                      <Textarea
                        id="goals"
                        placeholder="e.g., Need help with specific topics, prefer certain teaching style, etc."
                        value={quizState.goals}
                        onChange={(e) => updateQuizState({ goals: e.target.value })}
                        className="min-h-[100px]"
                      />
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <Button 
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentStep === totalSteps ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get Recommendations
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}