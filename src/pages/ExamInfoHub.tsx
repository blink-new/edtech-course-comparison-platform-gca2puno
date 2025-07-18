import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Calendar, Clock, FileText, TrendingUp, Users, 
  BookOpen, AlertCircle, ExternalLink, Download,
  Search, Filter, Star, Award, Target, Info
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Separator } from '../components/ui/separator'

interface ExamInfo {
  id: string
  name: string
  fullName: string
  category: string
  conductedBy: string
  frequency: string
  applicationDates: {
    start: string
    end: string
  }
  examDates: {
    start: string
    end: string
  }
  resultDate: string
  eligibility: string[]
  ageLimit: string
  attempts: string
  duration: string
  totalMarks: number
  subjects: string[]
  pattern: {
    type: string
    questions: number
    marking: string
  }
  syllabus: string[]
  importantTopics: string[]
  preparationTips: string[]
  cutoffTrends: {
    year: string
    general: number
    obc: number
    sc: number
    st: number
  }[]
  successRate: number
  averagePreparationTime: string
  topInstitutes: string[]
  careerOpportunities: string[]
  salaryRange: string
  officialWebsite: string
  notificationUrl: string
  syllabusUrl: string
  previousPapersUrl: string
}

const examData: ExamInfo[] = [
  {
    id: 'jee-main',
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination Main',
    category: 'Engineering',
    conductedBy: 'National Testing Agency (NTA)',
    frequency: 'Twice a year (January & April)',
    applicationDates: {
      start: '2024-12-01',
      end: '2024-12-31'
    },
    examDates: {
      start: '2024-01-24',
      end: '2024-02-01'
    },
    resultDate: '2024-02-15',
    eligibility: [
      'Passed 12th with Physics, Chemistry, Mathematics',
      'Minimum 75% in 12th (65% for SC/ST)',
      'Born on or after October 1, 1999 (relaxation for reserved categories)'
    ],
    ageLimit: '25 years (30 for SC/ST)',
    attempts: '3 attempts',
    duration: '3 hours',
    totalMarks: 300,
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    pattern: {
      type: 'Computer Based Test (CBT)',
      questions: 90,
      marking: '+4 for correct, -1 for incorrect'
    },
    syllabus: [
      'Physics: Mechanics, Thermodynamics, Waves, Electromagnetism, Modern Physics',
      'Chemistry: Physical, Organic, Inorganic Chemistry',
      'Mathematics: Algebra, Trigonometry, Coordinate Geometry, Calculus, Statistics'
    ],
    importantTopics: [
      'Mechanics (Physics)',
      'Coordination Compounds (Chemistry)', 
      'Coordinate Geometry (Mathematics)',
      'Thermodynamics (Physics)',
      'Organic Chemistry Reactions'
    ],
    preparationTips: [
      'Focus on NCERT books for strong foundation',
      'Practice previous year questions regularly',
      'Take mock tests to improve speed and accuracy',
      'Maintain a study schedule with regular revision',
      'Focus on weak areas identified through practice tests'
    ],
    cutoffTrends: [
      { year: '2023', general: 90, obc: 75, sc: 55, st: 45 },
      { year: '2022', general: 88, obc: 73, sc: 52, st: 42 },
      { year: '2021', general: 87, obc: 72, sc: 50, st: 40 }
    ],
    successRate: 12,
    averagePreparationTime: '2 years',
    topInstitutes: ['IIT Delhi', 'IIT Bombay', 'IIT Madras', 'NIT Trichy', 'IIIT Hyderabad'],
    careerOpportunities: [
      'Software Engineer', 'Mechanical Engineer', 'Civil Engineer', 
      'Electronics Engineer', 'Research Scientist', 'Product Manager'
    ],
    salaryRange: '₹6-25 LPA',
    officialWebsite: 'https://jeemain.nta.nic.in',
    notificationUrl: 'https://jeemain.nta.nic.in/notification',
    syllabusUrl: 'https://jeemain.nta.nic.in/syllabus',
    previousPapersUrl: 'https://jeemain.nta.nic.in/previous-papers'
  },
  {
    id: 'upsc-cse',
    name: 'UPSC CSE',
    fullName: 'Union Public Service Commission Civil Services Examination',
    category: 'Civil Services',
    conductedBy: 'Union Public Service Commission (UPSC)',
    frequency: 'Once a year',
    applicationDates: {
      start: '2024-02-14',
      end: '2024-03-05'
    },
    examDates: {
      start: '2024-06-16',
      end: '2024-06-16'
    },
    resultDate: '2024-07-15',
    eligibility: [
      'Graduate degree from recognized university',
      'Age: 21-32 years (relaxation for reserved categories)',
      'Indian citizen (some posts open to other categories)'
    ],
    ageLimit: '32 years (37 for OBC, 42 for SC/ST)',
    attempts: '6 attempts (9 for OBC, unlimited for SC/ST)',
    duration: '2 hours per paper',
    totalMarks: 2025,
    subjects: ['General Studies', 'Optional Subject', 'Essay', 'English', 'Hindi/Regional Language'],
    pattern: {
      type: 'Offline (OMR) for Prelims, Written for Mains',
      questions: 200,
      marking: '+2 for correct, -0.67 for incorrect (Prelims)'
    },
    syllabus: [
      'History: Ancient, Medieval, Modern Indian History',
      'Geography: Physical, Human, Indian Geography',
      'Polity: Constitution, Governance, Social Justice',
      'Economics: Indian Economy, Economic Development',
      'Environment: Ecology, Biodiversity, Climate Change',
      'Current Affairs: National and International'
    ],
    importantTopics: [
      'Indian Constitution',
      'Modern Indian History',
      'Indian Economy',
      'Geography of India',
      'Current Affairs'
    ],
    preparationTips: [
      'Read newspapers daily for current affairs',
      'Focus on NCERT books for basic concepts',
      'Practice answer writing for mains',
      'Take mock tests regularly',
      'Choose optional subject wisely based on interest and scoring potential'
    ],
    cutoffTrends: [
      { year: '2023', general: 108, obc: 102, sc: 98, st: 94 },
      { year: '2022', general: 105, obc: 100, sc: 95, st: 90 },
      { year: '2021', general: 103, obc: 98, sc: 93, st: 88 }
    ],
    successRate: 0.3,
    averagePreparationTime: '2-3 years',
    topInstitutes: ['Lal Bahadur Shastri National Academy', 'Sardar Vallabhbhai Patel National Police Academy'],
    careerOpportunities: [
      'IAS Officer', 'IPS Officer', 'IFS Officer', 'IRS Officer', 
      'District Collector', 'Police Commissioner', 'Ambassador'
    ],
    salaryRange: '₹56,100 - ₹2,50,000 per month',
    officialWebsite: 'https://upsc.gov.in',
    notificationUrl: 'https://upsc.gov.in/notifications',
    syllabusUrl: 'https://upsc.gov.in/syllabus',
    previousPapersUrl: 'https://upsc.gov.in/previous-papers'
  },
  {
    id: 'neet-ug',
    name: 'NEET UG',
    fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
    category: 'Medical',
    conductedBy: 'National Testing Agency (NTA)',
    frequency: 'Once a year',
    applicationDates: {
      start: '2024-02-09',
      end: '2024-03-09'
    },
    examDates: {
      start: '2024-05-05',
      end: '2024-05-05'
    },
    resultDate: '2024-06-04',
    eligibility: [
      'Passed 12th with Physics, Chemistry, Biology/Biotechnology',
      'Minimum 50% in PCB (40% for SC/ST/OBC)',
      'Age: 17-25 years (30 for SC/ST/OBC)'
    ],
    ageLimit: '25 years (30 for SC/ST/OBC)',
    attempts: 'No limit',
    duration: '3 hours 20 minutes',
    totalMarks: 720,
    subjects: ['Physics', 'Chemistry', 'Biology (Botany + Zoology)'],
    pattern: {
      type: 'Offline (OMR based)',
      questions: 180,
      marking: '+4 for correct, -1 for incorrect'
    },
    syllabus: [
      'Physics: Mechanics, Thermodynamics, Optics, Modern Physics',
      'Chemistry: Physical, Organic, Inorganic Chemistry',
      'Biology: Diversity of Living World, Cell Biology, Genetics, Ecology'
    ],
    importantTopics: [
      'Human Physiology (Biology)',
      'Organic Chemistry',
      'Mechanics (Physics)',
      'Cell Biology',
      'Genetics and Evolution'
    ],
    preparationTips: [
      'Master NCERT books thoroughly',
      'Practice diagrams and biological processes',
      'Focus on high-weightage topics',
      'Take regular mock tests',
      'Maintain accuracy over speed'
    ],
    cutoffTrends: [
      { year: '2023', general: 720, obc: 690, sc: 630, st: 600 },
      { year: '2022', general: 715, obc: 685, sc: 625, st: 595 },
      { year: '2021', general: 710, obc: 680, sc: 620, st: 590 }
    ],
    successRate: 15,
    averagePreparationTime: '2 years',
    topInstitutes: ['AIIMS Delhi', 'JIPMER', 'KGMU', 'MAMC', 'UCMS'],
    careerOpportunities: [
      'Doctor (MBBS)', 'Surgeon', 'Physician', 'Medical Researcher',
      'Public Health Officer', 'Medical Officer'
    ],
    salaryRange: '₹4-20 LPA',
    officialWebsite: 'https://neet.nta.nic.in',
    notificationUrl: 'https://neet.nta.nic.in/notification',
    syllabusUrl: 'https://neet.nta.nic.in/syllabus',
    previousPapersUrl: 'https://neet.nta.nic.in/previous-papers'
  }
]

