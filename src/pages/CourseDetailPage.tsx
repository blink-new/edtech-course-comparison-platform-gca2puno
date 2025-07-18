import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Star, Clock, Users, Award, MapPin, Heart, Share2, Plus, 
  Play, Download, CheckCircle, Globe, Calendar, BookOpen,
  TrendingUp, MessageCircle, Shield, ArrowLeft, ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Progress } from '../components/ui/progress'
import { Separator } from '../components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { mockCourses } from '../data/mockCourses'
import { Course } from '../types/course'

export function CourseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course | null>(null)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedTab, setSelectedTab] = useState('overview')

  useEffect(() => {
    const foundCourse = mockCourses.find(c => c.id === id)
    setCourse(foundCourse || null)
  }, [id])

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="p-12 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
              <p className="text-gray-600 mb-4">The course you're looking for doesn't exist.</p>
              <Button onClick={() => navigate('/search')}>Browse All Courses</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const discountPercentage = course.originalPrice 
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0

  const handleEnroll = () => {
    // TODO: Implement enrollment logic
    console.log('Enroll in course:', course.id)
  }

  const handleAddToComparison = () => {
    // TODO: Implement comparison functionality
    console.log('Add to comparison:', course.id)
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share course:', course.id)
  }

  // Mock reviews data
  const reviews = [
    {
      id: '1',
      user: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent course! The instructor explains concepts very clearly and the practice problems are really helpful.',
      helpful: 24,
      verified: true
    },
    {
      id: '2',
      user: 'Rahul Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      rating: 4,
      date: '1 month ago',
      comment: 'Good content and well-structured. Could use more practice tests but overall satisfied with the quality.',
      helpful: 18,
      verified: true
    },
    {
      id: '3',
      user: 'Anita Singh',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      date: '1 month ago',
      comment: 'This course helped me clear my exam! The doubt resolution sessions were particularly valuable.',
      helpful: 31,
      verified: true
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-600 hover:bg-blue-700">
                        {course.examType[0]}
                      </Badge>
                      {course.isVerified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <Award className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {course.format === 'Offline' && course.location && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          <MapPin className="w-3 h-3 mr-1" />
                          {course.location}
                        </Badge>
                      )}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </h1>
                    <p className="text-gray-600 mb-3">by {course.instructor} • {course.provider}</p>
                    <p className="text-gray-700">{course.description}</p>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="flex flex-wrap items-center gap-6 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold mr-1">{course.rating}</span>
                    <span className="text-gray-500">({course.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-1" />
                    {course.studentsEnrolled.toLocaleString()} students
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-5 h-5 mr-1" />
                    {course.language}
                  </div>
                  {course.successRate && (
                    <div className="flex items-center text-green-600 font-medium">
                      <TrendingUp className="w-5 h-5 mr-1" />
                      {course.successRate}% success rate
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleWishlist}
                    className={isWishlisted ? 'border-red-500 text-red-500' : ''}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                    {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                  </Button>
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" onClick={handleAddToComparison}>
                    <Plus className="w-4 h-4 mr-2" />
                    Compare
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Course Content Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* What You'll Learn */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      What You'll Learn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.subjects.map((subject, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Course Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                      Course Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.features.map((feature, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Play className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Course Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Basic understanding of {course.subjects[0]} concepts</li>
                      <li>• Access to computer/mobile device with internet connection</li>
                      <li>• Dedication to study for {course.duration}</li>
                      <li>• {course.level} level knowledge recommended</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="syllabus" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Syllabus</CardTitle>
                    <p className="text-gray-600">Comprehensive curriculum designed for {course.examType.join(', ')} preparation</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.syllabus.map((topic, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{topic}</h4>
                              <p className="text-sm text-gray-500">Module {index + 1}</p>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {Math.floor(Math.random() * 10) + 5} hours
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                {/* Reviews Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 mb-2">{course.rating}</div>
                        <div className="flex items-center justify-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-5 h-5 ${star <= course.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{course.reviewCount} reviews</p>
                      </div>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="text-sm w-8">{rating}★</span>
                            <Progress value={rating === 5 ? 70 : rating === 4 ? 25 : 5} className="flex-1" />
                            <span className="text-sm text-gray-500 w-8">{rating === 5 ? '70%' : rating === 4 ? '25%' : '5%'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-gray-900">{review.user}</h4>
                              {review.verified && (
                                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <p className="text-gray-700 mb-3">{review.comment}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <button className="flex items-center hover:text-gray-700">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                Helpful ({review.helpful})
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" />
                        <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.instructor}</h3>
                        <p className="text-gray-600 mb-4">Senior Faculty at {course.provider}</p>
                        <p className="text-gray-700 mb-4">
                          Experienced educator with over 10 years of teaching experience in {course.subjects[0]}. 
                          Has helped thousands of students achieve their academic goals through innovative teaching methods 
                          and personalized guidance.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-gray-900">10+</div>
                            <div className="text-sm text-gray-600">Years Experience</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-gray-900">50K+</div>
                            <div className="text-sm text-gray-600">Students Taught</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-gray-900">4.9</div>
                            <div className="text-sm text-gray-600">Instructor Rating</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-gray-900">25</div>
                            <div className="text-sm text-gray-600">Courses</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{course.price.toLocaleString()}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{course.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {discountPercentage > 0 && (
                    <Badge variant="destructive" className="bg-red-500 mb-4">
                      {discountPercentage}% OFF - Limited Time
                    </Badge>
                  )}
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700 mb-3"
                  onClick={handleEnroll}
                >
                  Enroll Now
                </Button>
                
                <Button variant="outline" size="lg" className="w-full mb-4">
                  <Play className="w-4 h-4 mr-2" />
                  Preview Course
                </Button>

                <div className="text-center text-sm text-gray-600 mb-4">
                  30-day money-back guarantee
                </div>

                <Separator className="my-4" />

                {/* Course Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level:</span>
                    <Badge variant="outline" className="text-xs">{course.level}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Format:</span>
                    <Badge variant="outline" className="text-xs">{course.format}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span className="font-medium">{course.language}</span>
                  </div>
                  {course.location && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{course.location}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Certificate:</span>
                    <span className="font-medium">Yes</span>
                  </div>
                </div>

                {course.batchTimings && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Batch Timings:</h4>
                      <div className="space-y-1">
                        {course.batchTimings.map((timing, index) => (
                          <div key={index} className="text-sm text-gray-600 flex items-center">
                            <Calendar className="w-3 h-3 mr-2" />
                            {timing}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Related Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Courses</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  {mockCourses
                    .filter(c => c.id !== course.id && c.examType.some(exam => course.examType.includes(exam)))
                    .slice(0, 3)
                    .map((relatedCourse) => (
                      <div 
                        key={relatedCourse.id} 
                        className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/course/${relatedCourse.id}`)}
                      >
                        <img 
                          src={relatedCourse.thumbnail} 
                          alt={relatedCourse.title}
                          className="w-16 h-12 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                            {relatedCourse.title}
                          </h4>
                          <p className="text-xs text-gray-600 mb-1">{relatedCourse.provider}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs">
                              <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                              {relatedCourse.rating}
                            </div>
                            <span className="text-sm font-medium">₹{relatedCourse.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}