import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { 
  Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft, 
  Target, TrendingUp, Award, BookOpen, AlertCircle,
  BarChart3, Lightbulb, RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Label } from '../components/ui/label'
import { mockCourses } from '../data/mockCourses'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
}

interface AssessmentResult {
  score: number
  totalQuestions: number
  timeSpent: number
  strengths: string[]
  weaknesses: string[]
  recommendations: typeof mockCourses
  levelAssessment: 'beginner' | 'intermediate' | 'advanced'
}

const mockQuestions: Record<string, Question[]> = {
  jee: [
    {
      id: 'jee_1',
      question: 'If f(x) = x² + 2x + 1, what is f\'(x)?',
      options: ['2x + 2', 'x² + 2', '2x + 1', 'x + 1'],
      correctAnswer: 0,
      explanation: 'The derivative of x² is 2x, derivative of 2x is 2, and derivative of constant 1 is 0.',
      difficulty: 'easy',
      topic: 'Calculus'
    },
    {
      id: 'jee_2',
      question: 'What is the value of sin(π/6)?',
      options: ['1/2', '√3/2', '1/√2', '√2/2'],
      correctAnswer: 0,
      explanation: 'sin(π/6) = sin(30°) = 1/2',
      difficulty: 'easy',
      topic: 'Trigonometry'
    },
    {
      id: 'jee_3',
      question: 'If the roots of equation x² - 5x + 6 = 0 are α and β, find α + β',
      options: ['5', '6', '-5', '-6'],
      correctAnswer: 0,
      explanation: 'For quadratic ax² + bx + c = 0, sum of roots = -b/a = -(-5)/1 = 5',
      difficulty: 'medium',
      topic: 'Algebra'
    },
    {
      id: 'jee_4',
      question: 'The area under the curve y = x² from x = 0 to x = 2 is:',
      options: ['8/3', '4', '8', '16/3'],
      correctAnswer: 0,
      explanation: '∫₀² x² dx = [x³/3]₀² = 8/3 - 0 = 8/3',
      difficulty: 'medium',
      topic: 'Integration'
    },
    {
      id: 'jee_5',
      question: 'If |z₁| = 3 and |z₂| = 4, what is the maximum value of |z₁ + z₂|?',
      options: ['7', '5', '1', '12'],
      correctAnswer: 0,
      explanation: 'By triangle inequality, |z₁ + z₂| ≤ |z₁| + |z₂| = 3 + 4 = 7. Maximum occurs when z₁ and z₂ are in same direction.',
      difficulty: 'hard',
      topic: 'Complex Numbers'
    }
  ],
  upsc: [
    {
      id: 'upsc_1',
      question: 'Which article of the Indian Constitution deals with the Right to Equality?',
      options: ['Article 14', 'Article 19', 'Article 21', 'Article 32'],
      correctAnswer: 0,
      explanation: 'Article 14 guarantees equality before law and equal protection of laws.',
      difficulty: 'easy',
      topic: 'Polity'
    },
    {
      id: 'upsc_2',
      question: 'The Tropic of Cancer passes through how many Indian states?',
      options: ['6', '7', '8', '9'],
      correctAnswer: 2,
      explanation: 'The Tropic of Cancer passes through 8 Indian states: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.',
      difficulty: 'medium',
      topic: 'Geography'
    }
  ],
  neet: [
    {
      id: 'neet_1',
      question: 'Which of the following is the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
      correctAnswer: 1,
      explanation: 'Mitochondria are called the powerhouse of the cell because they produce ATP through cellular respiration.',
      difficulty: 'easy',
      topic: 'Cell Biology'
    }
  ]
}

