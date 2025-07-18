import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Clock, Users, Award, MapPin, Heart, Share2, Plus } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Course } from '../../types/course'

interface CourseListItemProps {
  course: Course
}

export function CourseListItem({ course }: CourseListItemProps) {
  const navigate = useNavigate()
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleViewDetails = () => {
    navigate(`/course/${course.id}`)
  }

  const handleAddToComparison = (e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: Implement comparison functionality
    console.log('Add to comparison:', course.id)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: Implement share functionality
    console.log('Share course:', course.id)
  }

  const discountPercentage = course.originalPrice 
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0

  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={handleViewDetails}>
      <CardContent className="p-6">
        <div className="flex gap-6">
          {/* Course Image */}
          <div className="relative flex-shrink-0">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-48 h-32 object-cover rounded-lg"
            />
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="absolute top-2 left-2 bg-red-500">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>

          {/* Course Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
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
                
                <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">by {course.instructor} • {course.provider}</p>
                
                <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                  {course.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-1 ml-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={handleWishlist}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={handleAddToComparison}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Course Stats */}
            <div className="flex items-center mb-3 space-x-6">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium">{course.rating}</span>
                <span className="text-sm text-gray-500 ml-1">({course.reviewCount})</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                {course.studentsEnrolled.toLocaleString()} students
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {course.duration}
              </div>
              <Badge variant="outline" className="text-xs">
                {course.level}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {course.format}
              </Badge>
              {course.successRate && (
                <div className="text-sm text-green-600 font-medium">
                  {course.successRate}% success rate
                </div>
              )}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1 mb-4">
              {course.features.slice(0, 5).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {course.features.length > 5 && (
                <Badge variant="secondary" className="text-xs">
                  +{course.features.length - 5} more
                </Badge>
              )}
            </div>

            {/* Price and CTA */}
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
                {course.language !== 'English' && (
                  <Badge variant="outline" className="text-xs">
                    {course.language}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Compare
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleViewDetails}>
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}