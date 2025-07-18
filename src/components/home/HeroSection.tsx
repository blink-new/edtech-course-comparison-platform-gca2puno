import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Sparkles, TrendingUp, Users, Target } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'

export function HeroSection() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const popularSearches = [
    'JEE Mathematics',
    'UPSC Current Affairs',
    'NEET PG Medicine',
    'SSC Quantitative Aptitude',
    'GMAT Verbal'
  ]

  const stats = [
    { icon: Users, label: 'Active Students', value: '2.5M+' },
    { icon: TrendingUp, label: 'Course Success Rate', value: '94%' },
    { icon: Sparkles, label: 'AI Recommendations', value: '99.9%' }
  ]

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-amber-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Course Discovery
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Perfect
              <span className="text-blue-600 block">Learning Path</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Compare and discover the best courses for JEE, UPSC, NEET PG, SSC, GMAT, and K12 education. 
              Get AI-powered recommendations tailored to your learning goals.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for courses, exams, or subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-12 pr-32 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-lg"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Button 
                  size="lg" 
                  className="rounded-lg bg-blue-600 hover:bg-blue-700 px-6"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-500 mr-2">Popular:</span>
              {popularSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-full border-gray-300 hover:border-blue-500 hover:text-blue-600"
                  onClick={() => {
                    setSearchQuery(search)
                    navigate(`/search?q=${encodeURIComponent(search)}`)
                  }}
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl"
              onClick={() => navigate('/ai-finder')}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Course Finder
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 rounded-xl border-2"
              onClick={() => navigate('/diagnostic-assessment')}
            >
              <Target className="w-4 h-4 mr-2" />
              Take Assessment
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 rounded-xl border-2"
              onClick={() => navigate('/search')}
            >
              Browse All Courses
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-amber-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>
    </section>
  )
}