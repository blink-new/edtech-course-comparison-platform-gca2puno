import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Clock, Users, Award, MapPin, Heart, Share2, Plus } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Course } from '../../types/course'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
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
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer" onClick={handleViewDetails}>
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <Badge className="bg-blue-600 hover:bg-blue-700">
            {course.examType[0]}
          </Badge>
          {course.format === 'Offline' && course.location && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <MapPin className="w-3 h-3 mr-1" />
              {course.location}
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {course.isVerified && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Award className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="bg-red-500">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={handleWishlist}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={handleAddToComparison}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
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
          <Badge variant="outline" className="text-xs">
            {course.format}
          </Badge>
          {course.successRate && (
            <div className="text-sm text-green-600 font-medium">
              {course.successRate}% success
            </div>
          )}
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
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleViewDetails}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}