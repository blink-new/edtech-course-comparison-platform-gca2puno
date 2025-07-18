import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import { Separator } from '../components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet'
import { SearchFilters } from '../components/search/SearchFilters'
import { CourseCard } from '../components/course/CourseCard'
import { CourseListItem } from '../components/course/CourseListItem'
import { mockCourses } from '../data/mockCourses'
import { Course } from '../types/course'

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses)
  const [sortBy, setSortBy] = useState('relevance')
  const [filters, setFilters] = useState({
    examTypes: [] as string[],
    subjects: [] as string[],
    priceRange: [0, 50000] as [number, number],
    rating: 0,
    format: [] as string[],
    level: [] as string[],
    language: [] as string[],
    duration: [] as string[]
  })

  useEffect(() => {
    const query = searchParams.get('q') || ''
    setSearchQuery(query)
    filterCourses(query, filters)
  }, [searchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  const filterCourses = (query: string, currentFilters: typeof filters) => {
    let filtered = mockCourses

    // Text search
    if (query) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase()) ||
        course.examType.some(exam => exam.toLowerCase().includes(query.toLowerCase())) ||
        course.subjects.some(subject => subject.toLowerCase().includes(query.toLowerCase())) ||
        course.instructor.toLowerCase().includes(query.toLowerCase()) ||
        course.provider.toLowerCase().includes(query.toLowerCase())
      )
    }

    // Apply filters
    if (currentFilters.examTypes.length > 0) {
      filtered = filtered.filter(course =>
        course.examType.some(exam => currentFilters.examTypes.includes(exam))
      )
    }

    if (currentFilters.subjects.length > 0) {
      filtered = filtered.filter(course =>
        course.subjects.some(subject => currentFilters.subjects.includes(subject))
      )
    }

    if (currentFilters.format.length > 0) {
      filtered = filtered.filter(course =>
        currentFilters.format.includes(course.format)
      )
    }

    if (currentFilters.level.length > 0) {
      filtered = filtered.filter(course =>
        currentFilters.level.includes(course.level)
      )
    }

    if (currentFilters.language.length > 0) {
      filtered = filtered.filter(course =>
        currentFilters.language.includes(course.language)
      )
    }

    // Price range filter
    filtered = filtered.filter(course =>
      course.price >= currentFilters.priceRange[0] && course.price <= currentFilters.priceRange[1]
    )

    // Rating filter
    if (currentFilters.rating > 0) {
      filtered = filtered.filter(course => course.rating >= currentFilters.rating)
    }

    // Sort results
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'popularity':
        filtered.sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
        break
      default:
        // Keep original order for relevance
        break
    }

    setFilteredCourses(filtered)
  }

  const handleSearch = () => {
    setSearchParams({ q: searchQuery })
    filterCourses(searchQuery, filters)
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    filterCourses(searchQuery, newFilters)
  }

  const clearFilters = () => {
    const resetFilters = {
      examTypes: [],
      subjects: [],
      priceRange: [0, 50000] as [number, number],
      rating: 0,
      format: [],
      level: [],
      language: [],
      duration: []
    }
    setFilters(resetFilters)
    filterCourses(searchQuery, resetFilters)
  }

  const activeFiltersCount = 
    filters.examTypes.length + 
    filters.subjects.length + 
    filters.format.length + 
    filters.level.length + 
    filters.language.length + 
    (filters.rating > 0 ? 1 : 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search for courses, exams, or subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 pr-4 h-12"
                />
              </div>
            </div>
            <Button onClick={handleSearch} size="lg" className="bg-blue-600 hover:bg-blue-700">
              Search
            </Button>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">Active filters:</span>
              {filters.examTypes.map(exam => (
                <Badge key={exam} variant="secondary" className="bg-blue-100 text-blue-700">
                  {exam}
                </Badge>
              ))}
              {filters.subjects.map(subject => (
                <Badge key={subject} variant="secondary" className="bg-green-100 text-green-700">
                  {subject}
                </Badge>
              ))}
              {filters.format.map(format => (
                <Badge key={format} variant="secondary" className="bg-purple-100 text-purple-700">
                  {format}
                </Badge>
              ))}
              {filters.level.map(level => (
                <Badge key={level} variant="secondary" className="bg-orange-100 text-orange-700">
                  {level}
                </Badge>
              ))}
              {filters.rating > 0 && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  {filters.rating}+ stars
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-600 hover:text-red-700">
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary">{activeFiltersCount}</Badge>
                  )}
                </div>
                <SearchFilters filters={filters} onFiltersChange={handleFilterChange} />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? `Search results for "${searchQuery}"` : 'All Courses'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {filteredCourses.length} courses found
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <SearchFilters filters={filters} onFiltersChange={handleFilterChange} />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value)
                    filterCourses(searchQuery, filters)
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popularity">Most Popular</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {filteredCourses.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredCourses.map((course) => (
                  viewMode === 'grid' ? (
                    <CourseCard key={course.id} course={course} />
                  ) : (
                    <CourseListItem key={course.id} course={course} />
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}