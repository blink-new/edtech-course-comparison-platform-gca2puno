import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { 
  X, Star, Clock, Users, Award, MapPin, CheckCircle, 
  XCircle, Plus, ArrowLeft, ExternalLink, Heart, Share2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { mockCourses } from '../data/mockCourses'
import { Course } from '../types/course'

export function ComparisonPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [comparedCourses, setComparedCourses] = useState<Course[]>([])
  const [availableCourses, setAvailableCourses] = useState<Course[]>([])

  useEffect(() => {
    // Get course IDs from URL params
    const courseIds = searchParams.get('courses')?.split(',') || []
    const courses = mockCourses.filter(course => courseIds.includes(course.id))
    setComparedCourses(courses)
    
    // Set available courses for adding more
    setAvailableCourses(mockCourses.filter(course => !courseIds.includes(course.id)))
  }, [searchParams])

  const removeCourse = (courseId: string) => {
    const updatedCourses = comparedCourses.filter(course => course.id !== courseId)
    setComparedCourses(updatedCourses)
    
    // Update URL
    const courseIds = updatedCourses.map(course => course.id).join(',')
    navigate(`/compare${courseIds ? `?courses=${courseIds}` : ''}`, { replace: true })
  }

  const addCourse = (course: Course) => {
    if (comparedCourses.length >= 5) return // Max 5 courses
    
    const updatedCourses = [...comparedCourses, course]
    setComparedCourses(updatedCourses)
    setAvailableCourses(availableCourses.filter(c => c.id !== course.id))
    
    // Update URL
    const courseIds = updatedCourses.map(c => c.id).join(',')
    navigate(`/compare?courses=${courseIds}`, { replace: true })
  }

  const getComparisonValue = (course: Course, feature: string) => {
    switch (feature) {
      case 'price':
        return `₹${course.price.toLocaleString()}`
      case 'originalPrice':
        return course.originalPrice ? `₹${course.originalPrice.toLocaleString()}` : '-'
      case 'rating':
        return (
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            {course.rating} ({course.reviewCount})
          </div>
        )
      case 'duration':
        return course.duration
      case 'level':
        return <Badge variant="outline" className="text-xs">{course.level}</Badge>
      case 'format':
        return <Badge variant="outline" className="text-xs">{course.format}</Badge>
      case 'language':
        return course.language
      case 'studentsEnrolled':
        return course.studentsEnrolled.toLocaleString()
      case 'successRate':
        return course.successRate ? `${course.successRate}%` : '-'
      case 'isVerified':
        return course.isVerified ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <XCircle className="w-5 h-5 text-gray-400" />
        )
      case 'examType':
        return (
          <div className="flex flex-wrap gap-1">
            {course.examType.slice(0, 2).map((exam, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {exam}
              </Badge>
            ))}
            {course.examType.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{course.examType.length - 2}
              </Badge>
            )}
          </div>
        )
      case 'subjects':
        return (
          <div className="flex flex-wrap gap-1">
            {course.subjects.slice(0, 3).map((subject, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {subject}
              </Badge>
            ))}
            {course.subjects.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{course.subjects.length - 3}
              </Badge>
            )}
          </div>
        )
      case 'features':
        return (
          <div className="space-y-1">
            {course.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center text-sm">
                <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                {feature}
              </div>
            ))}
            {course.features.length > 4 && (
              <div className="text-xs text-gray-500">
                +{course.features.length - 4} more features
              </div>
            )}
          </div>
        )
      default:
        return '-'
    }
  }

  const comparisonFeatures = [
    { key: 'price', label: 'Current Price', category: 'pricing' },
    { key: 'originalPrice', label: 'Original Price', category: 'pricing' },
    { key: 'rating', label: 'Rating & Reviews', category: 'quality' },
    { key: 'duration', label: 'Duration', category: 'details' },
    { key: 'level', label: 'Difficulty Level', category: 'details' },
    { key: 'format', label: 'Format', category: 'details' },
    { key: 'language', label: 'Language', category: 'details' },
    { key: 'studentsEnrolled', label: 'Students Enrolled', category: 'popularity' },
    { key: 'successRate', label: 'Success Rate', category: 'quality' },
    { key: 'isVerified', label: 'Verified Course', category: 'quality' },
    { key: 'examType', label: 'Exam Types', category: 'content' },
    { key: 'subjects', label: 'Subjects Covered', category: 'content' },
    { key: 'features', label: 'Course Features', category: 'content' }
  ]

  const categories = [
    { id: 'pricing', name: 'Pricing', icon: '💰' },
    { id: 'quality', name: 'Quality & Trust', icon: '⭐' },
    { id: 'details', name: 'Course Details', icon: '📚' },
    { id: 'popularity', name: 'Popularity', icon: '👥' },
    { id: 'content', name: 'Content & Features', icon: '🎯' }
  ]

  if (comparedCourses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/search')}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>

            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Comparison</h1>
                <p className="text-gray-600 mb-6">
                  Compare up to 5 courses side by side to make the best choice for your learning journey
                </p>
                <Button onClick={() => navigate('/search')} className="bg-blue-600 hover:bg-blue-700">
                  Browse Courses to Compare
                </Button>
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/search')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Search
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Course Comparison</h1>
                <p className="text-gray-600">
                  Comparing {comparedCourses.length} course{comparedCourses.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {comparedCourses.length < 5 && (
              <Button variant="outline" className="hidden md:flex">
                <Plus className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            )}
          </div>

          {/* Course Cards Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {comparedCourses.map((course) => (
              <Card key={course.id} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-red-100"
                  onClick={() => removeCourse(course.id)}
                >
                  <X className="w-4 h-4 text-red-500" />
                </Button>
                
                <CardContent className="p-4">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-24 object-cover rounded mb-3"
                  />
                  <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">{course.provider}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-xs font-medium">{course.rating}</span>
                    </div>
                    <span className="text-sm font-bold">₹{course.price.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Add Course Card */}
            {comparedCourses.length < 5 && (
              <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
                <CardContent className="p-4 flex items-center justify-center h-full min-h-[200px]">
                  <div className="text-center">
                    <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Add another course</p>
                    <Button variant="outline" size="sm">
                      Browse Courses
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Detailed Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-48 sticky left-0 bg-white z-10">Features</TableHead>
                      {comparedCourses.map((course) => (
                        <TableHead key={course.id} className="min-w-64 text-center">
                          <div className="space-y-2">
                            <img 
                              src={course.thumbnail} 
                              alt={course.title}
                              className="w-16 h-10 object-cover rounded mx-auto"
                            />
                            <div className="font-semibold text-sm line-clamp-2">{course.title}</div>
                            <div className="text-xs text-gray-600">{course.provider}</div>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <React.Fragment key={category.id}>
                        <TableRow className="bg-gray-50">
                          <TableCell 
                            colSpan={comparedCourses.length + 1} 
                            className="font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10"
                          >
                            <div className="flex items-center">
                              <span className="mr-2">{category.icon}</span>
                              {category.name}
                            </div>
                          </TableCell>
                        </TableRow>
                        {comparisonFeatures
                          .filter(feature => feature.category === category.id)
                          .map((feature) => (
                            <TableRow key={feature.key}>
                              <TableCell className="font-medium sticky left-0 bg-white z-10">
                                {feature.label}
                              </TableCell>
                              {comparedCourses.map((course) => (
                                <TableCell key={course.id} className="text-center">
                                  {getComparisonValue(course, feature.key)}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {comparedCourses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{course.title}</h3>
                  <div className="text-lg font-bold text-gray-900 mb-3">
                    ₹{course.price.toLocaleString()}
                  </div>
                  <div className="space-y-2">
                    <Button 
                      size="sm" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => navigate(`/course/${course.id}`)}
                    >
                      View Details
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Heart className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">💡 Comparison Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Consider Your Budget</h4>
                  <p className="text-gray-600">
                    Look at both current and original prices. Higher-priced courses often include more features 
                    and support, but ensure they fit your budget.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Check Success Rates</h4>
                  <p className="text-gray-600">
                    Success rate indicates how many students achieved their goals. Higher rates suggest 
                    better course effectiveness and teaching quality.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Match Your Level</h4>
                  <p className="text-gray-600">
                    Choose courses that match your current knowledge level. Beginner courses provide 
                    foundational concepts, while advanced courses focus on problem-solving.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Review Features</h4>
                  <p className="text-gray-600">
                    Compare course features like live classes, doubt resolution, mock tests, and study 
                    materials to find what suits your learning style.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}