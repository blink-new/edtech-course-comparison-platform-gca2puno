import { Star, Clock, Users, Award, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

const featuredCourses = [
  {
    id: '1',
    title: 'Complete JEE Mathematics Mastery',
    provider: 'Vedantu',
    instructor: 'Dr. Amit Sharma',
    rating: 4.9,
    reviewCount: 2847,
    price: 15999,
    originalPrice: 24999,
    duration: '8 months',
    studentsEnrolled: 12500,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
    examType: 'JEE',
    level: 'Advanced',
    features: ['Live Classes', 'Doubt Resolution', 'Mock Tests', 'Study Material'],
    isVerified: true,
    successRate: 96
  },
  {
    id: '2',
    title: 'UPSC CSE Complete Foundation',
    provider: 'Unacademy',
    instructor: 'Roman Saini',
    rating: 4.8,
    reviewCount: 1923,
    price: 18999,
    originalPrice: 29999,
    duration: '12 months',
    studentsEnrolled: 8750,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    examType: 'UPSC',
    level: 'Intermediate',
    features: ['Current Affairs', 'Answer Writing', 'Interview Prep', 'Test Series'],
    isVerified: true,
    successRate: 89
  },
  {
    id: '3',
    title: 'NEET PG Medicine Comprehensive',
    provider: 'PrepLadder',
    instructor: 'Dr. Deepak Marwah',
    rating: 4.9,
    reviewCount: 1456,
    price: 22999,
    originalPrice: 34999,
    duration: '10 months',
    studentsEnrolled: 5600,
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
    examType: 'NEET PG',
    level: 'Advanced',
    features: ['Clinical Cases', 'Image-based Questions', 'Grand Tests', 'Video Lectures'],
    isVerified: true,
    successRate: 92
  }
]

export function FeaturedCourses() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-lg text-gray-600">
              Top-rated courses handpicked by our education experts
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            View All Courses
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-blue-600 hover:bg-blue-700">
                    {course.examType}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  {course.isVerified && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <Award className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                {course.originalPrice && (
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="destructive" className="bg-red-500">
                      {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600">by {course.instructor} • {course.provider}</p>
                </div>

                <div className="flex items-center mb-3 space-x-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{course.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({course.reviewCount})</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {course.studentsEnrolled.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center mb-4 space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {course.level}
                  </Badge>
                  <div className="text-sm text-green-600 font-medium">
                    {course.successRate}% success
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {course.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {course.features.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{course.features.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{course.price.toLocaleString()}
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{course.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline">
            View All Courses
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}