export function ExamInfoHub() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedExam, setSelectedExam] = useState<ExamInfo | null>(null)

  const categories = ['all', 'Engineering', 'Medical', 'Civil Services', 'Banking', 'Teaching']
  
  const filteredExams = examData.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || exam.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getStatusBadge = (exam: ExamInfo) => {
    const now = new Date()
    const appStart = new Date(exam.applicationDates.start)
    const appEnd = new Date(exam.applicationDates.end)
    const examStart = new Date(exam.examDates.start)

    if (now < appStart) {
      return <Badge variant="secondary">Upcoming</Badge>
    } else if (now >= appStart && now <= appEnd) {
      return <Badge className="bg-green-600">Applications Open</Badge>
    } else if (now > appEnd && now < examStart) {
      return <Badge variant="outline">Applications Closed</Badge>
    } else {
      return <Badge variant="destructive">Exam Completed</Badge>
    }
  }

  if (selectedExam) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" onClick={() => setSelectedExam(null)}>
                ← Back to Exams
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{selectedExam.name}</h1>
                <p className="text-gray-600">{selectedExam.fullName}</p>
              </div>
            </div>

            {/* Quick Info */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">Exam Date</div>
                    <div className="text-sm text-gray-600">{formatDate(selectedExam.examDates.start)}</div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">Duration</div>
                    <div className="text-sm text-gray-600">{selectedExam.duration}</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">Success Rate</div>
                    <div className="text-sm text-gray-600">{selectedExam.successRate}%</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">Salary Range</div>
                    <div className="text-sm text-gray-600">{selectedExam.salaryRange}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                <TabsTrigger value="pattern">Exam Pattern</TabsTrigger>
                <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                <TabsTrigger value="preparation">Preparation</TabsTrigger>
                <TabsTrigger value="cutoff">Cutoff Trends</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Info className="w-5 h-5 mr-2" />
                        Basic Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Conducted By:</span>
                        <span className="font-medium">{selectedExam.conductedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frequency:</span>
                        <span className="font-medium">{selectedExam.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Marks:</span>
                        <span className="font-medium">{selectedExam.totalMarks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Attempts Allowed:</span>
                        <span className="font-medium">{selectedExam.attempts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Preparation:</span>
                        <span className="font-medium">{selectedExam.averagePreparationTime}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Important Dates
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="font-medium text-gray-900 mb-1">Application Period</div>
                        <div className="text-sm text-gray-600">
                          {formatDate(selectedExam.applicationDates.start)} - {formatDate(selectedExam.applicationDates.end)}
                        </div>
                        {getStatusBadge(selectedExam)}
                      </div>
                      <Separator />
                      <div>
                        <div className="font-medium text-gray-900 mb-1">Exam Date</div>
                        <div className="text-sm text-gray-600">{formatDate(selectedExam.examDates.start)}</div>
                      </div>
                      <Separator />
                      <div>
                        <div className="font-medium text-gray-900 mb-1">Result Date</div>
                        <div className="text-sm text-gray-600">{formatDate(selectedExam.resultDate)}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Career Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedExam.careerOpportunities.map((career, index) => (
                        <Badge key={index} variant="outline" className="justify-center p-2">
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="eligibility" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Eligibility Criteria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Educational Qualification</h4>
                        <ul className="space-y-2">
                          {selectedExam.eligibility.map((criteria, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Age Limit</h4>
                          <p className="text-gray-700">{selectedExam.ageLimit}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Number of Attempts</h4>
                          <p className="text-gray-700">{selectedExam.attempts}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pattern" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Exam Pattern</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Exam Type</h4>
                          <p className="text-gray-700">{selectedExam.pattern.type}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Total Questions</h4>
                          <p className="text-gray-700">{selectedExam.pattern.questions}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Marking Scheme</h4>
                          <p className="text-gray-700">{selectedExam.pattern.marking}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Subjects</h4>
                        <div className="space-y-2">
                          {selectedExam.subjects.map((subject, index) => (
                            <Badge key={index} variant="outline" className="mr-2 mb-2">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="syllabus" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Syllabus</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedExam.syllabus.map((topic, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-gray-700">{topic}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-600" />
                        Important Topics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedExam.importantTopics.map((topic, index) => (
                          <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg">
                            <Star className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="preparation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Preparation Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedExam.preparationTips.map((tip, index) => (
                        <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-gray-700">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Top Institutes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedExam.topInstitutes.map((institute, index) => (
                        <div key={index} className="flex items-center p-3 border rounded-lg">
                          <Award className="w-4 h-4 text-yellow-600 mr-2" />
                          <span className="font-medium text-gray-900">{institute}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cutoff" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cutoff Trends (Last 3 Years)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-semibold">Year</th>
                            <th className="text-left p-3 font-semibold">General</th>
                            <th className="text-left p-3 font-semibold">OBC</th>
                            <th className="text-left p-3 font-semibold">SC</th>
                            <th className="text-left p-3 font-semibold">ST</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedExam.cutoffTrends.map((cutoff, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="p-3 font-medium">{cutoff.year}</td>
                              <td className="p-3">{cutoff.general}</td>
                              <td className="p-3">{cutoff.obc}</td>
                              <td className="p-3">{cutoff.sc}</td>
                              <td className="p-3">{cutoff.st}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Official Website
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download Syllabus
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Previous Papers
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate(`/diagnostic-assessment?exam=${selectedExam.id}`)}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Take Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Information Hub</h1>
            <p className="text-lg text-gray-600">
              Complete information about competitive exams, syllabi, and preparation strategies
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search exams..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exam Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedExam(exam)}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{exam.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{exam.fullName}</p>
                      <Badge variant="outline">{exam.category}</Badge>
                    </div>
                    {getStatusBadge(exam)}
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Exam: {formatDate(exam.examDates.start)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      Duration: {exam.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Success Rate: {exam.successRate}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {exam.conductedBy}
                    </span>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredExams.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No exams found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or category filter.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}