export function DiagnosticAssessment() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const examType = searchParams.get('exam') || 'jee'
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [timeSpent, setTimeSpent] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<AssessmentResult | null>(null)
  const [startTime] = useState(Date.now())

  const questions = mockQuestions[examType] || mockQuestions.jee
  const totalQuestions = questions.length

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime])

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      completeAssessment()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const completeAssessment = () => {
    setIsCompleted(true)
    
    // Calculate results
    let correctAnswers = 0
    const topicScores: Record<string, { correct: number; total: number }> = {}
    
    questions.forEach(question => {
      const userAnswer = selectedAnswers[question.id]
      const isCorrect = userAnswer === question.correctAnswer
      
      if (isCorrect) correctAnswers++
      
      if (!topicScores[question.topic]) {
        topicScores[question.topic] = { correct: 0, total: 0 }
      }
      topicScores[question.topic].total++
      if (isCorrect) topicScores[question.topic].correct++
    })

    const score = Math.round((correctAnswers / totalQuestions) * 100)
    
    // Determine strengths and weaknesses
    const strengths: string[] = []
    const weaknesses: string[] = []
    
    Object.entries(topicScores).forEach(([topic, scores]) => {
      const percentage = (scores.correct / scores.total) * 100
      if (percentage >= 70) {
        strengths.push(topic)
      } else if (percentage < 50) {
        weaknesses.push(topic)
      }
    })

    // Determine level
    let levelAssessment: 'beginner' | 'intermediate' | 'advanced'
    if (score < 40) levelAssessment = 'beginner'
    else if (score < 70) levelAssessment = 'intermediate'
    else levelAssessment = 'advanced'

    // Get recommendations
    const recommendations = mockCourses
      .filter(course => course.examType.some(exam => exam.toLowerCase().includes(examType)))
      .filter(course => {
        if (levelAssessment === 'beginner') return course.level === 'Beginner'
        if (levelAssessment === 'intermediate') return course.level === 'Intermediate'
        return course.level === 'Advanced'
      })
      .slice(0, 5)

    const assessmentResult: AssessmentResult = {
      score,
      totalQuestions,
      timeSpent,
      strengths,
      weaknesses,
      recommendations,
      levelAssessment
    }

    setResults(assessmentResult)
    
    // Show results after a brief delay
    setTimeout(() => {
      setShowResults(true)
    }, 1500)
  }

  const retakeAssessment = () => {
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setIsCompleted(false)
    setShowResults(false)
    setResults(null)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isCompleted && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Analyzing Your Performance</h2>
            <p className="text-gray-600 mb-6">Please wait while we evaluate your answers and generate personalized recommendations...</p>
            <Progress value={75} className="mb-4" />
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Evaluating answers
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Identifying strengths & weaknesses
              </div>
              <div className="flex items-center justify-center animate-pulse">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                Generating course recommendations
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            <Card className="mb-8">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h1>
                <p className="text-lg text-gray-600 mb-6">
                  Here's your personalized learning analysis
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{results.score}%</div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">{formatTime(results.timeSpent)}</div>
                    <div className="text-sm text-gray-600">Time Taken</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">{results.levelAssessment}</div>
                    <div className="text-sm text-gray-600">Your Level</div>
                  </div>
                </div>

                <Badge 
                  variant={results.score >= 70 ? 'default' : results.score >= 40 ? 'secondary' : 'destructive'}
                  className="text-sm px-4 py-1"
                >
                  {results.score >= 70 ? 'Excellent Performance' : 
                   results.score >= 40 ? 'Good Performance' : 'Needs Improvement'}
                </Badge>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Strengths & Weaknesses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Performance Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Your Strengths
                      </h4>
                      {results.strengths.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {results.strengths.map((strength, index) => (
                            <Badge key={index} className="bg-green-100 text-green-700">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">Keep practicing to identify your strengths!</p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Areas for Improvement
                      </h4>
                      {results.weaknesses.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {results.weaknesses.map((weakness, index) => (
                            <Badge key={index} variant="destructive" className="bg-red-100 text-red-700">
                              {weakness}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">Great! No major weak areas identified.</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Level Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Level Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-blue-600 mb-2 capitalize">
                      {results.levelAssessment}
                    </div>
                    <Progress value={results.score} className="mb-4" />
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    {results.levelAssessment === 'beginner' && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-blue-800">
                          <strong>Recommendation:</strong> Start with foundational courses that cover basic concepts. 
                          Focus on building strong fundamentals before moving to advanced topics.
                        </p>
                      </div>
                    )}
                    {results.levelAssessment === 'intermediate' && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-green-800">
                          <strong>Recommendation:</strong> You have a good grasp of basics. Look for courses that 
                          provide structured problem-solving practice and cover intermediate to advanced concepts.
                        </p>
                      </div>
                    )}
                    {results.levelAssessment === 'advanced' && (
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-purple-800">
                          <strong>Recommendation:</strong> Excellent foundation! Focus on advanced problem-solving, 
                          previous year questions, and courses that provide challenging practice tests.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommended Courses */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                  Recommended Courses for You
                </CardTitle>
                <p className="text-gray-600">Based on your performance, here are courses tailored to your level</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.recommendations.map((course, index) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => navigate(`/course/${course.id}`)}>
                      <CardContent className="p-4">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{course.provider}</p>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {course.level}
                          </Badge>
                          <span className="text-sm font-bold">₹{course.price.toLocaleString()}</span>
                        </div>
                        {index === 0 && (
                          <Badge className="w-full justify-center bg-green-600">
                            <Award className="w-3 h-3 mr-1" />
                            Best Match
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={retakeAssessment}
                  variant="outline"
                  className="flex items-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retake Assessment
                </Button>
                <Button 
                  onClick={() => navigate('/search')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse All Courses
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Want to improve your score? Practice more and retake the assessment anytime!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {examType.toUpperCase()} Diagnostic Assessment
                  </h1>
                  <p className="text-gray-600">
                    Question {currentQuestion + 1} of {totalQuestions}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatTime(timeSpent)}
                  </div>
                  <Badge variant="outline">
                    {currentQ.difficulty}
                  </Badge>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          {/* Question */}
          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="mb-6">
                <Badge className="mb-4">{currentQ.topic}</Badge>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {currentQ.question}
                </h2>
              </div>

              <RadioGroup
                value={selectedAnswers[currentQ.id]?.toString() || ''}
                onValueChange={(value) => handleAnswerSelect(currentQ.id, parseInt(value))}
              >
                <div className="space-y-4">
                  {currentQ.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-medium">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="text-sm text-gray-600">
              {Object.keys(selectedAnswers).length} of {totalQuestions} answered
            </div>

            <Button 
              onClick={handleNext}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentQuestion === totalQuestions - 1 ? (
                <>
                  Complete Assessment
                  <CheckCircle className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}