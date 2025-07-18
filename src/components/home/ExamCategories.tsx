import { ArrowRight, BookOpen, Star, Users, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { getCategoriesByType, getPopularCategories } from '../../data/examCategories'

export function ExamCategories() {
  const categoriesByType = getCategoriesByType()
  const popularCategories = getPopularCategories()

  const categoryTypes = [
    { id: 'popular', name: 'Popular', icon: '🔥', categories: popularCategories },
    { id: 'engineering', name: 'Engineering', icon: '⚙️', categories: categoriesByType.engineering },
    { id: 'medical', name: 'Medical', icon: '🩺', categories: categoriesByType.medical },
    { id: 'government', name: 'Government', icon: '🏛️', categories: categoriesByType.government },
    { id: 'management', name: 'Management', icon: '💼', categories: categoriesByType.management },
    { id: 'k12', name: 'K-12', icon: '🎓', categories: categoriesByType.k12 },
    { id: 'skills', name: 'Skills', icon: '💻', categories: categoriesByType.skills },
    { id: 'international', name: 'International', icon: '🌍', categories: categoriesByType.international },
    { id: 'defense', name: 'Defense', icon: '🛡️', categories: categoriesByType.defense },
    { id: 'law', name: 'Law', icon: '⚖️', categories: categoriesByType.law },
    { id: 'teaching', name: 'Teaching', icon: '👩‍🏫', categories: categoriesByType.teaching },
    { id: 'commerce', name: 'Commerce', icon: '📊', categories: categoriesByType.commerce }
  ]

  const CategoryCard = ({ category }: { category: any }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${category.color}15` }}
          >
            {category.icon}
          </div>
          <Badge 
            variant="secondary" 
            className="text-xs"
            style={{ backgroundColor: `${category.color}10`, color: category.color }}
          >
            {category.popularCourses}+ courses
          </Badge>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{category.fullName}</p>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
            {category.description}
          </p>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1 mb-2">
            {category.subjects.slice(0, 2).map((subject: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {subject}
              </Badge>
            ))}
            {category.subjects.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{category.subjects.length - 2} more
              </Badge>
            )}
          </div>
          <div className="flex items-center text-xs text-gray-500 space-x-4">
            <div className="flex items-center">
              <BookOpen className="w-3 h-3 mr-1" />
              {category.levels.length} levels
            </div>
            <div className="flex items-center">
              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
              4.8+ rating
            </div>
          </div>
        </div>

        <Button 
          variant="ghost" 
          className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
        >
          Explore {category.name} Courses
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore by Exam Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your exam category to discover curated courses from top educators and institutions
          </p>
        </div>

        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 mb-8 h-auto p-1">
            {categoryTypes.map((type) => (
              <TabsTrigger 
                key={type.id} 
                value={type.id}
                className="flex flex-col items-center gap-1 p-3 text-xs data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                <span className="text-lg">{type.icon}</span>
                <span className="hidden sm:inline">{type.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categoryTypes.map((type) => (
            <TabsContent key={type.id} value={type.id} className="mt-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                  <span className="text-2xl mr-3">{type.icon}</span>
                  {type.name} Exams
                  {type.id === 'popular' && (
                    <TrendingUp className="w-5 h-5 ml-2 text-orange-500" />
                  )}
                </h3>
                <p className="text-gray-600">
                  {type.id === 'popular' && 'Most searched and enrolled exam categories'}
                  {type.id === 'engineering' && 'Engineering entrance exams for technical institutes'}
                  {type.id === 'medical' && 'Medical entrance exams for healthcare programs'}
                  {type.id === 'government' && 'Government job recruitment examinations'}
                  {type.id === 'management' && 'MBA and business school entrance exams'}
                  {type.id === 'k12' && 'School curriculum support and board exam preparation'}
                  {type.id === 'skills' && 'Professional skill development and certification courses'}
                  {type.id === 'international' && 'International standardized tests and certifications'}
                  {type.id === 'defense' && 'Defense services entrance examinations'}
                  {type.id === 'law' && 'Law school entrance examinations'}
                  {type.id === 'teaching' && 'Teaching eligibility and qualification tests'}
                  {type.id === 'commerce' && 'Professional commerce and accounting courses'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {type.categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>

              {type.categories.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Coming Soon</h3>
                  <p className="text-gray-500">More categories will be added soon!</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-2xl p-8 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">15,000+</div>
              <div className="text-sm text-gray-600">Total Courses</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">1,200+</div>
              <div className="text-sm text-gray-600">Expert Instructors</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">5.2M+</div>
              <div className="text-sm text-gray-600">Students Enrolled</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <Star className="w-6 h-6 text-orange-600 fill-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">96%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}