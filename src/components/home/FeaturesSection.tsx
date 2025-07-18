import { useNavigate } from 'react-router-dom'
import { 
  Target, BookOpen, Calendar, MessageCircle, Info, 
  BarChart3, Users, Shield, Sparkles, TrendingUp, Award
} from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

export function FeaturesSection() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Target,
      title: 'AI Course Finder',
      description: 'Get personalized course recommendations based on your goals, current level, and preferences through our intelligent questionnaire.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      path: '/ai-finder',
      badge: 'AI Powered'
    },
    {
      icon: BookOpen,
      title: 'Diagnostic Assessment',
      description: 'Take subject-specific tests to identify your strengths and weaknesses, then get targeted course recommendations.',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      path: '/diagnostic-assessment',
      badge: 'Personalized'
    },
    {
      icon: Calendar,
      title: 'Study Schedule Planner',
      description: 'Plan your study sessions, set goals, track progress, and maintain consistency with our comprehensive planner.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      path: '/study-planner',
      badge: 'Productivity'
    },
    {
      icon: MessageCircle,
      title: 'Community Forums',
      description: 'Connect with fellow students, ask questions, share experiences, and get help from experts and peers.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      path: '/community',
      badge: 'Community'
    },
    {
      icon: Info,
      title: 'Exam Information Hub',
      description: 'Access comprehensive information about exam patterns, syllabi, important dates, and preparation strategies.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      path: '/exam-info',
      badge: 'Complete Guide'
    },
    {
      icon: BarChart3,
      title: 'Course Comparison',
      description: 'Compare up to 5 courses side-by-side with detailed analysis of features, pricing, ratings, and success rates.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      path: '/compare',
      badge: 'Smart Choice'
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Blockchain-Verified Reviews',
      description: 'Authentic reviews from verified students ensure transparency and trust in course selection.'
    },
    {
      icon: TrendingUp,
      title: 'Success Rate Tracking',
      description: 'See real success rates and outcomes from students who took the same courses.'
    },
    {
      icon: Users,
      title: 'Expert Curation',
      description: 'Courses are curated and reviewed by subject matter experts and successful candidates.'
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Earn badges and track your learning journey with our gamified progress system.'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700">
              <Sparkles className="w-3 h-3 mr-1" />
              Comprehensive Platform
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Exam Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered recommendations to community support, we provide all the tools 
              and resources you need to find the perfect course and achieve your goals.
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:-translate-y-1"
                onClick={() => navigate(feature.path)}
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Explore Feature →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Choose EduCompare?
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We go beyond simple course listings to provide a comprehensive, 
                trustworthy, and intelligent platform for your educational journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
                    <benefit.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Find Your Perfect Course?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have found their ideal learning path through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 px-8"
                onClick={() => navigate('/ai-finder')}
              >
                <Target className="w-4 h-4 mr-2" />
                Start AI Course Finder
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8"
                onClick={() => navigate('/diagnostic-assessment')}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Take Diagnostic Test
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}